import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-search-products',
  imports: [NgFor],
  templateUrl: './search-products.component.html',
  styleUrl: './search-products.component.css',
})
export class SearchProductsComponent {
  constructor(
    private productService: ProductService,
    private router: ActivatedRoute
  ) {}

  searchProducts:any[]=[];

  ngOnInit() {
    const value = this.router.snapshot.paramMap.get('query');
    if (value) {
      this.productService.searchProducts(value).subscribe((data:any) => {
        this.searchProducts=data.data;
      });
    }
  }
}
