
export enum ViewType {
    Grid = "gridView",
    Table = "tableView",
}

export interface ViewComponent {
    viewType: ViewType;
}
