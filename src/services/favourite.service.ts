import { effect, Injectable, signal } from "@angular/core";
import { Product } from "../models/product.model";

@Injectable({ providedIn: "root" })
export class FavoriteService {
  favorites = signal<Product[]>([]);

  private storageKey = "favorites";

  constructor() {
    this.favorites.set(this.loadFavorites());

    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.favorites()));
    });
  }

  toggleFavorite(product: Product): void {
    const updatedFavorites = [...this.favorites()];
    const index = updatedFavorites.findIndex((p) => p.id === product.id);

    if (index !== -1) {
      updatedFavorites.splice(index, 1);
    } else {
      updatedFavorites.push(product);
    }

    this.favorites.set(updatedFavorites);
  }

  isFavorite(productId: number): boolean {
    return this.favorites().some((p) => p.id === productId);
  }

  private loadFavorites(): Product[] {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      try {
        console.log("loaded favorites", data);
        return JSON.parse(data);
      } catch {
        return [];
      }
    }
    return [];
  }
}
