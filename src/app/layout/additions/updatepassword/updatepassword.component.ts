
import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthenticationService } from '../../../sharerd/services/Authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatepassword',
  imports: [ReactiveFormsModule],
  templateUrl: './updatepassword.component.html',
  styleUrl: './updatepassword.component.scss'
})
export class UpdatepasswordComponent {

  errmsg!:string;
  isLoading:boolean=false;
constructor(private _authe:AuthenticationService,private _Router:Router){}

 UpdatePasswordForm :FormGroup = new FormGroup (
   {   currentPassword: new FormControl (null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{7,}$/)]),
       password: new FormControl (null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{7,}$/)]),
        rePassword: new FormControl(null,[Validators.required]) },this.passwordMatchValidator)
       //* add custom validitors as seconde pramter to UpdatePasswordForm :FormGroup
       //*  ,{updateOn:"blur"} it optional parmtaer to UpdatePasswordForm :FormGroup
       //  {updateOn:"blur"} by default is 1-blur and has 2-submit and 3-change values also  to control when validiton  turn on 
       
       //*  create custom validiton
       // AbstractControl is compination between formgroupe aand formcontrol
       passwordMatchValidator (x: AbstractControl) {
         if(x.get('password')?.value == x.get('rePassword')?.value){
         return null;  
         // if not exist error
         }
         else{
           x.get("rePassword")?.setErrors({mismatch: true})
           // add erorr to rePassword formcontrol
           return{mismatch: true} 
           //if  exist erorr return object has error name and:true to error of FormGroup
         }
         
          }


       submitUpdatePasswordForm():void{
          
        if(this.UpdatePasswordForm.valid){
         this.isLoading=true
         this._authe.updatePassword(this.UpdatePasswordForm.value)?.subscribe({
           next : res => { console.log(res);  
             localStorage.setItem("usertoken",res.token)
           this._authe.decodeuserTokenbyJWt()
             this._Router.navigate(["/home"])
             this.isLoading=false

            },
           error :err => {  console.log(err);
             this.errmsg=err.error.errors.msg ;
             this.isLoading=false

           }
       });
        }

   }       

}

