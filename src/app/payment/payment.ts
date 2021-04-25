import { Order } from "../order/Order";

export interface Card {
    id: number;
    name: number;
    number: number;
    expiry: Date;
    cvv: string;
}

export interface Payment {
    id: number;
    type: string;
    status: string;
    order: Order;
    card: Card;
}