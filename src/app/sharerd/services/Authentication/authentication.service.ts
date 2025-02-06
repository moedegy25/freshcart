import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Signupdata } from '../../interfaces/signupdata';
import { enviroment } from '../../../enviroment/enviroment';
import { Signindata } from '../../interfaces/signindata';
import {jwtDecode, JwtPayload} from "jwt-decode"
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userdata:BehaviorSubject<null | JwtPayload >=new BehaviorSubject<null | JwtPayload>(null);
// rxjs : obs behavioursubject
// sub
// getValue
// next
// userData.next() userData.getValue()
// obs vs  behavioursubject in https://chatgpt.com/c/679fbb1f-a778-8012-af59-7679a6fe96dc

  constructor(private _HttpClient:HttpClient , @Inject(PLATFORM_ID) private id:object,private _Router:Router) {
    if(isPlatformBrowser(id)){       //  if dont use  isPlatformBrowser(id) ERROR ReferenceError: localStorage is not defined  
      // to Stay In Website After Refersh If User Login
// To fix the issue where refreshing the page causes files to be reloaded, including the AuthenticationService, the userData will be set to null, making it seem like a logout has occurred.
// To resolve this, I will modify the constructor so that every time the service runs, it checks the localStorage to see if the user token exists. If it does, I will decode it and store it in userData.
      if(localStorage.getItem('usertoken') != null){

          this.verifyToken().subscribe({
          next : (res) => {  this.decodeuserTokenbyJWt() },   // it is verfied
          error : () => { // not verfied
          //1.remove token from localstorage
          //2.userData= null
          //3. navigate login
          this.logout();
          }})
        
      }
      }
    }

   signup(signupdata:Signupdata):Observable<any>{
    return  this._HttpClient.post<any>(`${enviroment.baseurl}/api/v1/auth/signup`,signupdata);
   }

   signin(signindata:Signindata):Observable<any>{
    return  this._HttpClient.post<any>(`${enviroment.baseurl}/api/v1/auth/signin`,signindata);
   }

   decodeuserTokenbyJWt(){
    const token = localStorage.getItem("usertoken") ||"";
    // فhe or operator returns the first true value it finds. That's why if localStorage returns null, it will still return a string
    const decoded = jwtDecode(token);
    this.userdata.next(decoded)
    // This function jwtDecode( ) only accepts parameters of type string, so it won't accept the token because its type is string | null. To solve this issue, we'll use or || "" next to localStorage to ensure it always returns a string.
    }
    
    logout(){
      //1.remove token from localstorage
       localStorage.removeItem('usertoken');
       //2.userData = null
      this.userdata.next(null);
       //3.naviagte login page 
      this._Router.navigate(['login'])
      }
      
      verifyToken(): Observable<any>
      {
      return this._HttpClient.get(`${enviroment.baseurl}/api/v1/auth/verifyToken`,{
      headers : {
      token : localStorage.getItem('usertoken') || "" } } ) }

      forgetPassword(data:any): Observable<any>
      {
      return this._HttpClient.post(`${enviroment.baseurl}/api/v1/auth/forgotPasswords`,data )}
      
      
      verifyResetCode(resetcode:any): Observable<any>
      {
      return this._HttpClient.post(`${enviroment.baseurl}/api/v1/auth/verifyResetCode`,resetcode )}

 
      resetPassword(data:any): Observable<any>
      {
      return this._HttpClient.put(`${enviroment.baseurl}/api/v1/auth/resetPassword`,data )}

      updatePassword(data:any): Observable<any>
      {
        // if(isPlatformBrowser(this.id)){}
        const Header = new HttpHeaders().set("token",localStorage.getItem('usertoken')||"") 

      return this._HttpClient.put(`${enviroment.baseurl}/api/v1/users/changeMyPassword`,data ,{headers:Header})
    }

    updateUserdata(data:any): Observable<any>
    {
      // if(isPlatformBrowser(this.id)){}
      const Header = new HttpHeaders().set("token",localStorage.getItem('usertoken')||"") 

    return this._HttpClient.put(`${enviroment.baseurl}/api/v1/users/updateMe/`,data ,{headers:Header})
  }
 
}
