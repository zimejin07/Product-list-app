import {effect, Injectable, signal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class FavoriteService {
    // Load from localStorage on initialization
    favorites = signal<Set<number>>(this.loadFavorites());
    private storageKey = 'favorites';

    constructor() {
        // Effect: Automatically store favorites in localStorage whenever they change
        effect(() => {
            localStorage.setItem(this.storageKey, JSON.stringify(Array.from(this.favorites())));
        });
    }

    toggleFavorite(productId: number): void {
        const updated = new Set(this.favorites());
        updated.has(productId) ? updated.delete(productId) : updated.add(productId);
        this.favorites.set(updated); // <- Triggers effect() to store in localStorage
    }

    isFavorite(productId: number): boolean {
        return this.favorites().has(productId);
    }

    private loadFavorites(): Set<number> {
        const data = localStorage.getItem(this.storageKey);
        if (data) {
            try {
                return new Set(JSON.parse(data));
            } catch {
                return new Set();
            }
        }
        return new Set();
    }
}
