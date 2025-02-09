import { Component, computed, inject, signal } from "@angular/core";
import { ProductComponent } from "../product-thumbnail/product.component";
import { Product } from "../models/product.model";
import { CommonModule } from "@angular/common";
import { FavoriteService } from "../services/favourite.service";
import {ProductDetailsComponent} from "../product-details/product-details.component";

@Component({
  selector: "app-favorites",
  standalone: true,
  imports: [CommonModule, ProductComponent, ProductDetailsComponent],
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.scss"],
})
export class FavoritesComponent {
  favoriteService = inject(FavoriteService);

  products = computed(() => this.favoriteService.favorites());

  selectedProduct = signal<Product | null>(null);

  constructor() {
    console.log("Favorites", this.favoriteService.favorites());
  }

  openModal(product: Product) {
    this.selectedProduct.set(product);
  }

  closeModal() {
    this.selectedProduct.set(null);
  }
}
