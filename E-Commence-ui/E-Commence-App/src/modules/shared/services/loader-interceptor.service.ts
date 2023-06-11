import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpResponse, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LoaderService } from 'src/modules/shared/services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {

  constructor() {
  }
  intercept(req: HttpRequest<any> , next: HttpHandler): Observable<HttpEvent<any>> {
      LoaderService.showLoader();
      return next.handle(req).pipe(tap(async (event: HttpEvent<any> ) => {
              if (event instanceof HttpResponse) {
                LoaderService.hideLoader();
              }
          },
           (err: any) => {
            LoaderService.hideLoader();
          }));
  }
}