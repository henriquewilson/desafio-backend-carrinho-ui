import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {Product} from "../../core/model/product";


@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {
  }


  allProducts(): Observable<Product> {
    return this.http
      .get<any>(`${environment.apiUrl}/product/all-products`);
  }


  addNewProduct(p: Product): Observable<any> {
    return this.http
      .post<Product>(`${environment.apiUrl}/product/add-product`, p);
  }


}
