import { Product } from 'src/app/models/product';

export class ShoppingCartItem {
    key: string; //key
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;

    get totalPrice() { return this?.price * this.quantity; } //added elvis operator
}