import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Product } from "../models/product.model";
import { ProductComponent } from "../product-thumbnail/product.component";
import { RouterLink } from "@angular/router";
import { Subscription } from "rxjs";
import { FavoriteService } from "../services/favourite.service";
import { ProductService } from "../services/product.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ProductDetailsComponent } from "../product-details/product-details.component";

@Component({
  selector: "app-products-list",
  standalone: true,
  imports: [CommonModule, ProductComponent, ProductDetailsComponent],
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.scss"],
})
export class ProductsListComponent implements OnDestroy, OnInit {
  viewType: string = "gridView";

  selectedCategory = signal<string | null>(null);

  favoriteService = inject(FavoriteService);

  selectedProduct = signal<Product | null>(null);

  products = signal<Product[]>([]);

  productCount = computed(() => this.products().length);

  favoriteCount = computed(() => this.favoriteService.favorites().size);

  private categorySubscription: Subscription | undefined;

  private productService = inject(ProductService);

  private destroyRef = inject(DestroyRef);

  toggleFavorite(productId: number): void {
    this.favoriteService.toggleFavorite(productId);
  }

  ngOnInit() {
    this.productService
      .getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.products.set(data);
      });
  }

  ngOnDestroy() {
    this.categorySubscription?.unsubscribe();
  }

  openModal(product: Product) {
    this.selectedProduct.set(product);
  }

  closeModal() {
    this.selectedProduct.set(null);
  }
}
