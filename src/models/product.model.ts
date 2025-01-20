export enum ProductState {
  Available = "Available",
  OutOfStock = "OutOfStock",
  Discontinued = "Discontinued",
}

type UrlString = string;

export interface Image {
  readonly url: UrlString;
}

export interface Category {
  readonly name: string;
}

export interface Product {
  readonly image: Image;
  readonly name: string;
  readonly category: Category;
  readonly description?: string;
  readonly state: ProductState;
  readonly sales: number;
  readonly stock: number;
  readonly price: number;
}
