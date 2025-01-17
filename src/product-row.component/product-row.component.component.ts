import { Component, Input } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ProductCardComponent} from "../product-card/product-card.component";
import {Product} from "../product-model/product-model";

@Component({
  selector: 'app-product-row',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-row.component.component.html',
  styleUrls: ['./product-row.component.component.scss']
})
export class ProductRowComponent {
  @Input() viewType!: 'gridView' | 'tableView';
  @Input() productList!:Product[];
}

