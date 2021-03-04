import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable()
export class ApiInterceptor implements HttpInterceptor{
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('>> Intercept HTTP Request ...');
    const token  = this.getAccessToken();
    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }));
  }
  getAccessToken(): string {
    // we are building a fake jwt for demo only
    // Jwt should have been created on server side and signed with secret Key
    const jwt = {
      username: 'pv',
      email: 'vantho.phoungeun@gmail.com',
      role: 'developer',
      expire: 999999,
      id: 'token_12345'
    };
    return btoa(JSON.stringify(jwt));
  }
}
