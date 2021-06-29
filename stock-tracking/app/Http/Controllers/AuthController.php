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
        $request->validate(array(
                'name'=>'required|string',
                'email'=>'required|string|email|unique:users',
                'password'=>'required|string|confirmed'
            ));

        $user = new User(array(
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>md5($request->password)
        ));
        $user = $user->save();
        $credentails = array(
            'email'=>$request->email,
            'password'=>$request->password
        );
        if (!Auth::attempt($credentails)) {
            return response()->json(array(
                'message'=>'Giriş yapılamadı bilgilerinizi kontrol ediniz'
                ),401);
        }else{
            $user = $request->user();
            $tokenResult = $user->createToken('Personal Access');
            $token = $tokenResult->token;
            if ($request->remember_me) {
                $token->expires_at = Carbon::now()->addWeeks(1);
            }
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


    public function login(Request $request)
    {
        $request->validate(array(
            'email'=>'required|string|email',
            'password'=>'required|string',
            'remember_me'=>'required|string|email',
        ));

        if (!Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            return response()->json(array(
                'message'=>'Giriş bilgileri hatalı'
            ),401);
        }else{
            $user = $request->user();
            $tokenResult = $user->createToken('Personel Access Token');
            $token = $tokenResult->token;
            if ($request->remember_me) {
                $token->expires_at = Carbon::now()->addWeeks(1);
            }
            $token->save();
            return response()->json(array(
                'success'=>true,
                'id'=> $user->id,
                'name'=>$user->name,
                'email'=>$user->email,
                'access_token'=>$tokenResult->accessToken
            ),200);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json(array(
            'message' => 'Çıkış yapıldı'
        ),200);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

}
