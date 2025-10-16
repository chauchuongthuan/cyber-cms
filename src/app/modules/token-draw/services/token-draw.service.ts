import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { ApiService } from 'src/app/common/services/api.service';
import { AuthenticationService } from 'src/app/common/services/auth.service';
import { LocalService } from 'src/app/common/services/local.service';
import { environment } from 'src/environments/environment';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ITokenDraw } from '../models/tokenDraw.model';

@Injectable({ providedIn: 'root' })
export class TokenDrawService {
  public currentUser: any;

  constructor(
    private apiService: ApiService,
    private localStorage: LocalService,
    private auth: AuthenticationService,
    private notification: NzNotificationService
  ) {}

  getTokenDraw(params: HttpParams) {
    return this.apiService
      .get<ITokenDraw>(environment.BASE_URL + 'admin/tokens', this.auth.getHeaderAuth(), params)
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification))
      );
  }

  createTokenDraw(data: any): Observable<ITokenDraw> {
    return this.apiService.postUpload(
      environment.BASE_URL + 'admin/tokens',
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }

  editTokenDraw(data: any, id: string) {
    return this.apiService.putFile(
      environment.BASE_URL + 'admin/tokens/'+id,
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }

  deleteTokenDraw(id: string) {
    return this.apiService.delete(
      environment.BASE_URL + 'admin/tokens',
      {ids: [id]},
      this.auth.getHeaderAuth({'Content-Type': 'application/json'}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }

  onResetTokenDraw(id: string) {
    return this.apiService.post(
      environment.BASE_URL + 'admin/tokens/reset',
      {id: id},
      this.auth.getHeaderAuth({'Content-Type': 'application/json'}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }

  onResetTokenDrawAll() {
    return this.apiService.post(
      environment.BASE_URL + 'admin/tokens/reset-all',
      {},
      this.auth.getHeaderAuth({'Content-Type': 'application/json'}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }

  importTokenDraw(data: any): Observable<ITokenDraw> {
    return this.apiService.postUpload(
      environment.BASE_URL + 'admin/tokens/import',
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }

  exportTokenDraw(params: HttpParams){
    let conditions = params.keys().map((k) => `${k}=${params.getAll(k)}`).join('&')
    return window.location.href = environment.BASE_URL + `admin/tokens?get=true&export=true&token=${this.auth.getTokenUser()}&${conditions}`
  }
}
