import { Component } from '@angular/core';
import { Route, Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterModule,UpperCasePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  menuType:string='DEFAULT';

  sellerName:string='seller name';

  constructor(public authService:AuthService,private router:Router){
  }

  ngOnInit(){
    this.router.events.subscribe((data:any)=>{
      console.log(data.url);
      
      if(data.url==='/seller-home'){
        const userStr = localStorage.getItem('user');
        this.sellerName = userStr ? JSON.parse(userStr).name : '';
        this.menuType='SELLER';
      }else{
        this.menuType='DEFAULT';
      }
    })
  }


  logOut(){
    this.authService.removeLoginDataToLocalStorage();
    this.router.navigate(['seller-auth']);
  }
}
