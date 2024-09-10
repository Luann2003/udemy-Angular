import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { catchError, count, retry, shareReplay, throwError } from 'rxjs';


export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  const headers = new HttpHeaders().set('x-vida-full-stack', 'dev')

  const reqClone = req.clone({ headers });
  return next(reqClone).pipe(
  shareReplay(),
  retry ({ count : 2, delay:1000 }),
  catchError((e : HttpErrorResponse) => {
    if(e.status === 0){
      alert("Você esta sem conexão")
    }
    return throwError(() => e);
  }))
};
