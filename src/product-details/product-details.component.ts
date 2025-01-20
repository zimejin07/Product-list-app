import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { GraphqlService } from "../services/graphql.service";
import { Product } from "../models/product.model";
import { interval, Subscription } from "rxjs";
import { ApolloQueryResult } from "@apollo/client/core";
import { ApiResponse } from "../models/api.model";
import { catchError, map, switchMap } from "rxjs/operators";

@Component({
  selector: "app-product-details",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  productId!: string;
  selectedProduct?: Product;
  categoryProducts: Product[] = [];
  countdownText: string = "";

  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private graphqlService: GraphqlService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.route.paramMap
        .pipe(
          map((params) => String(params.get("id"))),
          switchMap((id) => {
            this.productId = id;
            return this.fetchProductDetails();
          })
        )
        .subscribe()
    );

    this.startCountdownToMidnight();
  }

  private fetchProductDetails() {
    return this.graphqlService.getProductDetails(this.productId).pipe(
      map((result: ApolloQueryResult<unknown>) => {
        const response = result.data as ApiResponse;
        this.selectedProduct = response.products[0];
        if (this.selectedProduct?.category.name) {
          this.fetchRelatedProducts(this.selectedProduct.category.name);
        }
      }),
      catchError((error) => {
        console.error("Error fetching product details:", error);
        return [];
      })
    );
  }

  private startCountdownToMidnight() {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    this.subscriptions.add(
      interval(1000)
        .pipe(
          map(() => {
            const now = Date.now();
            const diff = midnight.getTime() - now;

            if (diff <= 0) {
              return "Offer expired!";
            }

            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            return `${hours}h ${minutes}m ${seconds}s`;
          })
        )
        .subscribe((text) => (this.countdownText = text))
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private isApiResponse(data: any): data is ApiResponse {
    return (
      data &&
      typeof data === "object" &&
      "products" in data &&
      Array.isArray(data.products)
    );
  }

  private fetchRelatedProducts(category: string) {
    this.graphqlService.getProducts(category).subscribe({
      next: (response: ApolloQueryResult<unknown>) => {
        if (this.isApiResponse(response.data)) {
            const result = response.data as ApiResponse;
          this.categoryProducts = result.products;
        } else {
          console.error("Data does not match ApiResponse structure");
        }
      },
      error: (error) => {
        console.error("Error fetching related products:", error);
      },
    });
  }
}
