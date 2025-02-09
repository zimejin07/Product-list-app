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
  selectedCategory = signal<string | null>(null);

  favoriteService = inject(FavoriteService);

  selectedProduct = signal<Product | null>(null);

  products = signal<Product[]>([]);

  productCount = computed(() => this.products().length);

  private categorySubscription: Subscription | undefined;

  private productService = inject(ProductService);

  private destroyRef = inject(DestroyRef);

  toggleFavorite(product: Product | null): void {
    product?.id && this.favoriteService.toggleFavorite(product);
    this.closeModal();
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
