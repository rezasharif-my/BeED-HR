import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { UserService } from '../../@core/mock/users.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalHttpInterceptorService implements HttpInterceptor {

  constructor(public router: Router,
    private toastrService: NbToastrService,
    private userService: UserService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 400 && err.message.includes('Token')) {
          return throwError(err.message);
        } else {
          if (err.error.message) this.toastrService.danger(err.error.message, 'erroe');
          else if (err.error.Message) this.toastrService.danger(err.error.Message, 'erroe');
          return throwError(err.message);
        }
      })
    )
  }
}
