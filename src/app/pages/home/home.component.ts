import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../services/leads/product.service";
import {Observable, of} from "rxjs"
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormProductComponent} from "./form-product/form-product.component";
import {Product} from "../../core/model/product";
import {MatDrawer} from "@angular/material/sidenav";
import {FormAddItemComponent} from "./form-add-item/form-add-item.component";
import {ShoppingCart} from "../../core/model/shopping-cart";
import {FormCreateCartComponent} from "./form-create-cart/form-create-cart.component";
import {CartService} from "../../services/leads/cart.service";
import {ItemService} from "../../services/leads/item.service";
import {Item} from "../../core/model/item";
import {DrawerService} from "../../core/share-data/drawer.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  products: Observable<any> | undefined;


  cart: ShoppingCart | undefined;

  @ViewChild('drawer') drawer: MatDrawer | undefined;

  constructor(private cartService: CartService, private productService: ProductService, private itemService: ItemService,
              private modalService: NgbModal, private drawerService: DrawerService) {
  }

  ngOnInit(): void {
    this.products = this.productService.allProducts();
  }

  startedToOpen(e: any) {
    console.log('startedToOpen');
    console.log(e);
    this.drawerService.startedToOpen(true);
  }

  showCart() {
    if (this.cart) {
      this.drawer?.open();
    } else {

      this.setupCart().subscribe(value => {
        if (value) {
          this.cart = value;
          this.drawer?.open();
        }
      });
    }
  }

  openFormProduct() {
    const modalRef = this.modalService.open(FormProductComponent);
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

  openFormItem(product: Product) {
    this.setupCart().subscribe(cart => {
      if (cart) {
        this.cart = cart;
        const modalRef = this.modalService.open(FormAddItemComponent);
        modalRef.componentInstance.product = product;
        modalRef.result.then(value => {
          console.log(value);
          this.cartService.addNewItem(this.cart!, value as Item).subscribe(value1 => {
            console.log(value1);
            this.products = this.productService.allProducts();
          });
        }).catch(reason => {
          console.log(reason);
        });
      }
    });

  }

  private setupCart(): Observable<ShoppingCart> {
    return new Observable<ShoppingCart>(subscriber => {
      if (this.cart) {
        subscriber.next(this.cart);
        return;
      }
      const modalRef = this.modalService.open(FormCreateCartComponent);
      modalRef.result.then(value => {
        console.log(value);
        this.cartService.getShoppingCart(value).subscribe(value1 => {
          subscriber.next(value1);
        });
      }).catch(reason => {
        subscriber.next();
        console.log(reason);
      });
    });

  }

}
