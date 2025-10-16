import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ApiService } from 'src/app/common/services/api.service';
import { AuthenticationService } from 'src/app/common/services/auth.service';
import { LocalService } from 'src/app/common/services/local.service';
// import any from '../model/category.model';
import { environment } from 'src/environments/environment';
import { ICategory } from '../model/category.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  public currentUser: any;

  constructor(
    private apiService: ApiService,
    private localStorage: LocalService,
    private auth: AuthenticationService,
    private notification: NzNotificationService
  ) {}


  getCategory(params: HttpParams) {
    return this.apiService
      .get<ICategory>(environment.BASE_URL + 'admin/categories', this.auth.getHeaderAuth(), params)
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification))
      );
  }
  exportCategory(params: HttpParams) {
    let exportUrl = environment.BASE_URL + 'admin/categories?' + params.toString() + `&token=${this.auth.getTokenUser()}&get=true&export=true`;
    window.location.href = exportUrl;
  }
  createCategory(data: any) {
    return this.apiService.postUpload(
      environment.BASE_URL + 'admin/categories',
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }
  editCategory(data: any, id: string) {
    return this.apiService.putFile(
      environment.BASE_URL + 'admin/categories/'+id,
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }
  deleteCategory(id: string) {
    return this.apiService.delete(
      environment.BASE_URL + `admin/categories`, 
      {ids: [id]},
      this.auth.getHeaderAuth({'Content-Type': 'application/json'}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }
}
