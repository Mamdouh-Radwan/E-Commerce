import { Component } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { product } from '../../core/interfaces/product';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [NgFor,NgIf,CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  constructor(
    private _WishlistService: WishlistService,
    private _toastr: ToastrService,
    private _CartService: CartService
  ) {}

  //* ## variables

  productData: product[] = [];
  numberOfItems: number = 0;
  //*### get wish list array
  ngOnInit(): void {
    this._WishlistService.getWishlist().subscribe({
      next: (response) => {
        console.log(response);
        this.productData = response.data;
        this.numberOfItems = response.count;
      },
    });
  }
  //* remove from wish list
  remove(id: string) {
    this._WishlistService.removeWishlist(id).subscribe({
      next: (response) => {
        console.log(response);
        this._toastr.success(response.message);
        this._WishlistService.wishNumber.next(response.data.length);

        //* Remove the item from productData array
        this.productData = this.productData.filter(
          (product) => product._id !== id
        );

        //* Update the number of items
        this.numberOfItems = this.productData.length;
      },
    });
  }
  //* show Stars
  generateRatingArray(ratingAverage: number): any[] {
    return Array.from({ length: ratingAverage }, (star, index) => index);
  }

  //* ### add to cart
  addCart(id: String): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        console.log(response);
        console.log(response.numOfCartItems);
        this._toastr.success(response.message);
        this._CartService.cartNubmer.next(response.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
