import { Product } from './../../../sharerd/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../sharerd/services/product/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productdetails',
  imports: [CarouselModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent implements OnInit {
Product!:Product;
ProductId!:string;

constructor(private _ProductService:ProductService,private _ActivatedRoute:ActivatedRoute){

}
  ngOnInit(): void {
    // ActivatedRoute sends me the parameter present in the URL that I specified in the route of the page.
    //  It sends it as an observable, so I subscribe to it.

    this._ActivatedRoute.params.subscribe({
      next: res => {
      console.log(res["id"]); this.ProductId=res["id"]
      // you should acess property with [property name ] not with .propertyname 
      // Property 'id' comes from an index signature, so it must be accessed with ['id']
      // The result is an index signature, so I need to access it like this.
      }
      })

    this._ProductService.getSpecificProduct(this.ProductId).subscribe(
      {next: (value)=>{console.log(value.data); this.Product=value.data}})

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
        items: 1
      },
 
    },
    nav: true,
    autoplay:true
  }

}
