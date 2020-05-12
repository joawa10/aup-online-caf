import { Observable } from 'rxjs/Observable';
import { Product } from 'src/app/models/product';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ShoppingCart } from './models/shopping-cart';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges() //add snapshotChanges
      .pipe(map(x => new ShoppingCart(x.payload.exportVal()?.items))); //add elvis operator
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId); //can add <any>
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;   
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  // private async updateItemQuantity(product: Product, change: number) {
  //   let cartId = await this.getOrCreateCartId();
  //   let item$ = this.getItem(cartId, product.key);
  //   item$
  //     .snapshotChanges()
  //     .pipe(take(1))
  //     .subscribe(item => {
  //       let quantity = (item?.payload.child("/quantity").val() || 0) + change;
  //       if(quantity == 0) item$.remove();
  //       else item$.update({
  //         title: product.title,
  //         imageUrl:product.imageUrl,
  //         price: product.price,
  //         quantity: quantity
  //       });
  //     });
  // }
  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$: Observable<any> = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key).valueChanges();
    let item$$ = this.getItem(cartId, product.key);
    
    item$.take(1).subscribe(item => {
      item$$.update({ 
        // product: product, 
        title: product.title,
        imageUrl:product.imageUrl,
        price: product.price,
        quantity: (item?.quantity || 0) + change //add elvis operator
      }); 
  });
  }
}
