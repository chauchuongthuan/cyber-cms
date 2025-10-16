import { Injectable } from '@angular/core';
const cryptoJS = require("crypto-js");

@Injectable()
export class LocalService {

    private key: string = '7538782F413F4428472B4B6250655368566B5970337336763979244226452948'

    constructor() {
    }

    encryptUser(user: any){
        let encryptData = cryptoJS.AES.encrypt(JSON.stringify(user), `${this.key}`).toString()
        return encryptData
    }

    decryptUser(encryptUser: any){
        let bytes  = cryptoJS.AES.decrypt(encryptUser, `${this.key}`);
        let decryptData = JSON.parse(bytes.toString(cryptoJS.enc.Utf8));
        return { ...decryptData}
    }

    getToken(): string {
        return window.localStorage['currentUser'];
    }

    // saveToken(token: string) {
    //     window.localStorage['auth-session'] = token;
    // }

    // destroyToken() {
    //     window.localStorage.removeItem('currentUser');
    // }

    getAuthUser() {
        if (window.localStorage) {
            let encryptUser = window.localStorage.getItem('auth-session');
            return encryptUser ? this.decryptUser(encryptUser) : null
        } else {
            return null;
        }
    }

    setAuthUser(user: any) {
        if(user && window.localStorage){
            window.localStorage.setItem('auth-session', this.encryptUser(user))
        }
    }

    getDataLocaStorage(key: string) {
        if (window.localStorage.getItem(key)) {
            return window.localStorage.getItem(key);
        } else {
            return null;
        }
    }

    setDataLocalStorage(key: string, value: any) {
        window.localStorage.setItem(key, value);
    }

    saveDataLocalStorage(key: string, object: Object) {
        window.localStorage[key] = object;
    }

    destroyDataLocalStorage(key: string) {
        if (window.localStorage.getItem(key)) {
            window.localStorage.removeItem(key);
        }
    }

    // destroyDataLogout() {
    //     window.localStorage.clear();
    // }

}
