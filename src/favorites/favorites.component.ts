import {Component, computed, effect, inject, signal} from "@angular/core";
import {ProductComponent} from "../product-thumbnail/product.component";
import {Product} from "../models/product.model";
import {CommonModule} from "@angular/common";
import {FavoriteService} from "../services/favourite.service";
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {SharedStateService} from "../services/shared.service";

@Component({
    selector: "app-favorites",
    standalone: true,
    imports: [CommonModule, ProductComponent, ProductDetailsComponent],
    templateUrl: "./favorites.component.html",
    styleUrls: ["./favorites.component.scss"],
})
export class FavoritesComponent {
    context = "favorite"
    favoriteService = inject(FavoriteService);
    sharedState = inject(SharedStateService);

    products = computed(() => this.favoriteService.favorites());
    selectedProduct = signal<Product | null>(null);

    filteredProducts = computed(() => {
        if (!this.sharedState.selectedCategory()) {
            return this.products();
        }
        return this.products().filter(
            (product) => product.category === this.sharedState.selectedCategory()
        );
    });

    openModal(product: Product) {
        this.selectedProduct.set(product);
    }

    closeModal() {
        this.selectedProduct.set(null);
    }

constructor() {
    effect(() => {
        console.log(
            "Filtered products have been updated:",
            this.filteredProducts()
        );
    });
}
}
