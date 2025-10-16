import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/common/services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CommonService {
  public loading: BehaviorSubject<boolean>;
  public loadingCurrent: any;
  constructor(
    private apiService: ApiService, 
    private router: Router,
    ) 
  {
    this.loading = new BehaviorSubject<boolean>(false);
    this.loadingCurrent = this.loading.asObservable();
  }

  loadingState(state: boolean) {
    this.loading.next(state);
  }

  getProvince(): Observable<any> {
    return this.apiService
      .get<any>(environment.BASE_URL + 'zone-provinces?limit=100&page=1')
      .pipe(
        map((data) => {
          return data.data?.docs;
        })
      );
  }

  getDistrict(id: string): Observable<any> {
    return this.apiService
      .get<any>(environment.BASE_URL + `zone-districts?get=true&zoneProvince=${id}`)
      .pipe(
        map((data) => {
          return data.data;
        })
      );
  }

  getWard(id: string): Observable<any> {
    return this.apiService
      .get<any>(environment.BASE_URL + `zone-wards?get=true&zoneDistrict=${id}`)
      .pipe(
        map((data) => {
          return data.data;
        })
      );
  }

  upload(data: any) {
    return this.apiService
      .postUpload<any>(environment.BASE_URL + `admin/ckeditors/single`, data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

}
