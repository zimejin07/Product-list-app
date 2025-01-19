import { Component, Input } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Product } from "../product-model/product-model";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  @Input() context: string = '';
  @Input() product!: Product;
}
