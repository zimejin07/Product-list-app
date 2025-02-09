import { Component } from "@angular/core";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  isLightMode = false;
  isFilterMenuActive = false;
  categories: any[] = [];
  selectedCategory: string | undefined;
  products: any[] = [];

  private onCategorySelect(category: string): void {
    if (category) {
    } else {
      console.warn("Invalid category selected");
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
}
