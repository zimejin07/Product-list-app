import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Product } from "../models/product.model";

@Component({
  selector: "app-product",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnChanges {
  private _context: string = "";

  @Input()
  set context(value: string) {
    this._context = value || "default";
  }
  get context(): string {
    return this._context;
  }

  @Input() product?: Product;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["product"]) {
      this.validateProduct(changes["product"].currentValue);
    }
  }

  private validateProduct(product: Product | undefined): void {
    if (!product) {
      console.error("Product input is undefined");
      return;
    }

    if (!product.name || typeof product.price !== "number") {
      console.warn("Product data might be incomplete or invalid.");
    }
  }
}
