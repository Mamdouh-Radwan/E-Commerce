import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {}
  private readonly _HttpClient = inject(HttpClient);
  //* cartnav number
  cartNubmer: BehaviorSubject<number> = new BehaviorSubject(0);

  //* add from home and details to cart
  addToCart(id: String): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/cart`,
      { productId: id }
    );
  }

  //* show cart details in cart component
  getUserCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }

  //* remove product from cart
  removeItem(id: string): Observable<any> {
    return this._HttpClient.delete(
      `${environment.baseUrl}/api/v1/cart/${id}`
    );
  }

  //* update count of amount of product
  updateCount(id: string, count: number): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}/api/v1/cart/${id}`,
      { count: count }
    );
  }

  //* clear cart
  clearCart(): Observable<any> {
    return this._HttpClient.delete(
      `${environment.baseUrl}/api/v1/cart/`
    );
  }
  //* check out
  checkOut(id: string, userData: object): Observable<any> {
    const encodedUrl = encodeURIComponent(
      'https://mamdouh-radwan.github.io/startFramework/'
    );
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${encodedUrl}`,
      {
        shippingAddress: userData,
      }
    );
  }

  //* get user orders
  getUserOrders(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    );
  }
}
