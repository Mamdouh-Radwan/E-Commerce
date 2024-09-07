import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor,NgIf],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService
  ) {}
  //* varialbes

  cartId: any = '';
  userData: object = {};

  //* form group
  checkOut: FormGroup = this._FormBuilder.group({
    details: ['', Validators.required],
    phone: [
      '',
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],
    city: ['', Validators.required],
  });

  //* send id
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        console.log(param.get('id'));
        this.cartId = param.get('id');
      },
    });
  }

  //* when user click
  handleForm(): void {
    console.log(this.checkOut.value);
    this.userData = this.checkOut.value;

    this._CartService.checkOut(this.cartId, this.userData).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status == 'success') {
          window.open(response.session.url , "_self");
        }
      },
    });
  }
}
