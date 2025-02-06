import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthenticationService } from '../../../sharerd/services/Authentication/authentication.service';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { VerfiyresetcodeComponent } from "../verfiyresetcode/verfiyresetcode.component";

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule, VerfiyresetcodeComponent],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
   
  
  errmsg!:string;
   isLoading:boolean=false;
   forgetPasswordFlag:boolean = true;
   verfiyCodeFlag:boolean=false;
constructor(private _authe:AuthenticationService){}

forgetPasswordForm :FormGroup = new FormGroup (
    {
       email: new FormControl (null,[Validators.required,Validators.email]),
  }  )



  submitforgetPasswordForm():void{
           
    if(this.forgetPasswordForm.valid){
     this.isLoading=true
     this._authe.forgetPassword(this.forgetPasswordForm.value).subscribe({
       next : res => { console.log(res);  
     
         this.isLoading=false
         this.forgetPasswordFlag = false;
         this.verfiyCodeFlag=true;
        },
       error :err => {  console.log(err);
         this.errmsg=err.error.message;
         this.isLoading=false

       }
   });
    }

}  




}

