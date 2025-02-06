import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthenticationService } from '../../../sharerd/services/Authentication/authentication.service';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errmsg!:string;
   isLoading:boolean=false;
constructor(private _authe:AuthenticationService,private _Router:Router){}

  loginForm :FormGroup = new FormGroup (
    {
       email: new FormControl (null,[Validators.required,Validators.email]),
        password: new FormControl (null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{7,}$/)]),
  }  )



        submitloginForm():void{
           
         if(this.loginForm.valid){
          this.isLoading=true
          this._authe.signin(this.loginForm.value).subscribe({
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
