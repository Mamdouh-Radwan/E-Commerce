import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor() {}
  private readonly _HttpClient = inject(HttpClient);

  //*## wishlist number
  wishNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  wishlistData: string[] = [];


  //*### add to wishlist

  addToWishlist(id: string): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/wishlist`,
      { productId: id }
    );
  }

  //*### add to wishlist

  getWishlist(): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseUrl}/api/v1/wishlist`
    );
  }
  //*### Remove

  removeWishlist(id:string): Observable<any> {
    return this._HttpClient.delete(
      `${environment.baseUrl}/api/v1/wishlist/${id}`
    );
  }
}
