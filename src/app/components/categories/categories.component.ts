import { Component } from '@angular/core';
import { EcomdataService } from '../../core/services/ecomdata.service';
import { Categories } from '../../core/interfaces/categories';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  constructor(private _EcomdataService: EcomdataService) {}

  categoryData: Categories[] = [];
  catSpec :Categories[]=[];
  flag:boolean =false ;

  //* ### get categories
  ngOnInit(): void {
    this._EcomdataService.getcat().subscribe({
      next: (response) => {
        this.categoryData = response.data;
      },
    });
  }
  //*###
  getCatSpec(id: string) {
    this._EcomdataService.getcatspec(id).subscribe({
      next: (response) => {
        console.log(response);
        this.catSpec = response.data;
        this.flag=true
      },
    });
  }
}
