import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../services/Authentication/authentication.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {
  // Since the Guard is just a function, it doesn’t have a constructor. Therefore, I will use dependency injection with the @Inject function.
  let _AuthService:AuthenticationService = inject(AuthenticationService);
  let _Route:Router=inject(Router);
   if(_AuthService.userdata.getValue() != null){
    return true;
    }
    _Route.navigate(["/home"])
    return false;
  
  
};
