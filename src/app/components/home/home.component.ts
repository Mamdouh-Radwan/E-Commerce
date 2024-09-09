import { Component, NgModule } from '@angular/core';
import { EcomdataService } from '../../core/services/ecomdata.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { product } from '../../core/interfaces/product';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, NgModel } from '@angular/forms';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { MainSliderComponent } from "../main-slider/main-slider.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, RouterLink, SearchPipe, NgxPaginationModule, DecimalPipe, MainSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private _EcomdataService: EcomdataService,
    private _CartService: CartService,
    private _toastr: ToastrService,
    private _WishlistService: WishlistService
  ) {}
  
  //* variables
  productData: product[] = [];
  productNoSale: product[] = [];
  serchTerm: string = '';
  pageSize: number = 0; //* limit
  currentPage: number = 1; //* current
  total: number = 0;
  wishlistData: string[] = [];
  layout2: boolean = false;
  layout12: boolean = false;
  layout4: boolean = true;
  show: string = 'All Products';
  onSale: boolean = true;
  layout: number = 4;
  Dataaa: any;
  //* show Stars
  generateRatingArray(ratingAverage: number): any[] {
    return Array.from({ length: ratingAverage }, (star, index) => index);
  }

  //* ### get all products
  ngOnInit(): void {
    this._EcomdataService.getAllProductss().subscribe({
      next: (response) => {
        this.productData = response.data;
        console.log(response.metadata);
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
        this.productNoSale = this.productData;
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

    //* ### GEt token
    if (localStorage.getItem('eToken')) {
      let encodeToken: any = localStorage.getItem('eToken');
      let decodeToken = jwtDecode(encodeToken);
      this.Dataaa = decodeToken;
      console.log(this.Dataaa);
    }
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
          this._toastr.warning(response.message);
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
  //* ### pageChanged
  pageChanged(event: any): void {
    console.log(event);
    this._EcomdataService.getAllProductss(event).subscribe({
      next: (response) => {
        this.productData = response.data;
        console.log(response.metadata);
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
    });
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
