import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable()
export class RouterService {

  public params: any;
  public path: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
) {
    this.activatedRoute.queryParams.subscribe((params: any) => {
        return this.params = params
    })

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
        let url = event?.url || ''
        let from = url.lastIndexOf('/')
        let to = url.indexOf('?')
        if(to == -1) to = url.length
        if(from) this.path = url.slice(from + 1, to)
    });
}

    replaceParams(params: HttpParams){
        let keys = params.keys()
        let queryParams = {} as any
        keys.forEach((key, index) => {
            let value = params.get(key)     
            if(value)  queryParams[key] = value
        })

        this.router.navigate([], {
            queryParams: queryParams
        })
    }
}
