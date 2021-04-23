import { Product } from "../product/product";

// export interface Cart {
//     products: Product[];
//     quantity: number;
// }

export interface Order {

    cart: Map<Product, number>,
    // cart: Cart
    
}