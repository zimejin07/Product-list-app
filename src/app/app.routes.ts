import { Routes } from '@angular/router';
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {ProductsListComponent} from "../product-list/products-list.component";

export const routes: Routes = [
    { path: '', component: ProductsListComponent },
    {path: '**', component: ProductsListComponent},
];