import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { error } from 'console';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has('x-skip-interceptor')) {
      const newReq = req.clone({ headers: req.headers.delete('x-skip-interceptor') });
      return next.handle(newReq);
    }

    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error?.message === 'jwt expired') {
          localStorage.removeItem('token');
          alert('Token expired. Please login again');
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
