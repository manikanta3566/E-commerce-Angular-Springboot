import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatMenu, MatMenuModule} from '@angular/material/menu';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-seller-home',
  imports: [MatTableModule,MatPaginator,MatPaginatorModule,MatMenu,MatIcon,MatMenuModule,MatIconModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent {

  constructor(private productService:ProductService){

  }


  displayedColumns: string[] = ['image', 'name', 'price', 'description', 'actions'];

  products = new MatTableDataSource<any>([]);

  totalProducts = 0;
  pageSize=0;

  ngOnInit() {
    this.productService.getProducts(0,10).subscribe((data:any)=>{
      this.products=data.data.content;
      this.totalProducts=data.data.totalElements;
      this.pageSize=data.data.pageSize;
    })
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.products.paginator = this.paginator;
  }

  onUpdate(product: any) {
    console.log('Edit clicked', product);
  }

  onDelete(product: any) {
    console.log('Delete clicked', product);
  }

  onPageChange(event: PageEvent) {
    console.log('Page changed:', event);
      this.productService.getProducts(event.pageIndex,event.pageSize).subscribe((data:any)=>{
      this.products=data.data.content;
      this.totalProducts=data.data.totalElements;
      this.pageSize=data.data.pageSize;
    })
  }
}
