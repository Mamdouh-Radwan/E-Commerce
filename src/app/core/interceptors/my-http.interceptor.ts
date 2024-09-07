import { HttpInterceptorFn } from '@angular/common/http';

export const myHttpInterceptor: HttpInterceptorFn = (req, next) => {
  
  if (localStorage.getItem('eToken') !== null) {

    const headers: any = { token: localStorage.getItem('eToken') };

    req = req.clone({
      setHeaders: headers,
    });
  } 
  //*
 
  return next(req);
};
