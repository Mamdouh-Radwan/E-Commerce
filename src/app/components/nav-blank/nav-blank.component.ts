import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [NgClass,RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css'
})
export class NavBlankComponent {
  constructor(
    private _AuthService: AuthService,
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {}

  @ViewChild('collapsibleNav')
  collapsibleNav!: ElementRef;

  //* variables
  scrolled: boolean = false;
  navCartNum: number = 0;
  wishlistNum: number = 0;
  windowWidth: number = 0;
  shake: boolean = false;
  shakeCart: boolean = false;
  wishlistUpdated: boolean = false;
  carUpdate: boolean = false;
  photo: string = './assets/images/OIP.jpeg';
  Dataaa: any;

  logoutUser(): void {
    this._AuthService.logout();
  }

  closeToggler(): void {
    const navbarToggler = this.collapsibleNav.nativeElement;
    if (navbarToggler.classList.contains('show')) {
      navbarToggler.classList.remove('show');
    }
  }

  ngOnInit(): void {
    //* get id
    if (localStorage.getItem('eToken')) {
      let encodeToken: any = localStorage.getItem('eToken');
      let decodeToken = jwtDecode(encodeToken);
      this.Dataaa = decodeToken;
    }
    //* get user pic
    if (localStorage.getItem(this.Dataaa.id)) {
      this.photo = localStorage.getItem(this.Dataaa.id)!;
    } else {
      this.photo = './assets/images/OIP.jpeg';
    }

    this._CartService.cartNubmer.subscribe({
      next: (num) => {
        this.navCartNum = num;
        if (this.carUpdate) {
          this.shakeCart = true;
          setTimeout(() => {
            this.shakeCart = false;
          }, 3000);
        } else {
          this.carUpdate = true;
        }
      },
    });
    this.windowWidth = window.innerWidth;

    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.navCartNum = response.numOfCartItems;
      },
    });
    //*#### get wish list num
    this._WishlistService.wishNumber.subscribe({
      next: (num) => {
        this.wishlistNum = num;
        if (this.wishlistUpdated) {
          this.shake = true;
          setTimeout(() => {
            this.shake = false;
          }, 3000);
        } else {
          this.wishlistUpdated = true;
        }
      },
    });
    this._WishlistService.getWishlist().subscribe({
      next: (response) => {
        this.wishlistNum = response.count;
      },
    });
  }
  //* ### scrolled
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 10 || this.windowWidth < 992) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
      if (localStorage.getItem(this.Dataaa.id)) {
        this.photo = localStorage.getItem(this.Dataaa.id)!;
      } else {
        this.photo = './assets/images/OIP.jpeg';
      }
    }
  }
}
