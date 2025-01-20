import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from "@angular/common";
import { Product } from "../product-model/product-model";
import { ProductsComponent } from "../products/products.component";
import { RouterLink } from "@angular/router";
import { GraphqlService } from "../graphql.service";
import {CategoryService} from "../category.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-products-list',
    standalone: true,
    imports: [CommonModule, ProductsComponent, RouterLink],
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
    viewType: 'gridView' | 'tableView' = 'tableView';
    products: Product[] = [];

    selectedCategory: string | null = null;
    private categorySubscription!: Subscription;

    constructor(private graphqlService: GraphqlService, private categoryService: CategoryService) {
        this.graphqlService.viewType$.subscribe((viewType) => {
            this.viewType = viewType as 'gridView' | 'tableView';
        })
    }

    ngOnInit() {
        this.categorySubscription = this.categoryService.category$.subscribe(
            (category) => {
                this.selectedCategory = category;
                if (this.selectedCategory) {
                    this.fetchProductsByCategory(this.selectedCategory);
                } else {
                    this.fetchProducts();
                }
            }
        );
    }

    fetchProducts(category?: string) {
        this.graphqlService.getProducts(category).subscribe((response: any) => {
            this.products = response.data.products;
        });
    };
    fetchProductsByCategory(category: string) {
        console.log(`Fetching products for category: ${category}`);
        this.fetchProducts(category);
    }

    ngOnDestroy() {
        if (this.categorySubscription) {
            this.categorySubscription.unsubscribe();
        }
    }
}

