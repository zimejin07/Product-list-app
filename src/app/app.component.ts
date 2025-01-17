import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ProductRowComponent} from "../product-row.component/product-row.component.component";
import {CommonModule} from "@angular/common";
import {Product} from "../product-model/product-model";

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, ProductRowComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    viewType: "gridView" | "tableView" = 'gridView';
    isLightMode = false;
    isFilterMenuActive = false;

    mockProductList: Product[] = [
        {
            imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aW50ZXJpb3Jpb3J8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
            name: 'Boheme',
            category: 'Furniture',
            status: 'Active',
            sales: 32,
            stock: 40,
            price: 350,
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aW50ZXJpb3Jpb3J8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
            name: 'Boheme',
            category: 'Furniture',
            status: 'Active',
            sales: 32,
            stock: 40,
            price: 350,
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aW50ZXJpb3Jpb3J8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
            name: 'Boheme',
            category: 'Furniture',
            status: 'Active',
            sales: 32,
            stock: 40,
            price: 350,
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aW50ZXJpb3Jpb3J8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
            name: 'Boheme',
            category: 'Furniture',
            status: 'Active',
            sales: 32,
            stock: 40,
            price: 350,
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aW50ZXJpb3Jpb3J8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
            name: 'Boheme',
            category: 'Furniture',
            status: 'Active',
            sales: 32,
            stock: 40,
            price: 350,
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aW50ZXJpb3Jpb3J8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
            name: 'Boheme',
            category: 'Furniture',
            status: 'Active',
            sales: 32,
            stock: 40,
            price: 350,
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aW50ZXJpb3Jpb3J8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
            name: 'Boheme',
            category: 'Furniture',
            status: 'Active',
            sales: 32,
            stock: 40,
            price: 350,
        }, {
            imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aW50ZXJpb3Jpb3J8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
            name: 'Boheme',
            category: 'Furniture',
            status: 'Active',
            sales: 32,
            stock: 40,
            price: 350,
        },
    ];

    constructor() {
    }

    switchView = (viewType: 'grid' | 'list') => {
        this.viewType = viewType === 'grid' ? 'gridView' : 'tableView';
    };

    toggleMode() {
        this.isLightMode = !this.isLightMode;
        const htmlElement = document.documentElement;
        if (this.isLightMode) {
            htmlElement.classList.add('light');
        } else {
            htmlElement.classList.remove('light');
        }
    }

    toggleFilterMenu() {
        this.isFilterMenuActive = !this.isFilterMenuActive;
    }
}
