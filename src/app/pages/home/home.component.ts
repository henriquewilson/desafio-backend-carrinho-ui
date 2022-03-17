import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/leads/product.service";
import {Observable, of} from "rxjs"
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormProductComponent} from "./form-product/form-product.component";
import {Product} from "../../core/model/product";

const getPizzas$: Observable<any[]> = of([
  {id: "j8P9sz", name: "Pepperoni", price: 899},
  {id: "tMot06", name: "Supreme", price: 999},
  {id: "x9sD3g", name: "Sizzler", price: 899},
]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Observable<any> | undefined;


  constructor(private productService: ProductService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.products = this.productService.allProducts();
  }

  open() {
    const modalRef = this.modalService.open(FormProductComponent);
    modalRef.componentInstance.name = 'World';

    modalRef.result.then(value => {
      console.log(value);
      this.productService.addNewProduct(value as Product).subscribe(value1 => {
        console.log(value1);
        this.products = this.productService.allProducts();
      });
    }).catch(reason => {
      console.log(reason);
    });
  }

}
