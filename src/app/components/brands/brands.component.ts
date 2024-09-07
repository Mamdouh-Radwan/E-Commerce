import { Component } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Brands } from '../../core/interfaces/brands';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [NgFor],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
  constructor(private _BrandsService: BrandsService) {}

  //* varialbes
  brands: Brands[] = [];
  details: Brands = {} as Brands;
  
  ngOnInit(): void {
    this._BrandsService.getBrands().subscribe({
      next: (response) => {
        this.brands = response.data;
        this.details.name='';
        this.details.slug='';
        this.details.image='';
      },
    });
  }

  showDetails(id: string) {
    this._BrandsService.getspecBrands(id).subscribe({
      next: (response) => {
        this.details = response.data;
        console.log(this.details);
      },
    });
  }
}
