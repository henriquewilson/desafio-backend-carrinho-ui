import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routes";
import {ProductService} from "./services/leads/product.service";
import {HttpClientModule} from "@angular/common/http";
import {LeftPadFilter} from "./core/pipe/pipe";
import { FormProductComponent } from './pages/home/form-product/form-product.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSidenavModule} from "@angular/material/sidenav";
import { FormAddItemComponent } from './pages/home/form-add-item/form-add-item.component';
import { FormCreateCartComponent } from './pages/home/form-create-cart/form-create-cart.component';
import {CartService} from "./services/leads/cart.service";
import {ItemService} from "./services/leads/item.service";
import { TheCartComponent } from './pages/home/the-cart/the-cart.component';
import {DrawerService} from "./core/share-data/drawer.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LeftPadFilter,
    FormProductComponent,
    FormAddItemComponent,
    FormCreateCartComponent,
    TheCartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModalModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(rootRouterConfig, {useHash: false}),
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatSidenavModule,
  ],
  providers: [
    ProductService,
    CartService,
    ItemService,
    DrawerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
