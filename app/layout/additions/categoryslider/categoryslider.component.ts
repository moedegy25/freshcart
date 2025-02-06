import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from './../../../sharerd/services/category/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoryslider',
  imports: [CarouselModule],
  templateUrl: './categoryslider.component.html',
  styleUrl: './categoryslider.component.scss'
})
export class CategorysliderComponent implements OnInit{
  Categorylist!:any[];
    constructor(private _CategoryService:CategoryService){}
  ngOnInit(): void {

this._CategoryService.getAllCategories().subscribe({ next: (value:any) => {console.log(value) ; this.Categorylist = value.data}});  
  }

    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 4
        },
        600:{

          items: 7

        }
      },
      nav: true,
      autoplay:true
    }
}
// 