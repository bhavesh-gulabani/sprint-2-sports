import { Order } from "../order/Order";

export interface Address { 
    street: string;
    doorNo: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
}

export interface Customer {
    id: number;
    email: string;
    password: string;
    role: string;
    name: string;
    contactNo: string;
    dateOfBirth: Date;
    imageUrl: string;
    address: Address;
    orders: Set<Order>;
    status: string;
}
