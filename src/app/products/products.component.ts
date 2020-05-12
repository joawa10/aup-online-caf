import { ShoppingCart } from '../shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ProductService } from '../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../shared/models/product';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products: Product[] = [];
  filteredProducts: Product[];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) { }

  async ngOnInit() {
    this.cart$ = (await this.shoppingCartService.getCart()); //initialize cart
    this.populateProducts();
  }

  private populateProducts() {
    this.productService
      .getAll() //get products
      .switchMap(products => {
        this.products = products; //store
        return this.route.queryParamMap; //go to routeParam
      })
      .subscribe(params => {
        this.category = params.get('category'); //get category
        this.applyFilter();
      });
  }

  private applyFilter() {    
    this.filteredProducts = (this.category) ?
    this.products.filter(p => p.category === this.category) :
    this.products;
  }
}
