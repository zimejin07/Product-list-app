import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categorySubject = new BehaviorSubject<string | null>(null);
  category$ = this.categorySubject.asObservable();

  constructor() { }

  // Method to update the selected category
  setCategory(category: string) {
    this.categorySubject.next(category);
  }
}
