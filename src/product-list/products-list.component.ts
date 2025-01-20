import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Product } from "../models/product.model";
import { ProductsComponent } from "../products/products.component";
import { RouterLink } from "@angular/router";
import { GraphqlService } from "../services/graphql.service";
import { CategoryService } from "../services/category.service";
import { Subscription, catchError, EMPTY } from "rxjs";
import {ApiResponse} from "../models/api.model";

@Component({
  selector: "app-products-list",
  standalone: true,
  imports: [CommonModule, ProductsComponent, RouterLink],
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.scss"],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  viewType: "gridView" | "tableView" = "tableView";
  products: Product[] = [];

  selectedCategory: string | null = null;
  private categorySubscription: Subscription | undefined;

  constructor(
    private graphqlService: GraphqlService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.initViewTypeSubscription();
    this.initCategorySubscription();
  }

  private initViewTypeSubscription(): void {
    this.graphqlService.viewType$.pipe(
      catchError((error) => {
        console.error("Failed to fetch view type:", error);
        return EMPTY;
      })
    ).subscribe(viewType => this.viewType = viewType as "gridView" | "tableView");
  }

  private initCategorySubscription(): void {
    this.categorySubscription = this.categoryService.category$.pipe(
      catchError((error) => {
        console.error("Failed to fetch categories:", error);
        return EMPTY;
      })
    ).subscribe(category => {
      this.selectedCategory = category;
      this.selectedCategory ? this.fetchProductsByCategory(this.selectedCategory) : this.fetchProducts();
    });
  }

  trackByProductName(index: number, product: Product): string {
    return product.name;
  }

  private fetchProducts(category?: string): void {
    this.graphqlService.getProducts(category).pipe(
      catchError((error) => {
        console.error("Failed to fetch products:", error);
        return EMPTY;
      })
    ).subscribe(response => {
      const result = response.data as ApiResponse;
      this.products = result?.products ?? [];
    });
  }

  private fetchProductsByCategory(category: string): void {
    console.log(`Fetching products for category: ${category}`);
    this.fetchProducts(category);
  }

  ngOnDestroy() {
    this.categorySubscription?.unsubscribe();
  }
}
