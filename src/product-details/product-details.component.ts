import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Product } from "../models/product.model";
import { interval, Subscription } from "rxjs";
import { map, switchMap } from "rxjs/operators";

@Component({
  selector: "app-product-details",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  productId!: string;
  @Input() selectedProduct?: Product | null;
  categoryProducts: Product[] = [];
  countdownText: string = "";

  private subscriptions = new Subscription();

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscriptions.add(
      this.route.paramMap
        .pipe(
          map((params) => String(params.get("id"))),
          switchMap((id) => {
            this.productId = id;
            return undefined as any;
          })
        )
        .subscribe()
    );

    this.startCountdownToMidnight();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
}
