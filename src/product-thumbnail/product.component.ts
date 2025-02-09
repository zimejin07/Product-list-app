import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Product } from "../models/product.model";

@Component({
  selector: "app-product",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent {
  @Input() product?: Product;
  @Input() viewContext?: string | null = null;

  get Context() {
    return this.viewContext != null;
  }
}
