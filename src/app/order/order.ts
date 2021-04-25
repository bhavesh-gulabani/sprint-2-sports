import { Cart } from "../cart/cart";
import { Customer } from "../customer/customer";
import { Payment } from "../payment/payment";

export interface Order {
    id: number;
    amount: number;
    billingDate: Date;
    customer: Customer;
    payment: Payment;
    cart: Cart;
}