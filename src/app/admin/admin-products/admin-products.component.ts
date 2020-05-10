import { ProductService } from 'src/app/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[]; //fix
  filteredProducts: any[]; //fix
  subscription: Subscription; //fix

  constructor(private productService: ProductService) { //fix
    this.subscription = this.productService.getAll() //has snapshotChanges in fix product key commit
    .subscribe(products => this.filteredProducts = this.products = products); 
  }

  filter(query: string) { //fix
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

}
