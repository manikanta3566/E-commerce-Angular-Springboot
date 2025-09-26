import { NgFor, NgIf } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { SellerHomeComponent } from '../../pages/seller-home/seller-home.component';

@Component({
  selector: 'app-edit-product-dialog',
  imports: [
    MatDialogContent,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelect,
    MatOption,
    FormsModule,
    NgIf,
    NgFor,
  ],
  templateUrl: './edit-product-dialog.component.html',
  styleUrl: './edit-product-dialog.component.css',
})
export class EditProductDialogComponent {
  categories: string[] = ['Electronics', 'Fashion', 'Books', 'Home'];

  name = '';

  description = '';

  price = '';

  selectedFileName = '';

  imageFileSize = 0;

  imageBase64 = '';

  selectedValue = '';

  product: any = '';

  selectedCategory: string = '';

  readonly dialogRef = inject(MatDialogRef<SellerHomeComponent>);
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {
    this.product = data;
    this.name = this.product.name;
    this.price = this.product.price;
    this.description = this.product.description;
    this.selectedFileName = this.product.imageFileName;
    this.selectedCategory = this.capitalizeFirstLetter(this.product.category);
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.selectedFileName = file.name;
      this.imageFileSize = file.size;
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        this.imageBase64 = base64;
      };
      reader.readAsDataURL(file);
    }
  }

  updateProduct() {
    const updatedProduct = {
      id:this.product.id,
      name:this.name,
      price:this.price,
      description:this.description,
      category: this.selectedCategory,
      base64Image: this.imageBase64,
      imageFileName: this.selectedFileName,
      imageFileSize: this.imageFileSize,
    };
    this.dialogRef.close(updatedProduct);
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
