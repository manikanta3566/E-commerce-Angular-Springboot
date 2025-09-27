import {
  Component,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatCardModule,MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {
  // Reference to the Swiper element for initializing carousel
  @ViewChild('swiper', { read: ElementRef }) swiperEl?: ElementRef;

  // Products to show in the top carousel
  swipperProducts: any[] = [];

  // Products to show in the grid below carousel
  products: any[] = [];

  // Flag to check if Swiper has been initialized
  swiperInitialized = false;

  // Pagination variables for infinite scroll
  page = 0;        // Current page number
  pageSize = 12;   // Number of products to fetch per request
  loading = false; // Flag to prevent multiple concurrent API calls

  slidesPerView=3;

  // Sentinel div to detect scroll for infinite loading
  @ViewChild('scrollAnchor') scrollAnchor!: ElementRef;

  constructor(private productService: ProductService) {}

  /** 
   * ngOnInit
   * Called once when component initializes.
   * Fetches the initial set of products for the top carousel.
   */
  ngOnInit() {
    this.productService.getProducts(0, 6).subscribe((data: any) => {
      this.swipperProducts = data.data.content; // Assign fetched products to carousel
    });
  }

  /**
   * ngAfterViewChecked
   * Called after Angular checks the component's views and child views.
   * Used here to initialize the Swiper carousel after the slides have rendered.
   */
  ngAfterViewChecked() {
    if (this.swipperProducts.length && this.swiperEl && !this.swiperInitialized) {
      const el: any = this.swiperEl.nativeElement;
      if (el && typeof el.initialize === 'function') {
        el.initialize(); // Initialize Swiper
        this.swiperInitialized = true; // Ensure it initializes only once
      }
    }
  }

  /**
   * ngAfterViewInit
   * Called once after the component's view has been fully initialized.
   * Sets up IntersectionObserver to detect when the user scrolls near the bottom of the product grid.
   */
  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      // Trigger loading when sentinel div comes into view and we're not already loading
      if (entries[0].isIntersecting && !this.loading) {
        console.log('scroll'); 
        this.loadProducts();
      }
    });

    // Observe the sentinel div at the bottom of the grid
    observer.observe(this.scrollAnchor.nativeElement);
  }

  /**
   * loadProducts
   * Fetches the next page of products from the backend.
   * Appends the new products to the existing grid array for infinite scroll.
   */
  loadProducts() {
    this.loading = true; // Prevent multiple API calls simultaneously

    this.productService.getProducts(this.page, this.pageSize).subscribe(
      (data: any) => {
        // Append newly fetched products to existing list
        this.products = [...this.products, ...data.data.content];
        this.page++;       // Increment page for next request
        this.loading = false; // Reset loading flag
      },
      (error) => {
        console.error('Failed to load products', error);
        this.loading = false; // Reset loading flag even on error
      }
    );
  }
}
