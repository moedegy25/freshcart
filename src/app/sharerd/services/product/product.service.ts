import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductResponse } from '../../interfaces/product';
import { enviroment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private _HttpClient:HttpClient) { }


 getProduct(numberOfpage:string):Observable<ProductResponse>{
  const PagePramter = new HttpParams().set("page",numberOfpage)
  const Header = new HttpHeaders().set("Content-Type","application/json")
  return this._HttpClient.get<ProductResponse>(`${enviroment.baseurl}/api/v1/products`,{params:PagePramter,headers:Header})
 }

 getSpecificProduct(id:string): Observable <{data : Product}>{
return this._HttpClient.get<{data :Product}>(`${enviroment.baseurl}/api/v1/products/${id}`) }

}
