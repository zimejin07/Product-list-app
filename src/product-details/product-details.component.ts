import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Product } from "../models/product.model";
import { interval, Subscription } from "rxjs";
import { map} from "rxjs/operators";

@Component({
  selector: "app-product-details",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  @Input() selectedProduct?: Product | null;
  @Output() close: EventEmitter<void> = new EventEmitter();

  categoryProducts: Product[] = [];
  countdownText: string = "";

  private subscriptions = new Subscription();

  ngOnInit() {
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
