import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from 'src/app/common/services/api.service';
import { LocalService } from 'src/app/common/services/local.service';
import { ToastService } from 'src/app/common/services/notification.service';
import { environment } from 'src/environments/environment';
import { ILogin } from '../model/login.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: any;

  constructor(
    private apiService: ApiService,
    private localStorage: LocalService,
    private toastService: ToastService
    )
  {
    this.currentUserSubject = new BehaviorSubject(this.localStorage.getAuthUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(data: ILogin) {
    return this.apiService
      .post(environment.BASE_URL + 'auth/users/login', data)
      .pipe(
        map((data) => {
          if(data.status){
            this.localStorage.setAuthUser(data.data);
            this.currentUserSubject.next(data.data);
          }
          return data;
        },
        catchError(error => this.apiService.handleErrorObservable(error, this.toastService)))
      );
  }
}
