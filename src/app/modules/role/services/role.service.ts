import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { ApiService } from 'src/app/common/services/api.service';
import { AuthenticationService } from 'src/app/common/services/auth.service';
import { LocalService } from 'src/app/common/services/local.service';
import { environment } from 'src/environments/environment';
import { IRole } from '../model/role.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({ providedIn: 'root' })
export class RoleService {
  public currentUser: any;

  constructor(
    private apiService: ApiService,
    private localStorage: LocalService,
    private auth: AuthenticationService,
    private notification: NzNotificationService
  ) {}

  getRole(params: HttpParams) {
    return this.apiService
      .get<IRole>(environment.BASE_URL + 'admin/roles', this.auth.getHeaderAuth(), params)
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification))
      );
  }

  createRole(data: any): Observable<IRole> {
    return this.apiService.postUpload(
      environment.BASE_URL + 'admin/roles',
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }

  editRole(data: any, id: string) {
    return this.apiService.putFile(
      environment.BASE_URL + 'admin/roles/'+id,
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }

  deleteRole(id: string) {
    return this.apiService.delete(
      environment.BASE_URL + 'admin/roles',
      {ids: [id]},
      this.auth.getHeaderAuth({'Content-Type': 'application/json'}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }

  getPermissions() {
    return this.apiService.get(
      environment.BASE_URL + 'admin/permissions', 
      this.auth.getHeaderAuth()
    ).pipe();
  }

  exportRole(params: HttpParams){
    let conditions = params.keys().map((k) => `${k}=${params.getAll(k)}`).join('&')
    return window.location.href = environment.BASE_URL + `admin/roles?get=true&export=true&token=${this.auth.getTokenUser()}&${conditions}`
  }
}
