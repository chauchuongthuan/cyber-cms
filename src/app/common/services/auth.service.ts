import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { LocalService } from './local.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: any;

  constructor(
    private apiService: ApiService, 
    private localStorage: LocalService
    ) 
  {
    this.currentUserSubject = new BehaviorSubject(this.localStorage.getAuthUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  getTokenUser(){
    let currentUser = this.currentUserSubject.value
    return currentUser ? currentUser.token : null
  }

  getHeaderAuth(params?: Object){
    let obj = { 'authorization': `Bearer ${this.getTokenUser()}` }
    if(params){
      obj = {
        ...obj,
        ...params
      }
    }
    let headers = new HttpHeaders(obj)    
    return headers
  }
}
