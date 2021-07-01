import {observable , action, makeAutoObservable } from 'mobx';
import jwt_decode from 'jwt-decode';
import CryptoJS from 'crypto-js';
import sign from 'jwt-encode';


class AuthStore{
    appState = null;
    constructor(){
        makeAutoObservable(this,{
            appState:observable,
            saveToken:action,
            getToken:action
        });
    }


    saveToken = (appState)=>{
        try {
            localStorage.setItem('appState',CryptoJS.AES.encrypt(sign(appState,"secret"),"abdurrahim-baris").toString());
            this.getToken();
        } catch (error) {
            console.log(error);
        }
    }

    getToken= ()=>{
        try {
            const appStateData = localStorage.getItem('appState');
            if (appStateData) {
                var bytes = CryptoJS.AES.decrypt(appStateData,'abdurrahim-baris');
                var originalText = bytes.toString(CryptoJS.enc.Utf8);
                this.appState = jwt_decode(originalText);
                this.appState = appStateData;
            }else{
                this.appState= NULL;
            }
        } catch (error) {
            console.log(error);

        }
    }
}


export  default new AuthStore();
