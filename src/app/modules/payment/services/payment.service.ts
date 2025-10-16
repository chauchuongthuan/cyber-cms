import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ApiService } from 'src/app/common/services/api.service';
import { AuthenticationService } from 'src/app/common/services/auth.service';
import { LocalService } from 'src/app/common/services/local.service';
// import any from '../model/category.model';
import { environment } from 'src/environments/environment';
import { IPayment } from '../model/payment.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  public currentUser: any;

  constructor(
    private apiService: ApiService,
    private localStorage: LocalService,
    private auth: AuthenticationService,
    private notification: NzNotificationService
  ) {}


  getPayment(params: HttpParams) {
    return this.apiService
      .get<IPayment>(environment.BASE_URL + 'admin/payment', this.auth.getHeaderAuth(), params)
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification))
      );
  }
  exportPayment(params: HttpParams) {
    let exportUrl = environment.BASE_URL + 'admin/payment?' + params.toString() + `&token=${this.auth.getTokenUser()}&get=true&export=true`;
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
  // createPayment(data: any) {
  //   return this.apiService.postUpload(
  //     environment.BASE_URL + 'admin/payment',
  //     data,
  //     this.auth.getHeaderAuth({}),
  //   ).pipe(
  //     catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
  //     map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
  //   );
  // }
  editPayment(data: any, id: string) {
    return this.apiService.putFile(
      environment.BASE_URL + 'admin/payment/'+id,
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }
  deletePayment(id: string) {
    return this.apiService.delete(
      environment.BASE_URL + `admin/payment`, 
      {ids: [id]},
      this.auth.getHeaderAuth({'Content-Type': 'application/json'}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }
}
