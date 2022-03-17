import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {Product} from "../../core/model/product";


@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {
  }


  anyToForm(form: any): FormData {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value as any));
    return formData;
  }

  allProducts(): Observable<Product> {
    return this.http
      .get<any>(`${environment.apiUrl}/all-products`);
  }


  addNewProduct(p: Product): Observable<any> {
    return this.http
      .post<Product>(`${environment.apiUrl}/add-product`, p);
  }


}
