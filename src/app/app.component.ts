import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    viewType: "gridView" | "tableView" = 'gridView';
    isLightMode = false;
    isFilterMenuActive = false;

    constructor() {
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
}
