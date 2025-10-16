import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShareInfoDataService {
    private data = new Subject<any>();
    public data$ = this.data.asObservable();

    setData(data: any) {
        this.data.next(data);
    }
}