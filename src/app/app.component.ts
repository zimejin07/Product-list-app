import {Component, DestroyRef, inject, OnInit, signal} from "@angular/core";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {Category} from "../models/category model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ProductService} from "../services/product.service";
import {SharedStateService} from "../services/shared.service";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
    isLightMode = false;
    isFilterMenuActive = false;

    destroyRef = inject(DestroyRef);
    productService = inject(ProductService);
    sharedState = inject(SharedStateService);

    categories = signal<Category[]>([]);

    toggleMode(): void {
        this.isLightMode = !this.isLightMode;
        document.documentElement.classList.toggle("light", this.isLightMode);
    }

    toggleFilterMenu(): void {
        this.isFilterMenuActive = !this.isFilterMenuActive;
    }

    onCategoryChange(event: Event): void {
        const selectElement = event.target as HTMLSelectElement;
        const selectedCategory = selectElement.value;

        if (selectedCategory) {
            this.onCategorySelect(selectedCategory);
        } else {
            console.warn("Selected value is null or invalid");
        }
    }

    private onCategorySelect(category: string): void {
        if (category) {
            console.log('On category change fired', category);
            this.sharedState.setCategory(category);
        } else {
            console.warn("Invalid category selected");
        }
    }

    ngOnInit() {
        this.productService
            .getProductCategories()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((data) => {
                this.categories.set(data);
            });
    }
}
