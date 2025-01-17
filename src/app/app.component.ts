import {Component, AfterViewInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  filterButton!: Element | null;
  gridButton!: Element | null;
  listButton!: Element | null;
  productsAreaWrapper!: Element | null;
  modeSwitch!: Element | null;

  constructor() {
  }

  toggleClass = (element: Element, className: string) => {
    element.classList.toggle(className);
  };

  setActiveButton = (activeButton: Element, inactiveButton: Element) => {
    this.toggleClass(activeButton, "active");
    this.toggleClass(inactiveButton, "active");
  };

  switchView = (viewType: 'grid' | 'list') => {
    if (!this.gridButton || !this.listButton || !this.productsAreaWrapper) {
      console.error("One or more required elements are not found.");
      return;
    }

    if (viewType === 'grid') {
      this.setActiveButton(this.gridButton, this.listButton);
      this.productsAreaWrapper.classList.add("gridView");
      this.productsAreaWrapper.classList.remove("tableView");
    } else {
      this.setActiveButton(this.listButton, this.gridButton);
      this.productsAreaWrapper.classList.remove("gridView");
      this.productsAreaWrapper.classList.add("tableView");
    }
  };

  ngAfterViewInit() {
    this.filterButton = document.querySelector(".jsFilter");
    this.gridButton = document.querySelector(".grid");
    this.listButton = document.querySelector(".list");
    this.productsAreaWrapper = document.querySelector(".products-area-wrapper");
    this.modeSwitch = document.querySelector('.mode-switch');

    if (!this.filterButton || !this.gridButton || !this.listButton || !this.productsAreaWrapper || !this.modeSwitch) {
      console.error("One or more required elements are not found in the DOM.");
      return;
    }

    this.filterButton.addEventListener("click", () => {
      const filterMenu = document.querySelector(".filter-menu");
      if (filterMenu) {
        this.toggleClass(filterMenu, "active");
      }
    });

    this.gridButton.addEventListener("click", () => this.switchView('grid'));
    this.listButton.addEventListener("click", () => this.switchView('list'));

    this.modeSwitch.addEventListener('click', () => {
      this.toggleClass(document.documentElement, 'light');
      if (this.modeSwitch) {
        this.toggleClass(this.modeSwitch, 'active');
      }
    });
  }
}
