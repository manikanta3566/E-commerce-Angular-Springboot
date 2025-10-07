import { Component } from '@angular/core';
import { Route, Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterModule,
    UpperCasePipe,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuType: string = 'DEFAULT';

  sellerName: string = 'seller name';

  searchControl = new FormControl();
  filteredProducts: string[] = [];
  constructor(
    public authService: AuthService,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((data: any) => {
      const userStr = localStorage.getItem('user');
      const userData = userStr ? JSON.parse(userStr) : '';
      if (userData) {
        this.sellerName = userData.name;
        if (userData.roles[0] === 'SELLER') {
          this.menuType = 'SELLER';
        } else {
          this.menuType = 'DEFAULT';
        }
      } else {
        this.menuType = 'DEFAULT';
      }
    });

    // 👇 search autocomplete logic
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // wait for user to stop typing
        distinctUntilChanged(),
        switchMap((value: string) => {
          if (value && value.length > 1) {
            // call backend API
            return this.productService.searchProducts(value);
          } else {
            return of([]); // empty array if input < 2 chars
          }
        })
      )
      .subscribe((results: any) => {
        this.filteredProducts = results.data.map(
          (product: any) => product.name
        );
        console.log(this.filteredProducts);
      });
  }

  onSearchBlur() {
    // Delay clearing a little to allow option click
    setTimeout(() => {
      this.filteredProducts = [];
    }, 200);  
  }

  logOut() {
    this.authService.removeLoginDataToLocalStorage();
    this.router.navigate(['seller-auth']);
  }

  onProductSelect(value:string){
    this.router.navigate([`search/${value}`])
  }
}
