import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";
import { catchError, map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = "https://dummyjson.com";

  getProducts(): Observable<Product[]> {
    return this.http
      .get<{ products: Product[] }>(`${this.apiUrl}/products`)
      .pipe(
        map((response) => response.products),
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error("An error occurred:", error);
    throw error;
  }
}
