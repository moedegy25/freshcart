import { Component } from '@angular/core';
import { AuthenticationService } from '../../../sharerd/services/Authentication/authentication.service';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { NewPasswordComponent } from "../new-password/new-password.component";

@Component({
  selector: 'app-verfiyresetcode',
  imports: [ReactiveFormsModule, NewPasswordComponent],
  templateUrl: './verfiyresetcode.component.html',
  styleUrl: './verfiyresetcode.component.scss'
})
export class VerfiyresetcodeComponent {
  errmsg!:string;
  isLoading:boolean=false;
  verfiyCodeFlag:boolean=true;
  resetPasswordFlag:boolean = false;

  constructor(private _authe:AuthenticationService){}
  resetcodeForm :FormGroup = new FormGroup (
    {
      resetCode: new FormControl (null,[Validators.required,Validators.pattern(/^[0-9]{4,}$/)]),
  }  )



  submitresetcodeForm():void{
    
    if(this.resetcodeForm.valid){
     this.isLoading=true
     this._authe.verifyResetCode(this.resetcodeForm.value).subscribe({
       next : res => { console.log(res);  
        this.verfiyCodeFlag=false;
        this.resetPasswordFlag= true;
      
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
