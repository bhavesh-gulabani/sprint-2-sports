export interface Product {
    id:number ; 
	name:string;
	category:string;
	description:string;
	brand:string; 
	color:string;
	size:string;
	mrp:number;
	discount:   number;
	priceAfterDiscount:number;
	stock:number;
    estimatedDelivery:Date;
    imageUrl: string;
}