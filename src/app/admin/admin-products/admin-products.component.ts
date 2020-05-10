import { ProductService } from 'src/app/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: {title: string}[]; //fix
  filteredProducts: any[]; //fix
  subscription: Subscription; //fix
  
  constructor(private productService: ProductService) { //fix
    this.subscription = this.productService.getAll()
    .subscribe(products => this.filteredProducts = this.products = products); 
  }

  filter(query: string) { //fix
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.includes(query)) :
      this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

}
