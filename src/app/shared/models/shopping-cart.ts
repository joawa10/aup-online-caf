import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [productId:string]: ShoppingCartItem }) {        
        this.itemsMap = itemsMap || {};

        // iterate itemsMap to initialize 
        for (let productId in itemsMap) {
            let item = itemsMap[productId];                
            this.items.push(new ShoppingCartItem({ ...item, key: productId })); //new ShoppingCartItem has all the properties of item and also productId
        }
    }

    getQuantity(product: Product) {
        let item = this.itemsMap[product.key];
        return item ? item.quantity : 0;
    }

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items)
            sum += this.items[productId].totalPrice;
        return sum;
    }

    get totalItemsCount() {        
        let count = 0;
        for (let productId in this.itemsMap) 
            count += this.itemsMap[productId].quantity;
        return count;
    }
}