import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgetPassService {

  constructor() {}
  private readonly _HttpClient = inject(HttpClient);
  //* forgot pass
  forgotPass(mail: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/forgotPasswords`,
      mail
    );
  }
  //*  reset code
  resetCode(reset: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/verifyResetCode`,
      reset
    );
  }
  //* create new password
  creatNew(mail: object): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}/api/v1/auth/resetPassword`,
      mail
    );
  }
}
