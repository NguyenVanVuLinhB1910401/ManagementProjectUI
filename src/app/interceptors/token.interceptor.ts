import { AfterViewInit, ChangeDetectorRef, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, finalize, switchMap, throwError, timeout } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';
import { LoaderService } from '../services/loader.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private _activeRequest = 0;
  constructor(
    private auth: AuthService, 
    private toast: NgToastService, 
    private router: Router, 
    public loaderService: LoaderService,
    private _ngxUiLoaderService: NgxUiLoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // this.loaderService.isLoading.next(true);
    //this.loaderService.showLoader();
    if(this._activeRequest === 0){
      setTimeout(() => {
        this._ngxUiLoaderService.start();
      })
    }
    this._activeRequest++;
    const accessToken = this.auth.getAccessToken();
    if(accessToken){
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${accessToken}`}
      });
    }
    return next.handle(request).pipe(
      catchError((err: any) => {
        if(err instanceof HttpErrorResponse && err.status === 401){
           return this.handleUnAuthorizedError(request, next);
        }
        return throwError(() => err);
      }),
      finalize(
        () => {
          // this.loaderService.isLoading.next(false);
          //this.loaderService.hideLoader();
          this._stopLoader();
        }
      )
    );
  }

  private _stopLoader(){
    this._activeRequest--;
      if(this._activeRequest === 0){
        setTimeout(() => {
          this._ngxUiLoaderService.stop();
        })
      }
  }
  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler){
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      let tokenApiModel = new TokenApiModel();
      tokenApiModel.accessToken = this.auth.getAccessToken()!;
      tokenApiModel.refreshToken = this.auth.getRefreshToken()!;
      return this.auth.renewToken(tokenApiModel)
      .pipe(
        switchMap((data: TokenApiModel) => {
          this.isRefreshing = false;
          this.auth.storeRefreshToken(data.refreshToken);
          this.auth.storeAccessToken(data.accessToken);
          req = req.clone({
            setHeaders: {Authorization: `Bearer ${data.accessToken}`}
          });      
          return next.handle(req);
        }),
        catchError((err) => {
          this.isRefreshing = false;
          if(err.status === 401){
            this.auth.logout();
            this.toast.warning({detail: "Thông báo", summary: "Vui lòng đăng nhập lại."});
            this.router.navigate(['login']);
          }
          return throwError(() => err);
        }),
      )
    }
    return next.handle(req);
  }
 
}
