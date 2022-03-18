import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {Product} from "../../core/model/product";
import {ShoppingCart} from "../../core/model/shopping-cart";
import {Item} from "../../core/model/item";


@Injectable()
export class CartService {

  constructor(private http: HttpClient) {
  }



  allShoppingCart(): Observable<ShoppingCart[]> {
    return this.http
      .get<any>(`${environment.apiUrl}/all-carts`);
  }


  getShoppingCart(email: string): Observable<any> {
    return this.http
      .get<Product>(`${environment.apiUrl}/cart/${email}`);
  }

  addNewItem(cart: ShoppingCart, i: Item): Observable<any> {
    console.log(cart)
    return this.http
      .post<Product>(`${environment.apiUrl}/cart/${cart.clientId}/add-item`, i);
  }


}
