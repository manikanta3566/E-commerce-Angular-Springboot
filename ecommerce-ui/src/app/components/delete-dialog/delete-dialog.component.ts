import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { SellerHomeComponent } from '../../pages/seller-home/seller-home.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-delete-dialog',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css',
})
export class DeleteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<SellerHomeComponent>);
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { productName: string; productId: string }
  ) {}
  deleteProduct(productId: string) {
    this.dialogRef.close(productId);
  }
}
