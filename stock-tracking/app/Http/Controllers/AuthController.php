<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        // kullanıcı adını gönderiyor mu?  email gönderiyor mu? 
        // users da o email var mı? 
        // NOT : confirmed : şifre tekrarı gönderiyor mu doğru mu?
        $request->validate(array(
                'name'=>'required|string',
                'email'=>'required|string|email|unique:users',
                'password'=>'required|string|confirmed'
            ));
        
        // Yeni bir kullanıcı oluşturduk save() ile kaydettik
        $user = new User(array(
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>md5($request->password)
        ));
        $user = $user->save();
        
        //kullanıcıya giriş yaptırdık
        $credentails = array(
            'email'=>$request->email,
            'password'=>$request->password
        );
        if (!Auth::attempt($credentails)) {
            return response()->json(array(
                'message'=>'Giriş yapılamadı bilgilerinizi kontrol ediniz'
                ),401);
        }
        else{
            //kullanıcıya ulaştık token oluşturduk ve remember me gelmişse 1 haftalık açtık.
            $user = $request->user();
            $tokenResult = $user->createToken('Personal Access');
            $token = $tokenResult->token;
            if ($request->remember_me) {
                $token->expires_at = Carbon::now()->addWeeks(1);
            }
            // tokenı kaydettik ve response döndük başarılı olarak
            $token->save();
            return response()->json(array(
                'success'=>true,
                'id'=>$user->id,
                'name'=>$user->name,
                'email'=>$user->email,
                'access_token'=>$user->accessToken
            ),200);
        }
    }
}