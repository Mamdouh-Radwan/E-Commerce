import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  @ViewChild('fileInput')
  fileInput!: ElementRef;

  constructor(
    private _UserService: UserService,
    private _AuthService: AuthService
  ) {}
  //* variables

  photo: string = './assets/images/OIP.jpeg';
  selectedFile: File | null = null;
  message: string = '';
  Dataaa: any;
  userName: string = '';
  userEmail: any;
  userId: string = '';

  //*

  ngOnInit(): void {
    //* get id
    if (localStorage.getItem('eToken')) {
      let encodeToken: any = localStorage.getItem('eToken');
      let decodeToken = jwtDecode(encodeToken);
      this.Dataaa = decodeToken;
      this.userId = this.Dataaa.id;

      this.userName = localStorage.getItem(`${this.userId} name `)!;
      this.userEmail = localStorage.getItem('mail');

      console.log(this.Dataaa.id);
    }

    //* ### get pic

    if (localStorage.getItem(this.Dataaa.id)) {
      this.photo = localStorage.getItem(this.Dataaa.id)!;
    } else {
      this.photo = './assets/images/OIP.jpeg';
    }
  }

  logoutUser(): void {
    this._AuthService.logout();
  }

  onUploadClicked(): void {
    this.fileInput.nativeElement.click();
  }
  //* ### Select photo
  onFileSelected(event: any): void {
    this.message = '';
    const file = event.target.files[0];

    if (file) {
      if (file.type.match(/image.*/)) {
        this.selectedFile = file;

        console.log('Selected file:', this.selectedFile);

        const reader = new FileReader();

        reader.onload = (event: any) => {
          this.photo = event.target.result;
          localStorage.setItem(this.Dataaa.id, this.photo);
        };

        reader.readAsDataURL(this.selectedFile!);
      }
      //*
      else {
        this.message = 'Please select an image file.';
      }
    }
  }
  //* #### Remove photo
  remove(): void {
    localStorage.removeItem(this.Dataaa.id);
    this.photo = './assets/images/OIP.jpeg';
  }
}
