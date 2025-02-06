import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClient :HttpClient ){ }

getAllCategories(): Observable<string>
{
return this._HttpClient.get<string>(`${enviroment.baseurl}/api/v1/categories`)

}

}
