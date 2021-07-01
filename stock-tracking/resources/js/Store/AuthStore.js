import {observable , action, makeAutoObservable } from 'mobx';

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
            localStorage.setItem('appState',appState);
            this.getToken();
        } catch (error) {
            console.log(error);
        }
    }

    getToken= ()=>{
        try {
            const appStateData = localStorage.getItem('appState');
            if (appStateData) {

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
