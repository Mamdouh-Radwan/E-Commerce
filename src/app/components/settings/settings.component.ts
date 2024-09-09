import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { FormControl, FormControlOptions, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';


interface Addresses {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  @ViewChild('fileInput')
  fileInput!: ElementRef;

  constructor(
    private _UserService: UserService,
    private _AuthService: AuthService
  ) {}
  //* variables

  photo: string = './assets/images/OIP.jpeg';
  message: string = '';
  Dataaa: any;
  userName: string = '';
  userAge: string = '';
  age: string = '';
  userEmail: string = '';
  userPhone: string = '';
  userAdress: Addresses[] = [];
  userPass: string = '';
  flag: boolean = true;
  userId: string = '';
  isInputEmpty: boolean = true;
  errMsg: string = '';
  addMsg: string = '';
  passMsg: string = '';
  passMsgd: string = '';
  updatInfo: string = '';

  //*

  ngOnInit(): void {
    //* get id
    if (localStorage.getItem('eToken')) {
      let encodeToken: any = localStorage.getItem('eToken');
      let decodeToken = jwtDecode(encodeToken);
      this.Dataaa = decodeToken;
      this.userId = this.Dataaa.id;
      this.userEmail = localStorage.getItem('mail')!;
      this.userPass = localStorage.getItem('pass')!;
      this.userName = this.Dataaa.name;
    }

    //* ### get pic
    if (localStorage.getItem(this.Dataaa.id)) {
      this.photo = localStorage.getItem(this.Dataaa.id)!;
    } else {
      this.photo = './assets/images/OIP.jpeg';
    }

    //*####
    this.userAge = localStorage.getItem(`${this.userId} age `)!;
    this.age = localStorage.getItem(`${this.userId} age `)!;
    this.userPhone = localStorage.getItem(`${this.userId} phone `)!;
    this.userName = localStorage.getItem(`${this.userId} name `)!;

    //* Get addresss
    this._UserService.getAddresss().subscribe({
      next: (response) => {
        this.userAdress = response.data;
      },
    });
  }
  //* form update
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  });
  //* update info
  updateInfo(): void {
    const userData = this.registerForm.value;
    this.errMsg = '';
    this.updatInfo = '';
    //*
    this._UserService.updateUserData(userData).subscribe({
      next: (response) => {
        this.userName = response.user.name;
        this.userEmail = response.user.email;
        this.userPhone = this.registerForm.value.phone;
        localStorage.setItem(`${this.userId} phone `, this.userPhone);
        localStorage.setItem(`mail`, this.userEmail);
        localStorage.setItem(`${this.userId} name `, this.userName);
        this.updatInfo = 'Update Info Successfull';
        console.log(response);
      },
      error: (err) => {
        this.errMsg = err.error.errors.msg;
      },
    });
  }
  //* form update
  address: FormGroup = new FormGroup({
    details: new FormControl('', [
      Validators.minLength(10),
      Validators.maxLength(40),
      Validators.required,
    ]),
  });
  //* ### Add address
  addAddress(): void {
    const userData = {
      name: this.userName,
      details: this.address.value.details,
      phone: this.userPhone,
      city: 'cairo',
    };
    this.addMsg = '';
    this._UserService.addAddress(userData).subscribe({
      next: (response) => {
        this.address.reset();
        this.addMsg = response.message;
        this.userAdress = response.data;
      },
    });
  }
  //* remove address
  removeAddress(id: string): void {
    this._UserService.removeAddress(id).subscribe({
      next: (response) => {
        console.log(response);
        this.userAdress = response.data;
      },
    });
  }

  //*## add age
  updateButtonState(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.isInputEmpty = false;
  }
  getAge(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.userAge = this.age;
    localStorage.setItem(`${this.userId} age `, this.age);
    this.isInputEmpty = inputValue === '';
  }
  //*###reset Pass

  resetPassword: FormGroup = new FormGroup(
    {
      currentPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w{6,12}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w{6,12}$/),
      ]),
      rePassword: new FormControl(''),
    },
    { validators: [this.confirmPass] } as FormControlOptions
  );

  //* ##### confirmPassword ######
  confirmPass(group: FormGroup): void {
    const pass = group.get('password');
    const rePass = group.get('rePassword');
    if (rePass?.value == '') {
      rePass?.setErrors({ required: true });
    } else if (pass?.value != rePass?.value) {
      rePass?.setErrors({ missMatch: true });
    }
  }
  resetPass(): void {
    const userData = this.resetPassword.value;
    this.passMsg = '';
    this.passMsgd = '';
    this._UserService.updataPass(userData).subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem('eToken', response.token);
        this.passMsg = response.message;
        this.resetPassword.reset();
      },
      error: (err) => {
        console.log(err);
        this.passMsgd = err.error.errors.msg;
      },
    });
  }
}
