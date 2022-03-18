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

  getShoppingCart(email: string): Observable<any> {
    return this.http
      .get<Product>(`${environment.apiUrl}/cart/${email}`);
  }

  addNewItem(cart: ShoppingCart, i: Item): Observable<ShoppingCart> {
    return this.http
      .post<ShoppingCart>(`${environment.apiUrl}/cart/${cart.clientId}/add-item`, i);
  }

  removeItem(cart: ShoppingCart, i: Item): Observable<ShoppingCart> {
    return this.http
      .post<ShoppingCart>(`${environment.apiUrl}/cart/${cart.clientId}/remove-item`, i);
  }

  allItemsByCart(cart: ShoppingCart): Observable<Item[]> {
    return this.http
      .get<any>(`${environment.apiUrl}/cart/${cart.clientId}/items`);
  }

  totalByCart(cart: ShoppingCart): Observable<number> {
    return this.http
      .get<number>(`${environment.apiUrl}/cart/${cart.clientId}/total`);
  }

  allCartsAverage(): Observable<number> {
    return this.http
      .get<number>(`${environment.apiUrl}/cart/average`);
  }

  logout(cart: ShoppingCart): Observable<boolean> {
    return this.http
      .get<boolean>(`${environment.apiUrl}/cart/${cart.clientId}/logout`);
  }


}
