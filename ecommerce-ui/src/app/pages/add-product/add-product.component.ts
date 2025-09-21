import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  productForm: FormGroup;
  base64Image: string = '';
  @ViewChild('fileUpload') fileUpload!: ElementRef<HTMLInputElement>;
  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onFileChange(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        this.base64Image = base64;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    console.log("submit");
    if (this.productForm.valid && this.base64Image) {
      const formValue = this.productForm.value;
      const payload = {
        name: formValue.name,
        price: formValue.price,
        category: formValue.category,
        description: formValue.description,
        base64Image: this.base64Image,
      };

      this.productService.addProduct(payload).subscribe((data: any) => {
        if(data){
          this.productForm.reset();
          this.fileUpload.nativeElement.value = '';
        }
      });
    }
  }
}
