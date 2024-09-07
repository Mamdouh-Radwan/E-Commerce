import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForgetPassService } from '../../core/services/forget-pass.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-forget-pass',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './forget-pass.component.html',
  styleUrl: './forget-pass.component.css'
})
export class ForgetPassComponent {
  constructor(
    private _ForgetPassService: ForgetPassService,
    private _Router: Router
  ) {}
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  email: string = '';
  userMsg: string = '';
  color: boolean = true;

  //*#########
  forgot: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  //*
  resetCode: FormGroup = new FormGroup({
    resetCode: new FormControl(''),
  });

  //*
  newPass: FormGroup = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w{6,12}$/),
    ]),
  });
  //*########
  forgotPass(): void {
    const userMail = this.forgot.value;
    this.email = userMail.email;
    this.userMsg = '';
    this._ForgetPassService.forgotPass(userMail).subscribe({
      next: (response) => {
        console.log(response);
        this.userMsg = response.message;
        this.color = false;
        this.step1 = false;
        this.step2 = true;
      },
      error: (err) => {
        console.log(err);
        this.userMsg = err.error.message;
        this.color = true;
      },
    });
  }
  //*
  resetCod(): void {
    const code = this.resetCode.value;
    this.userMsg = '';
    this._ForgetPassService.resetCode(code).subscribe({
      next: (response) => {
        console.log(response);
        this.userMsg = response.status;
        this.color = false;
        this.step2 = false;
        this.step3 = true;
      },
      error: (err) => {
        console.log(err);
        this.userMsg = err.error.message;
        this.color = true;
      },
    });
  }
  //*
  newPassword(): void {
    const form = this.newPass.value;
    form.email = this.email;
    this.userMsg = '';
    this._ForgetPassService.creatNew(form).subscribe({
      next: (response) => {
        console.log(response);
        this.userMsg = response.status;
        this.color = false;
        this._Router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        this.userMsg = err.error.message;
        this.color = true;
      },
    });
  }
}
