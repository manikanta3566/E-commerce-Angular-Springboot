import { Component } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent {
  isLoginForm: boolean = true;
  isError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['seller-home']);
    }
  }

  signUpForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    roles: new FormControl(['SELLER']), // Default value is an array with one item
  });

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  onSignup() {
    this.authService.signUp(this.signUpForm.value).subscribe((data) => {
      if (data) {
        this.signUpForm.reset();
      }
    });
  }

  onLogin() {
    this.authService.login(this.loginForm.value).subscribe(
      (data) => {
        if (data) {
          console.log(data);
          this.authService.setLoginDataToLocalStorage(data);
          this.router.navigate(['seller-home']);
        }
      },
      (error) => {
        if(error){
          this.isError=true;
        }
      }
    );
  }

  toggleSignupForm() {
    this.isLoginForm = false;
  }

  toggleLoginForm() {
    this.isLoginForm = true;
  }
}
