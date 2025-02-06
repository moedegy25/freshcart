
import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthenticationService } from '../../../sharerd/services/Authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-userdata',
  imports: [ReactiveFormsModule],
  templateUrl: './update-userdata.component.html',
  styleUrl: './update-userdata.component.scss'
})
export class UpdateUserdataComponent {
  errmsg!:string;
  isLoading:boolean=false;
constructor(private _authe:AuthenticationService,private _Router:Router){}

 UpdateUserdataForm :FormGroup = new FormGroup (
   { name: new FormControl (null,[Validators.required,Validators.minLength(3),Validators.maxLength(8)]),
      email: new FormControl (null,[Validators.required,Validators.email]),
     
        phone: new FormControl (null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])  } )


       submitUpdateUserdataForm():void{
          
        if(this.UpdateUserdataForm.valid){
         this.isLoading=true
         this._authe.updateUserdata(this.UpdateUserdataForm.value).subscribe({
           next : res => { console.log(res);  
             this._Router.navigate(["/home"])
             this.isLoading=false

            },
           error :err => {  console.log(err);
             this.errmsg=err.error.errors.msg;
             this.isLoading=false

           }
       });
        }

   }       

}

