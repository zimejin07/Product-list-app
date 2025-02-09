import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Product } from "../models/product.model";

@Component({
  selector: "app-product",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnChanges {
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
  }
}
