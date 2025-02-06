import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/Authentication/authentication.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const checkTokenGuard: CanActivateFn = (route, state) => {
  let _AuthService:AuthenticationService = inject(AuthenticationService); 
  let _Router: Router= inject(Router);
  let id:object=inject(PLATFORM_ID);

// const isLoggedIn = !!localStorage.getItem('token');
// If there is a stored token, the function will return a string (e.g., "abc123").
// If there is no token, it will return null.

//  1- First  mark !
// !null becomes true 
//  2- seconde mark !
// !"abc123" becomes false 
//
 if(isPlatformBrowser(id)){  
 if(localStorage.getItem('usertoken')){
  // You can put it directly in the if statement; it will become false if it's null and true if it's a string.
  _Router.navigate(['home']);
   return false;
}}
return true;
};

