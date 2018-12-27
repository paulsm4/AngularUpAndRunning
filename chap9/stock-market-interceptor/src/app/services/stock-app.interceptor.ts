import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import {HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';

/*
 * Breaking changes in rxjs 6.x:
 *   https://stackoverflow.com/questions/50209119/property-do-does-not-exist-on-type-observableiproduct
 *   https://stackoverflow.com/questions/48089608/angular-5-interceptor-typeerror-next-handle-do-is-not-a-function
 *   https://blog.angular-university.io/rxjs-error-handling/
 *   https://www.academind.com/learn/javascript/rxjs-6-what-changed/
 * OLD :
 * import {Observable} from 'rxjs/Observable';
 * import 'rxjs/add/operator/do';
 */
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class StockAppInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.authToken) {
      const authReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          this.authService.authToken
        )
      });
      console.log('Making an authorized request');
      req = authReq;
    }
    /*
     * OLD:
     * return next.handle(req)
     *   .do(event => this.handleResponse(req, event),
     *      error => this.handleError(req, error));
     */
    return next.handle(req).pipe(
      tap(
        event => this.handleResponse(req, event),
        error => this.handleError(req, error)
      )
    );
  }


  handleResponse(req: HttpRequest<any>, event) {
    console.log('Handling response for ', req.url, event);
    if (event instanceof HttpResponse) {
      console.log('Request for ', req.url,
          ' Response Status ', event.status,
          ' With body ', event.body);
    }
  }

  handleError(req: HttpRequest<any>, event) {
    console.error('Request for ', req.url,
          ' Response Status ', event.status,
          ' With error ', event.error);
  }
}
