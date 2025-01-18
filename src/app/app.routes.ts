import { Routes } from '@angular/router';
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {ProductsListComponent} from "../product-list/products-list.component";

export const routes: Routes = [
    { path: '', component: ProductsListComponent }, // Product list as the default route
    { path: 'product/:id', component: ProductDetailsComponent }, // Product details with dynamic ID
    { path: 'product-details', component: ProductDetailsComponent }, // Product details with dynamic ID
    { path: 'products-list', component: ProductsListComponent }, // Product details with dynamic ID
];