import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SellerAuthComponent } from './pages/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './pages/seller-home/seller-home.component';
import { authGuardGuard } from './auth-guard.guard';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AddProductComponent } from './pages/add-product/add-product.component';

export const routes: Routes = [
    {
        component:HomeComponent,
        path:""
    },
    {
        component:SellerAuthComponent,
        path:'seller-auth'
    },
    {
        component:SellerHomeComponent,
        path:'seller-home',
        canActivate:[authGuardGuard]
    },
    {
        component:AddProductComponent,
        path:'add-product',
        canActivate:[authGuardGuard]
    },
    {
        component:PagenotfoundComponent,
        path:"**"
    }
];
