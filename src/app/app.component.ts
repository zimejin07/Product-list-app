import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from "@angular/common";
import { GraphqlService } from "../graphql.service";

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    viewType: "gridView" | "tableView" = 'gridView';
    isLightMode = false;
    isFilterMenuActive = false;

    categories: any[] = [];

    selectedCategory: string | undefined;
    products: any[] = [];

    constructor(private graphqlService: GraphqlService) {
    }

    ngOnInit() {
        this.graphqlService.getCategories()
            .subscribe((response: any) => {
                this.categories = response.data.categories;
            });
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

    onCategoryChange(event: Event) {
        const selectElement = event.target as HTMLSelectElement;
        const selectedCategory = selectElement.value;

        if (selectedCategory !== null) {
            this.selectedCategory = selectedCategory;
        } else {
            console.warn("Selected value is null");
        }
    }
}
