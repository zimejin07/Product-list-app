import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { GraphqlService } from "../graphql.service";
import { Product } from "../product-model/product-model";
import {interval, map, Subscription} from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import { ApiResponse } from '../product-model/model';

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
    productId!: string;
    selectedProduct: Product | undefined;
    categoryProducts: Product[] = [];
    private productSubscription!: Subscription;

    countdownText: string = '';
    private countdownSubscription!: Subscription;

    constructor(private route: ActivatedRoute, private graphqlService: GraphqlService) {
        this.route.paramMap.subscribe((params) => {
            this.productId = String(params.get('id'))
            this.fetchProductDetails();
        })
    }

    ngOnInit() {
        this.startCountdownToMidnight();
    }

    fetchProductDetails() {
        this.productSubscription = this.graphqlService.getProductDetails(this.productId).subscribe({
            next: (result: ApolloQueryResult<unknown>) => {
                const response = result.data as ApiResponse;
                this.selectedProduct = response.products[0];
                this.fetchRelatedProduct(this.selectedProduct.category.name)
            }, error: (err) => {
                console.error(err);
            }
        });
    }

    private startCountdownToMidnight() {
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        const midnightTime = midnight.getTime();

        this.countdownSubscription = interval(1000)
            .pipe(
                map(() => {
                    const now = Date.now();
                    const diff = midnightTime - now;

                    if (diff <= 0) {
                        return 'Offer expired!';
                    }

                    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                    const minutes = Math.floor((diff / (1000 * 60)) % 60);
                    const seconds = Math.floor((diff / 1000) % 60);

                    return `${hours}h ${minutes}m ${seconds}s`;
                })
            )
            .subscribe((text) => {
                this.countdownText = text;
            });
    }

    ngOnDestroy() {
        if (this.productSubscription) {
            this.productSubscription.unsubscribe();
        }

        if (this.countdownSubscription) {
            this.countdownSubscription.unsubscribe();
        }
    }

    private fetchRelatedProduct(category: string) {
        this.graphqlService.getProducts(category).subscribe({
            next: (result) => {
                const response = result.data as ApiResponse;
                this.categoryProducts = response.products;
            }, error: (err) => {
                console.error(err);
            }
        });
    }

}
