import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(() => error);
  }

  get<T>(url: string, headers: HttpHeaders = new HttpHeaders(), params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(url, { params, headers }).pipe(catchError(this.formatErrors));
  }

  put<T>(url: string, body: Object = {}, headers?: HttpHeaders): Observable<any> {
    return this.http
      .put(url, JSON.stringify(body), {headers: headers ? headers : this.headers})
      .pipe(catchError(this.formatErrors));
  }

  putFile<T>(url: string, body: Object = {}, headers?: HttpHeaders): Observable<any> {
    return this.http
      .put(url, body, {headers: headers ? headers : this.headers})
      .pipe(catchError(this.formatErrors));
  }

  post<T>(url: string, body: any = {}, headers?: HttpHeaders): Observable<any> {  
    return this.http
      .post(url, JSON.stringify(body), {headers: headers ? headers : this.headers})
      .pipe(catchError(this.formatErrors));
  }
  
  postUpload<T>(url: string, body: any = {}, headers?: HttpHeaders): Observable<any> {    
    return this.http
      .post(url, body, {headers: headers ? headers : this.headers})
      .pipe(catchError(this.formatErrors));
  }

  postFile<T>(url: string, body: any = {}, headers?: HttpHeaders): Observable<any> {    
    return this.http
      .post(url, body, {headers: headers ? headers : this.headers})
      .pipe(catchError(this.formatErrors));
  }

  delete(url: string, body?: any, headers?: HttpHeaders): Observable<any> {
    if (body !== undefined) {
      return this.http
        .request('delete', url, { body, headers: headers ? headers : this.headers })
        .pipe(catchError(this.formatErrors));
    } else {
      return this.http.delete(url).pipe(catchError(this.formatErrors));
    }
  }

  handleErrorObservable(error: Response | any, notification: any) {
    let response = error.error
    if(response){
      switch (true) {
        case typeof response.message == 'string':
          notification.create('error','Thất bại', response.message);
          break;
        case typeof response.message == 'object':
          for (let item of response.message) {
            notification.create('error','Thất bại', item);
          }
        break;
        default:
          break;
      }
    }
    return throwError(() => error);
  }

  handleSuccessObservable(response: any, notification: any, showSuccess: boolean = false) {
    if(response.status){
      if(showSuccess) notification.create('success','Thành công', response.message);
      return response.data
    }else{
      notification.create('error','Thất bại', response.message);
      return false;
    }
  }
  
}
