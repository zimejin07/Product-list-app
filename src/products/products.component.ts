import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  @Input() context: string = '';
  @Input() product!: {
    imageUrl: string;
    name: string;
    category: string;
    status: string;
    sales: number;
    stock: number;
    price: number;
  };
}
