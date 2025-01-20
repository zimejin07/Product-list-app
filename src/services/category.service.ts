import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: "root",
})
export class CategoryService {
    private readonly categorySubject = new BehaviorSubject<string | null>(null);
    readonly category$: Observable<string | null> =
        this.categorySubject.asObservable();

    constructor() {
    }

    /**
     * Sets a new category value.
     * @param category - The new category string.
     */
    setCategory(category: string): void {
        if (typeof category !== "string" || category.trim().length === 0) {
            console.warn("Invalid category provided. It must be a non-empty string.");
            return;
        }
        this.categorySubject.next(category);
    }
}
