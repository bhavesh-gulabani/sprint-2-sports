import { Product } from "../product/product";

export interface Cart {
    id: number;
    items: Map<Product, number>;
    totalAmount: number;
}