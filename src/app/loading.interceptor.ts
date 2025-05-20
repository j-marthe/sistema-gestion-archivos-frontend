import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from './services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // No mostrar loading en login porrque ya esta incluido en el botón
    if (req.url.includes('/login')) {
      return next.handle(req);
    }

    this.loadingService.show();

    return next.handle(req).pipe(
      finalize(() => this.loadingService.hide())
    );
  }
}
