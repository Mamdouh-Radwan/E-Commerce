import { Component } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CartDetails } from '../../core/interfaces/cart-details';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor,NgIf,CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(private _CartService: CartService) {}
  //*#### variables

  cartDetails: CartDetails = {} as CartDetails;
  empty: CartDetails = {} as CartDetails;
  numberOfItems: number = 0;
  navCartNum: number = 0;

  //* show cart details
  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.cartDetails = response.data;
        this.numberOfItems = response.numOfCartItems;
      },
      error: (err) => {
        console.log(err);
      },
    });

    //*####
    this._CartService.cartNubmer.subscribe({
      next: (num) => {
        this.navCartNum = num;
      },
    });
  }

  //* remove from it
  removeCartItem(id: string): void {
    this._CartService.removeItem(id).subscribe({
      next: (response) => {
        console.log(response);

        this.cartDetails = response.data;
        console.log(this.numberOfItems);
        this.numberOfItems = response.numOfCartItems;
        this._CartService.cartNubmer.next(response.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  //* show Stars
  generateRatingArray(ratingAverage: number): any[] {
    return Array.from({ length: ratingAverage }, (star, index) => index);
  }

  //* update count of amount of product
  updateCount(id: string, count: number): void {
    this._CartService.updateCount(id, count).subscribe({
      next: (response) => {
        console.log(response);
        this.cartDetails = response.data;
        this.numberOfItems = response.numOfCartItems;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //* ### clear cart
  clearCart(): void {
    this._CartService.clearCart().subscribe({
      next: (response) => {
        console.log(response);
        if (response.message == 'success') {
          this.cartDetails = this.empty;
          this.numberOfItems = 0;
          this._CartService.cartNubmer.next(0);
        }
      },
    });
  }
}
