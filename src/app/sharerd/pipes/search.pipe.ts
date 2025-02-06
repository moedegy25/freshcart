import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search'
})
export class searchPipe implements PipeTransform {

  transform(productlist: Product[], userWord: string,typeofSerch:string): Product[] {
if(typeofSerch=="title"){
    return productlist.filter(product => product.title.toUpperCase().includes (userWord.toUpperCase()) ); 
  }
  
  else if(typeofSerch=="category"){
    return productlist.filter(product => product.category.name.toUpperCase().includes (userWord.toUpperCase()) ); 
  }

 else  if(typeofSerch=="price"){
    return productlist.filter(product => product.price.toString().includes (userWord.toUpperCase()) ); 
  }
  return productlist
}

}
