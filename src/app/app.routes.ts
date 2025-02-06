import { UpdateUserdataComponent } from './layout/additions/update-userdata/update-userdata.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { NotfoundComponent } from './layout/additions/notfound/notfound.component';
import { authenticationGuard } from './sharerd/guards/Authentication/authentication.guard';
import { ForgetpasswordComponent } from './layout/additions/forgetpassword/forgetpassword.component';
import { checkTokenGuard } from './sharerd/guards/check-token.guard';
import { ProductdetailsComponent } from './layout/additions/productdetails/productdetails.component';
import { UpdatepasswordComponent } from './layout/additions/updatepassword/updatepassword.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent,title:'home'},
    {path:'cart',component:CartComponent,canActivate:[authenticationGuard],title:'cart'},
    {path:'products',component:ProductsComponent,title:'products'},
    {path:'Productdetails/:id',component:ProductdetailsComponent, data: { renderMode: 'client'} ,title:'Productdetails'},
    {path:'categories',component:CategoriesComponent,title:'categories'},
    {path:'brands',component:BrandsComponent,title:'brands'},
    {path:'login',canActivate:[checkTokenGuard],component:LoginComponent,title:'login'},
    {path:'register',canActivate:[checkTokenGuard],component:RegisterComponent,title:'register'},
    {path:'forgetPassword',canActivate:[checkTokenGuard],component:ForgetpasswordComponent,title:'forgetPassword'},
    {path:'updatepassword',component:UpdatepasswordComponent,title:'updatepassword'},
    {path:'updateUserData',component:UpdateUserdataComponent,title:'updateUserData'},
    {path:'**',component:NotfoundComponent,title:'notfound'},
   ];
   
   