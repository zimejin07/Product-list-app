import { Component, Input } from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-product-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-row.component.component.html',
  styleUrls: ['./product-row.component.component.scss']
})
export class ProductRowComponent {
  @Input() viewType!: 'gridView' | 'tableView';
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

