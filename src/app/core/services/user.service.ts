import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {}
  private readonly _HttpClient = inject(HttpClient);

  //* get user info
  updateUserData(userData: object): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}/api/v1/users/updateMe/`,
      userData
    );
  }
  //* get user info
  addAddress(userData: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/addresses`,
      userData
    );
  }
  //* get user addresss
  getAddresss(): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseUrl}/api/v1/addresses`
    );
  }
  //* remove user addresss
  removeAddress(id: string): Observable<any> {
    return this._HttpClient.delete(
      `${environment.baseUrl}/api/v1/addresses/${id}`
    );
  }
  //* update user pass
  updataPass(userData: object): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}/api/v1/users/changeMyPassword`,
      userData
    );
  }
}
