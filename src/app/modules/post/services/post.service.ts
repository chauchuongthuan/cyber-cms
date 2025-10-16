import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ApiService } from 'src/app/common/services/api.service';
import { AuthenticationService } from 'src/app/common/services/auth.service';
import { LocalService } from 'src/app/common/services/local.service';
// import any from '../model/category.model';
import { environment } from 'src/environments/environment';
import { IPost } from '../model/post.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({ providedIn: 'root' })
export class PostService {
  public currentUser: any;

  constructor(
    private apiService: ApiService,
    private localStorage: LocalService,
    private auth: AuthenticationService,
    private notification: NzNotificationService
  ) {}


  getPost(params: HttpParams) {
    return this.apiService
      .get<IPost>(environment.BASE_URL + 'admin/posts', this.auth.getHeaderAuth(), params)
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification))
      );
  }
  getCategory() {
    return this.apiService
      .get(environment.BASE_URL + 'admin/categories?get=true', this.auth.getHeaderAuth())
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification))
      );
  }
  exportPost(params: HttpParams) {
    let exportUrl = environment.BASE_URL + 'admin/posts?' + params.toString() + `&token=${this.auth.getTokenUser()}&get=true&export=true`;
    window.location.href = exportUrl;
  }
  createPost(data: any) {
    return this.apiService.postUpload(
      environment.BASE_URL + 'admin/posts',
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }
  editPost(data: any, id: string) {
    return this.apiService.putFile(
      environment.BASE_URL + 'admin/posts/'+id,
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }
  deletePost(id: string) {
    return this.apiService.delete(
      environment.BASE_URL + `admin/posts`, 
      {ids: [id]},
      this.auth.getHeaderAuth({'Content-Type': 'application/json'}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }
}
