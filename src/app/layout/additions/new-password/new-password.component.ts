import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthenticationService } from '../../../sharerd/services/Authentication/authentication.service';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-new-password',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  errmsg!:string;
  isLoading:boolean=false;
constructor(private _authe:AuthenticationService,private _Router:Router){}

 resetPasswordForm :FormGroup = new FormGroup (
   {
      email: new FormControl (null,[Validators.required,Validators.email]),
      newPassword: new FormControl (null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{7,}$/)]),
 }  )



       submitresetPasswordForm():void{
          
        if(this.resetPasswordForm.valid){
         this.isLoading=true
         this._authe.resetPassword(this.resetPasswordForm.value).subscribe({
           next : res => { console.log(res);  
             localStorage.setItem("usertoken",res.token)
             this._authe.decodeuserTokenbyJWt()
             this._Router.navigate(["/home"])
             this.isLoading=false

            },
           error :err => {  console.log(err);
             this.errmsg=err.error.message;
             this.isLoading=false

           }
       });
        }

   }       

}
