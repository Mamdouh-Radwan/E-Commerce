import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { UserOrders } from '../../core/interfaces/user-orders';
import { CartService } from '../../core/services/cart.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [NgFor,NgIf,RouterLink],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent {
  constructor(private _CartService: CartService) {}
  //* variables
  Dataa: any;
  userOrders: UserOrders[] = [];
  ngOnInit(): void {
    if (localStorage.getItem('eToken')) {
      let encodeToken: any = localStorage.getItem('eToken');
      let decodeToken = jwtDecode(encodeToken);
      this.Dataa = decodeToken;
    }

    this._CartService.getUserOrders(this.Dataa.id).subscribe({
      next: (response) => {
        console.log(response);
        this.userOrders = response;
      },
    });
  }
}
