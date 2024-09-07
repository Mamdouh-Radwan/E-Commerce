import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);

  Dataaa: any;
  //* to decode token
  saveUserData() {
    if (localStorage.getItem('eToken')) {
      let encodeToken: any = localStorage.getItem('eToken');
      let decodeToken = jwtDecode(encodeToken);
      this.Dataaa = decodeToken;
      console.log(this.Dataaa);
    }
  }

  //* api for sign up
  register(userData: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/signup`,
      userData
    );
  }

  //* api for sign in
  login(userData: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/signin`,
      userData
    );
  }

  //* logout
  logout(): void {
    localStorage.removeItem('eToken');
    this._Router.navigate(['/login']);
  }
}
