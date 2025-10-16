import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { ApiService } from 'src/app/common/services/api.service';
import { AuthenticationService } from 'src/app/common/services/auth.service';
import { LocalService } from 'src/app/common/services/local.service';
import { environment } from 'src/environments/environment';
import { ISubscriber } from '../model/subscriber.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({ providedIn: 'root' })
export class SubscriberService {
  public currentUser: any;

  constructor(
    private apiService: ApiService,
    private localStorage: LocalService,
    private auth: AuthenticationService,
    private notification: NzNotificationService
  ) {}

  getSubscriber(params: HttpParams) {
    return this.apiService
      .get<ISubscriber>(environment.BASE_URL + 'admin/subscribers', this.auth.getHeaderAuth(), params)
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification))
      );
  }

  createSubscriber(data: any): Observable<ISubscriber> {
    return this.apiService.postUpload(
      environment.BASE_URL + 'admin/subscribers',
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }

  editSubscriber(data: any, id: string) {
    return this.apiService.putFile(
      environment.BASE_URL + 'admin/subscribers/'+id,
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }

  deleteSubscriber(id: string) {
    return this.apiService.delete(
      environment.BASE_URL + 'admin/subscribers',
      {ids: [id]},
      this.auth.getHeaderAuth({'Content-Type': 'application/json'}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }

  exportSubscriber(params: HttpParams){
    let conditions = params.keys().map((k) => `${k}=${params.getAll(k)}`).join('&')
    return window.location.href = environment.BASE_URL + `admin/subscribers?get=true&export=true&token=${this.auth.getTokenUser()}&${conditions}`
  }

  changeStatus(id:any, status: any): Observable<ISubscriber> {
    return this.apiService
      .postFile<ISubscriber>(environment.BASE_URL + 'admin/subscribers/change-status', {id: id, status: status}, this.auth.getHeaderAuth({}))
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
      );
  }
}
