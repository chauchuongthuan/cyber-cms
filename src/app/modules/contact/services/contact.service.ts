import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { ApiService } from 'src/app/common/services/api.service';
import { AuthenticationService } from 'src/app/common/services/auth.service';
import { LocalService } from 'src/app/common/services/local.service';
// import any from '../model/Contact.model';
import { environment } from 'src/environments/environment';
import { IContact } from '../model/contact.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
// import { saveAs } from 'file-saver';

@Injectable({ providedIn: 'root' })
export class ContactService {
  public currentUser: any;

  constructor(
    private apiService: ApiService,
    private localStorage: LocalService,
    private auth: AuthenticationService,
    private notification: NzNotificationService,
    private http: HttpClient,
  ) {}

  getContact(params: HttpParams) {
    return this.apiService
      .get<IContact>(environment.BASE_URL + 'admin/contacts', this.auth.getHeaderAuth(), params)
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification))
      );
  }

  createContact(data: any): Observable<IContact> {
    return this.apiService.postUpload(
      environment.BASE_URL + 'admin/contacts',
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }

  editContact(data: any, id: string) {
    return this.apiService.putFile(
      environment.BASE_URL + 'admin/contacts/'+id,
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }

  deleteContact(id: string) {
    return this.apiService.delete(
      environment.BASE_URL + 'admin/contacts',
      {ids: [id]},
      this.auth.getHeaderAuth({'Content-Type': 'application/json'}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }
  exportContact(params: HttpParams){
    let conditions = params.keys().map((k) => `${k}=${params.getAll(k)}`).join('&')
    return window.location.href = environment.BASE_URL + `admin/contacts?get=true&export=true&token=${this.auth.getTokenUser()}&${conditions}`
  }
  // exportFile(fileURL: string) {
  //   const headers = new HttpHeaders().set('Content-Type', '*/*');
  //   return this.http.get(fileURL, { headers, responseType: 'blob' })
  //     .subscribe(blob => {
  //         const fileExt = fileURL.split('.').pop();
  //         const file = new File([blob], `contact-file.${fileExt}`, {type: '*/*'});
  //         saveAs(file);
  //     });
  // }
}
