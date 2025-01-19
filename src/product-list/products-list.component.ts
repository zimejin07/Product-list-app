import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Product } from "../product-model/product-model";
import { ProductsComponent } from "../products/products.component";
import { RouterLink } from "@angular/router";
import { GraphqlService } from "../graphql.service";

@Component({
    selector: 'app-products-list',
    standalone: true,
    imports: [CommonModule, ProductsComponent, RouterLink],
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
    @Input() viewType: 'gridView' | 'tableView' = 'gridView';
    products: Product[] = [];

    constructor(private graphqlService: GraphqlService) { }

    ngOnInit() {
        this.fetchProducts();
    }

    fetchProducts(category?: string) {
        this.graphqlService.getProducts(category).subscribe((response: any) => {
            this.products = response.data.products;
            console.log("product", this.products);
        });
    }
}

