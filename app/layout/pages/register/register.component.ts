import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthenticationService } from '../../../sharerd/services/Authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

   errmsg!:string;
   isLoading:boolean=false;
constructor(private _authe:AuthenticationService,private _Router:Router){}

  registerForm :FormGroup = new FormGroup (
    { name: new FormControl (null,[Validators.required,Validators.minLength(3),Validators.maxLength(8)]),
       email: new FormControl (null,[Validators.required,Validators.email]),
        password: new FormControl (null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{7,}$/)]),
         rePassword: new FormControl(null,[Validators.required]), 
         phone: new FormControl (null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])  } ,this.passwordMatchValidator)
        //* add custom validitors as seconde pramter to registerForm :FormGroup
        //*  ,{updateOn:"blur"} it optional parmtaer to registerForm :FormGroup
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


        submitRegisterForm():void{
           
         if(this.registerForm.valid){
          this.isLoading=true
          this._authe.signup(this.registerForm.value).subscribe({
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
