import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Product } from "../models/product.model";
import { ProductComponent } from "../product-thumbnail/product.component";
import { FavoriteService } from "../services/favourite.service";
import { ProductService } from "../services/product.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { SharedStateService } from "../services/shared.service";

@Component({
  selector: "app-products-list",
  standalone: true,
  imports: [CommonModule, ProductComponent, ProductDetailsComponent],
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.scss"],
})
export class ProductsListComponent implements OnInit {
  selectedProduct = signal<Product | null>(null);
  products = signal<Product[]>([]);
  sharedState = inject(SharedStateService);
  filteredProducts = computed(() => {
    if (!this.sharedState.selectedCategory()) {
      return this.products();
    }
    return this.products().filter(
      (product) => product.category === this.sharedState.selectedCategory()
    );
  });
  private productService = inject(ProductService);
  private favoriteService = inject(FavoriteService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      console.log(
        "Filtered products have been updated:",
        this.filteredProducts()
      );
    });
  }

  ngOnInit() {
    this.productService
      .getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.products.set(data);
      });
  }

  toggleFavorite(product: Product | null): void {
    product?.id && this.favoriteService.toggleFavorite(product);
    this.closeModal();
  }

  openModal(product: Product) {
    this.selectedProduct.set(product);
  }

  closeModal() {
    this.selectedProduct.set(null);
  }
}
