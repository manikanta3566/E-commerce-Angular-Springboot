import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductService } from '../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../components/delete-dialog/delete-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { EditProductDialogComponent } from '../../components/edit-product-dialog/edit-product-dialog.component';

@Component({
  selector: 'app-seller-home',
  imports: [
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    MatMenu,
    MatIcon,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent {
  constructor(private productService: ProductService) {}

  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = [
    'image',
    'name',
    'price',
    'description',
    'actions',
  ];

  products = new MatTableDataSource<any>([]);

  totalProducts = 0;
  pageSize = 0;
  pageIndex = 0;

  ngOnInit() {
    this.productService.getProducts(0, 10).subscribe((data: any) => {
      this.products = data.data.content;
      this.totalProducts = data.data.totalElements;
      this.pageSize = data.data.pageSize;
      this.pageIndex = data.data.pageNumber;
    });
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
    this.productService
      .getProducts(event.pageIndex, event.pageSize)
      .subscribe((data: any) => {
        this.products = data.data.content;
        this.totalProducts = data.data.totalElements;
        this.pageSize = data.data.pageSize;
        this.pageIndex = data.data.pageNumber;
      });
  }

  openDeleteDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    productName: string,
    productId: string
  ): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { productName: productName, productId: productId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == productId) {
        this.productService.deleteProduct(result).subscribe((data) => {
          if (data) {
            this.productService.getProducts(0, 10).subscribe((data: any) => {
              this.products = data.data.content;
              this.totalProducts = data.data.totalElements;
              this.pageSize = data.data.pageSize;
              this.pageIndex = data.data.pageNumber;
            });
          }
        });
      }
    });
  }

  openEditProductDialog(data: any) {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      data: data,
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.productService
          .updateProduct(result.id, result)
          .subscribe((data) => {
            if (data) {
              this.productService.getProducts(0, 10).subscribe((data: any) => {
                this.products = data.data.content;
                this.totalProducts = data.data.totalElements;
                this.pageSize = data.data.pageSize;
                this.pageIndex = data.data.pageNumber;
              });
            }
          });
      }
    });
  }
}
