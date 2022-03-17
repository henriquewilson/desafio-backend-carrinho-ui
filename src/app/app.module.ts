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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LeftPadFilter,
    FormProductComponent
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
  ],
  providers: [
    ProductService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
