import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product:any;

  constructor(private productService:ProductService,private router:ActivatedRoute){

  }

  ngOnInit() {    
    const id = this.router.snapshot.paramMap.get('productId');
    if (id) {
      this.productService.getProduct(id).subscribe((data:any) => {
        this.product=data.data;
      });
    }
  }

  quantity = 1;

  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
