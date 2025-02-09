import { Routes } from "@angular/router";
import { ProductsListComponent } from "../product-list/products-list.component";
import { FavoritesComponent } from "../favorites/favorites.component";

export const routes: Routes = [
  { path: "", component: ProductsListComponent },
  { path: "favorites", component: FavoritesComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];
