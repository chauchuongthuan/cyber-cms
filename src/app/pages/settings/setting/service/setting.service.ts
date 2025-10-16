import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from 'src/app/common/services/api.service';
import { AuthenticationService } from 'src/app/common/services/auth.service';
import { ToastService } from 'src/app/common/services/notification.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SettingService {
  constructor(
    private authService: AuthenticationService, 
    private apiService: ApiService,
    private notification: NzNotificationService
    ) 
  {

  }

  getSettingList() {
    return this.apiService.get(
      environment.BASE_URL + 'admin/setting',
      this.authService.getHeaderAuth(),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification))
    );
  }

  editSetting(data: any): Observable<any> {
    return this.apiService
      .putFile<any>(environment.BASE_URL + `admin/setting`, data, this.authService.getHeaderAuth({}))
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
      );
  }
}
