import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ApiService } from 'src/app/common/services/api.service';
import { AuthenticationService } from 'src/app/common/services/auth.service';
import { LocalService } from 'src/app/common/services/local.service';
// import any from '../model/category.model';
import { environment } from 'src/environments/environment';
import { IActivity } from '../model/activity.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  public currentUser: any;

  constructor(
    private apiService: ApiService,
    private localStorage: LocalService,
    private auth: AuthenticationService,
    private notification: NzNotificationService
  ) {}


  getActivity(params: HttpParams) {
    return this.apiService
      .get<IActivity>(environment.BASE_URL + 'admin/activities', this.auth.getHeaderAuth(), params)
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification))
      );
  }
  exportActivity(params: HttpParams) {
    let exportUrl = environment.BASE_URL + 'admin/activities?' + params.toString() + `&token=${this.auth.getTokenUser()}&get=true&export=true`;
    window.location.href = exportUrl;
  }
}
