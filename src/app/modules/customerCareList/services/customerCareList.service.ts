import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { ApiService } from 'src/app/common/services/api.service';
import { AuthenticationService } from 'src/app/common/services/auth.service';
import { LocalService } from 'src/app/common/services/local.service';
import { environment } from 'src/environments/environment';
import { ICustomerCareList } from '../model/customerCareList.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({ providedIn: 'root' })
export class CustomerCareListService {
  public currentUser: any;

  constructor(
    private apiService: ApiService,
    private localStorage: LocalService,
    private auth: AuthenticationService,
    private notification: NzNotificationService
  ) {}

  getCustomerCareList(params: HttpParams) {
    return this.apiService
      .get<ICustomerCareList>(environment.BASE_URL + 'admin/customer-care-lists', this.auth.getHeaderAuth(), params)
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification))
      );
  }

  createCustomerCareList(data: any): Observable<ICustomerCareList> {
    return this.apiService.postUpload(
      environment.BASE_URL + 'admin/customer-care-lists',
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }

  editCustomerCareList(data: any, id: string) {
    return this.apiService.putFile(
      environment.BASE_URL + 'admin/customer-care-lists/'+id,
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }

  deleteCustomerCareList(id: string) {
    return this.apiService.delete(
      environment.BASE_URL + 'admin/customer-care-lists',
      {ids: [id]},
      this.auth.getHeaderAuth({'Content-List': 'application/json'}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }
  exportCustomerCareList(params: HttpParams){
    let conditions = params.keys().map((k) => `${k}=${params.getAll(k)}`).join('&')
    return window.location.href = environment.BASE_URL + `admin/customer-care-lists?get=true&export=true&token=${this.auth.getTokenUser()}&${conditions}`
  }
  getType() {
    return this.apiService
      .get(environment.BASE_URL + 'admin/customer-care-types?get=true', this.auth.getHeaderAuth())
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification))
      );
  }

  changeStatus(id:any, status: any): Observable<ICustomerCareList> {
    return this.apiService
      .postFile<ICustomerCareList>(environment.BASE_URL + 'admin/customer-care-lists/change-status', {id: id, status: status}, this.auth.getHeaderAuth({}))
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
      );
  }
}
