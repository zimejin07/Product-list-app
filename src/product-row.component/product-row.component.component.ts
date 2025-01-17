import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-row',
  standalone: true,
  imports: [],
  templateUrl: './product-row.component.component.html',
  styleUrls: ['./product-row.component.component.scss']
})
export class ProductRowComponent {
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

