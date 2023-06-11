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
// import { AuthService } from 'src/modules/login/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { MessagesService } from './messages.service';
import { ToastSeverity } from '../enums/ToastSeverity.enum';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class HeaderInterceptorService implements HttpInterceptor {
  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN';
  private readonly USER_DATA = 'USER_DATA';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor(
    private injector: Injector,
    private router: Router,
    private toastService: ToastService,
    private messagesService: MessagesService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let accessToken = this.getJWTToken();

    let authReq = req.clone({
      // withCredentials: true,
      headers: req.headers
        .append('Authorization', 'Bearer ' + accessToken)
        .append('Access-Control-Allow-Origin', '*')
        .append(
          'ClientTimeZone',
          (new Date().getTimezoneOffset() * -1).toString()
        ),
    });
    return next
      .handle(authReq)
      .pipe(
        tap((result) => {
          let accessToken = this.getJWTToken();

          if (accessToken && this.checkTokenExpired(accessToken ?? '')) {
            console.log('call logout method/dispatch logout event');
            this.logOut();
          }
        })
      )
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let accessToken = this.getJWTToken();
          if (
            error.status == 401 ||
            (accessToken && this.checkTokenExpired(accessToken ?? ''))
          ) {
            this.logOut();
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

  getJWTToken(): string | null {
    const token = localStorage.getItem(this.ACCESS_TOKEN);
    return token ? token : sessionStorage.getItem(this.ACCESS_TOKEN);
  }

  logOut() {
    localStorage.removeItem(this.USER_DATA);
    sessionStorage.removeItem(this.USER_DATA);
    //
    localStorage.removeItem(this.ACCESS_TOKEN);
    sessionStorage.removeItem(this.ACCESS_TOKEN);
    //
    localStorage.removeItem(this.REFRESH_TOKEN);
    sessionStorage.removeItem(this.REFRESH_TOKEN);
    //
    this.router.navigate(['/login']);
  }

  checkTokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return expiry * 1000 < Date.now();
  }
}
