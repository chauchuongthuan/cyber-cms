import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ApiService } from 'src/app/common/services/api.service';
import { AuthenticationService } from 'src/app/common/services/auth.service';
import { LocalService } from 'src/app/common/services/local.service';
// import any from '../model/category.model';
import { environment } from 'src/environments/environment';
import { IOrder } from '../model/order.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({ providedIn: 'root' })
export class OrderService {
  public currentUser: any;

  constructor(
    private apiService: ApiService,
    private localStorage: LocalService,
    private auth: AuthenticationService,
    private notification: NzNotificationService
  ) {}


  getOrder(params: HttpParams) {
    return this.apiService
      .get<IOrder>(environment.BASE_URL + 'admin/orders', this.auth.getHeaderAuth(), params)
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification))
      );
  }
  getCustomer() {
    return this.apiService
      .get(environment.BASE_URL + 'admin/customers?get=true', this.auth.getHeaderAuth())
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification))
      );
  }
  getProduct() {
    return this.apiService
      .get(environment.BASE_URL + 'admin/products?get=true', this.auth.getHeaderAuth())
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification))
      );
  }
  exportOrder(params: HttpParams) {
    let exportUrl = environment.BASE_URL + 'admin/orders?' + params.toString() + `&token=${this.auth.getTokenUser()}&get=true&export=true`;
    window.location.href = exportUrl;
  }
  // getProduct() {
  //   return this.apiService
  //     .get(environment.BASE_URL + 'admin/post-categories?get=true', this.auth.getHeaderAuth())
  //     .pipe(
  //       catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
  //       map((response) => this.apiService.handleSuccessObservable(response, this.notification))
  //     );
  // }
  createOrder(data: any) {
    return this.apiService.postUpload(
      environment.BASE_URL + 'admin/orders',
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }
  editOrder(data: any, id: string) {
    return this.apiService.putFile(
      environment.BASE_URL + 'admin/orders/'+id,
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }
  deleteOrder(id: string) {
    return this.apiService.delete(
      environment.BASE_URL + `admin/orders`, 
      {ids: [id]},
      this.auth.getHeaderAuth({'Content-Type': 'application/json'}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }
}
