import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ErrorService } from './services/error.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService, private errorService: ErrorService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    const token = localStorage.getItem('token');


    if (token) {
      if (this.authService.isTokenExpired(token)) {
        this.authService.logout();
        this.router.navigate(['/login']);
        this.errorService.show('Tu sesión ha expirado. Inicia sesión nuevamente.');
        return throwError(() => new Error('Token expirado'));
      }

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            this.authService.logout();
            this.router.navigate(['/login']);
            this.errorService.show('No estás autorizado. Inicia sesión.');
            break;

          case 403:
            this.errorService.show('Acceso denegado. No tienes permisos suficientes.');
            break;

          case 500:
            this.errorService.show('Error interno del servidor. Vuelve a intentarlo, el servidor esta despertando.');
            break;

          default:
            this.errorService.show('Ha ocurrido un error inesperado.');
            break;
        }

        return throwError(() => error);
      })
    );
  }

  
}
