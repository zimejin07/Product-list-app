export interface Product {
    image: { url: string };
    name: string;
    category: { name: string };
    description?: string;
    state: string;
    sales: number;
    stock: number;
    price: number;
}