import {Product} from "./product-model";

export interface ApiResponse {
    products: Product[];
}

export interface ViewComponent {
    viewType: 'gridView' | 'tableView';
  }