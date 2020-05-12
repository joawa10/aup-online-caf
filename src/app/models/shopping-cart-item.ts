import { Product } from 'src/app/models/product';

export class ShoppingCartItem {
    key: string; //key
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;

    constructor(init?: Partial<ShoppingCartItem>) { //init can be an object that looks like a ShoppingCartItem object
        Object.assign(this, init); //copy properties of 'init' to 'this'
    } 

    get totalPrice() { return this?.price * this.quantity; } //added elvis operator
}