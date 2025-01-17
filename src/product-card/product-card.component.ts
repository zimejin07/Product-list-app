import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
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
