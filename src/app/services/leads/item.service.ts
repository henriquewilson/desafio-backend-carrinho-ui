import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {Product} from "../../core/model/product";
import {Item} from "../../core/model/item";
import {ShoppingCart} from "../../core/model/shopping-cart";


@Injectable()
export class ItemService {

  constructor(private http: HttpClient) {
  }

  allItems(): Observable<Item[]> {
    return this.http
      .get<any>(`${environment.apiUrl}/all-items`);
  }


  allItemsByCart(cart: ShoppingCart): Observable<Product> {
    return this.http
      .get<any>(`${environment.apiUrl}/cart/${cart.clientId}/items`);
  }





}
