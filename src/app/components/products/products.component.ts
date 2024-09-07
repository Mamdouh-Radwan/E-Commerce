import { Component } from '@angular/core';
import { EcomdataService } from '../../core/services/ecomdata.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { product } from '../../core/interfaces/product';
import { Categories } from '../../core/interfaces/categories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CarouselModule,NgFor,NgIf,FormsModule,RouterLink,SearchPipe,DecimalPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  constructor(
    private _EcomdataService: EcomdataService,
    private _CartService: CartService,
    private _toastr: ToastrService,
    private _WishlistService: WishlistService
  ) {}

  //* variables
  productData: product[] = [];
  productNoSale: product[] = [];
  categoryData: Categories[] = [];
  serchTerm: string = '';
  wishlistData: string[] = [];
  layout2: boolean = false;
  layout12: boolean = false;
  layout4: boolean = true;
  show: string = 'All Products';
  onSale: boolean = true;
  layout: number = 4;
  generateRatingArray(ratingAverage: number): any[] {
    return Array.from({ length: ratingAverage }, (_, index) => index);
  }

  //* ### category slider
  catlisder: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };
  //* ### get all products
  ngOnInit(): void {
    this._EcomdataService.getAllProduct().subscribe({
      next: (response) => {
        this.productData = response.data;
        console.log(this.productData);
        this.productNoSale = this.productData;
      },
    });
    //* ### get categories

    this._EcomdataService.getcat().subscribe({
      next: (response) => {
        this.categoryData = response.data;
        console.log(response);
      },
    });

    //* get wish list
    this._WishlistService.getWishlist().subscribe({
      next: (response) => {
        const data = response.data.map((item: any) => {
          return item._id;
        });
        this.wishlistData = data;
      },
    });
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

  //* add to wish list
  addOrRemove(id: string) {
    if (this.wishlistData.includes(id)) {
      this._WishlistService.removeWishlist(id).subscribe({
        next: (response) => {
          console.log(response);
          this._toastr.success(response.message);
          this._WishlistService.wishNumber.next(response.data.length);
          this.wishlistData = response.data;
        },
      });
      //*
    } else {
      this._WishlistService.addToWishlist(id).subscribe({
        next: (response) => {
          console.log(response);
          this._toastr.success(response.message);
          this._WishlistService.wishNumber.next(response.data.length);
          this.wishlistData = response.data;
        },
      });
    }
  }
  //*#### layouts
  showGrid2(): void {
    this.layout = 2;
  }
  showGrid12(): void {
    this.layout = 12;
  }
  showGrid4(): void {
    this.layout = 4;
  }

  //* ### product or on sale
  showAll(): void {
    this.show = 'All Products';
    this.productData = this.productNoSale;
  }
  showOnSale(): void {
    this.show = 'On Sale';
    this.productData = this.productData.filter(
      (product) => product.price <= 300 || product.price > 1000
    );
  }
}
