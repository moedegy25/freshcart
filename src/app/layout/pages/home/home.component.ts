import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../sharerd/services/product/product.service';
import { Product } from '../../../sharerd/interfaces/product';
import { Subscription } from 'rxjs';
import { FlowbiteService } from '../../../sharerd/services-fliwbite/flowbite.service';
import { FormsModule } from '@angular/forms';
import { HomesliderComponent } from "../../additions/homeslider/homeslider.component";
import { CategorysliderComponent } from "../../additions/categoryslider/categoryslider.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { searchPipe } from '../../../sharerd/pipes/search.pipe';

@Component({
  selector: 'app-home',
  imports: [searchPipe, FormsModule, HomesliderComponent, CategorysliderComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  productList!:Product[];
  page:string[]=["1","2"];
  pageInicitors:number=1;
  userWord:string="";
  serchType:string="title"
  toggleserchdropdpwn:boolean=true
  productSubscription!:Subscription;

constructor(private flowbiteService: FlowbiteService,private _ProductService:ProductService){}
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });

    this.productSubscription=this._ProductService.getProduct(this.page[0]).subscribe({next: (value) => { console.log(value) ; this.productList=value.data}})
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe()
    console.log("unsubscripe from product opservable")

    
    }

    getPage(page:number){
      this.productSubscription=this._ProductService.getProduct(this.page[page-1]).subscribe({next: (value) => { console.log(value) ; this.productList=value.data}})
      this.pageInicitors=page
    }
    toggleDropdown(){

      this.toggleserchdropdpwn=!this.toggleserchdropdpwn

    }

    setSerchType(serchType:string){
   this.serchType=serchType

    }
}
