import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { GraphqlService } from "../graphql.service";
import { Product } from "../product-model/product-model";
import { Subscription } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import { ApiResponse } from '../product-model/model';

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
    productId!: string;
    selectedProduct: Product | undefined;
    categoryProducts: Product[] = [];
    private productSubscription!: Subscription;

    constructor(private route: ActivatedRoute, private graphqlService: GraphqlService) {
        this.route.paramMap.subscribe((params) => this.productId = String(params.get('id')));
    }

    ngOnInit() {
        this.fetchProductDetails();
    }

    ngAfterViewInit() {
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

    ngOnDestroy() {
        if (this.productSubscription) {
            this.productSubscription.unsubscribe();
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
