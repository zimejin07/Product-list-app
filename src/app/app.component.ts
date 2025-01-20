import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { GraphqlService } from "../services/graphql.service";
import { CategoryService } from "../services/category.service";
import { catchError, of } from "rxjs";

@Component({
  selector: "app-root",
  imports: [CommonModule, RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  isLightMode = false;
  isFilterMenuActive = false;
  categories: any[] = [];
  selectedCategory: string | undefined;
  products: any[] = [];

  constructor(
    private graphqlService: GraphqlService,
    private categoryService: CategoryService
  ) {}

  private onCategorySelect(category: string): void {
    if (category) {
      this.categoryService.setCategory(category);
    } else {
      console.warn("Invalid category selected");
    }
  }

  switchView(viewType: "gridView" | "tableView"): void {
    try {
      this.graphqlService.viewType$.next(viewType);
    } catch (error) {
      console.error("Failed to switch view type", error);
    }
  }

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
      this.selectedCategory = selectedCategory;
      this.onCategorySelect(this.selectedCategory);
    } else {
      console.warn("Selected value is null or invalid");
    }
  }

  loadCategories(): void {
    this.graphqlService
      .getCategories()
      .pipe(
        catchError((error) => {
          console.error("Error fetching categories", error);
          return of({ data: { categories: [] } });
        })
      )
      .subscribe((response: any) => {
        if (
          response &&
          response.data &&
          Array.isArray(response.data.categories)
        ) {
          this.categories = response.data.categories;
        } else {
          console.warn("Unexpected response structure", response);
          this.categories = [];
        }
      });
  }

  ngOnInit(): void {
    this.loadCategories();
  }
}
