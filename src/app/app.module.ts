import { HomeComponent } from './core/components/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';

import { environment } from './../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AdminAuthGuardService as AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';


@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,    
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },      
      { path: 'login', component: LoginComponent },  
    ]),    
  ],
  providers: [
    AdminAuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
