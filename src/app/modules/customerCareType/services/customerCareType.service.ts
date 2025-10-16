import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { ApiService } from 'src/app/common/services/api.service';
import { AuthenticationService } from 'src/app/common/services/auth.service';
import { LocalService } from 'src/app/common/services/local.service';
import { environment } from 'src/environments/environment';
import { ICustomerCareType } from '../model/customerCareType.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({ providedIn: 'root' })
export class CustomerCareTypeService {
  public currentUser: any;

  constructor(
    private apiService: ApiService,
    private localStorage: LocalService,
    private auth: AuthenticationService,
    private notification: NzNotificationService
  ) {}

  getCustomerCareType(params: HttpParams) {
    return this.apiService
      .get<ICustomerCareType>(environment.BASE_URL + 'admin/customer-care-types', this.auth.getHeaderAuth(), params)
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification))
      );
  }

  createCustomerCareType(data: any): Observable<ICustomerCareType> {
    return this.apiService.postUpload(
      environment.BASE_URL + 'admin/customer-care-types',
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }

  editCustomerCareType(data: any, id: string) {
    return this.apiService.putFile(
      environment.BASE_URL + 'admin/customer-care-types/'+id,
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }

  deleteCustomerCareType(id: string) {
    return this.apiService.delete(
      environment.BASE_URL + 'admin/customer-care-types',
      {ids: [id]},
      this.auth.getHeaderAuth({'Content-Type': 'application/json'}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }
  exportCustomerCareType(params: HttpParams){
    let conditions = params.keys().map((k) => `${k}=${params.getAll(k)}`).join('&')
    return window.location.href = environment.BASE_URL + `admin/customer-care-types?get=true&export=true&token=${this.auth.getTokenUser()}&${conditions}`
  }
  changeStatus(id:any, status: any): Observable<ICustomerCareType> {
    return this.apiService
      .postFile<ICustomerCareType>(environment.BASE_URL + 'admin/customer-care-types/change-status', {id: id, status: status}, this.auth.getHeaderAuth({}))
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
      );
  }
}
