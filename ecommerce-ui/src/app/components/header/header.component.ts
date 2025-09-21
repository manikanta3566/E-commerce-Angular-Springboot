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
      const userStr = localStorage.getItem('user');
      const userData=userStr ? JSON.parse(userStr):'';
      if(userData){
        this.sellerName = userData.name;
        if(userData.roles[0]==='SELLER'){
          this.menuType='SELLER';
        }else{
          this.menuType='DEFAULT';
        }
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
