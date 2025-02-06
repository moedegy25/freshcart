import { Component } from '@angular/core';
import { FlowbiteService } from '../../../sharerd/services-fliwbite/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../../sharerd/services/Authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
   userName!:string;
  islogin:boolean=false;
  toggleserchdropdpwn:boolean=true
  constructor(private flowbiteService: FlowbiteService, public _authe:AuthenticationService) {}
  // I made it public so I can use it in the HTML template along with logout.









  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });

    // Here, I need to subscribe to the BehaviorSubject because any updates to its value will be received, not just at the beginning of the OnInit of the component. Every time the data changes, the function inside subscribe will run and check if the user’s data is null or not. If it's null, the login state will be set to false; otherwise, it will be set to true.
    this._authe.userdata.subscribe(res => { console.log(res)
      if(res !=null)
        {this.islogin=true;
         let decodedToken: any  =res;
         this.userName=decodedToken?.name
        }
        else{
          this.islogin=false
          // I need to handle the else part to ensure that if the user logs out, the login state is set to false when the user's data is null.
        }})
  }

  toggleDropdown(){

    this.toggleserchdropdpwn=!this.toggleserchdropdpwn

  }


}
