import {effect, Injectable, signal} from "@angular/core";

@Injectable({ providedIn: "root" })
export class SharedStateService {
  selectedCategory = signal<string | null>(null);

  constructor() {
    effect(() => {
      const category = this.selectedCategory();
      if (category) {
        localStorage.setItem('selectedCategory', category);
      } else {
        localStorage.removeItem('selectedCategory');
      }
    });
  }

  setCategory(category: string | null) {
    this.selectedCategory.set(category);
  }
}
