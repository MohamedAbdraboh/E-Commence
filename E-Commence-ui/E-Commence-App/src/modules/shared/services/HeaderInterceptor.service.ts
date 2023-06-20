import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { retry, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { MessagesService } from './messages.service';
import { ToastService } from './toast.service';
import { ToastSeverity } from '../enums/ToastSeverity.enum';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';

@Injectable()
@Injectable({
  providedIn: 'root',
})
export class HeaderInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastService: ToastService,
    private messagesService: MessagesService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //
    let authReq = req.clone({
      withCredentials: true,
      headers: req.headers.append('Access-Control-Allow-Origin', '*'),
    });
    if (authReq && authReq.headers) {
      authReq.headers.get('Accept-Languagee');
      authReq.headers.get('Authorization');
    }
    return next.handle(authReq).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
          this.toastService.show(
            ToastSeverity.Error,
            'Error',
            this.messagesService.getMessageWithKeys(
              'General',
              'Message',
              'UnspecifiedError'
            ),
            false
          );
        } else {
          this.router.navigate(['/error']);
          this.toastService.show(
            ToastSeverity.Error,
            'Error',
            this.messagesService.getMessageWithKeys(
              'General',
              'Message',
              'UnspecifiedError'
            ),
            false
          );
        }

        LoaderService.hideLoader();
        return throwError(() => error);
      })
    );
  }
}
