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
import {Item} from "../../core/model/item";
import {DrawerService} from "../../core/share-data/drawer.service";
import {HasCartService} from "../../core/share-data/has-cart.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  products: Observable<any> | undefined;


  cart: ShoppingCart | undefined;

  @ViewChild('drawer') drawer: MatDrawer | undefined;

  constructor(private cartService: CartService, private productService: ProductService, private modalService: NgbModal,
              private drawerService: DrawerService, private hasCartService: HasCartService) {
  }

  ngOnInit(): void {
    this.products = this.productService.allProducts();

    this.hasCartService.deleteCartObservable.subscribe(value => {
      if (value) {
        this.cartService.logout(this.cart!).subscribe(value => {
          if (value) {
            this.cart = undefined;
          } else {

          }
        })

      }
    });
  }

  startedToOpen(e: any) {
    this.drawerService.startedToOpen(true);
  }

  showCart() {
    if (this.cart) {
      this.drawer?.open();
    } else {

      this.setupCart().subscribe(value => {
        if (value) {
          this.cart = value;
          this.hasCartService.hasCartChange(true);
          this.drawer?.open();
        }
      });
    }
  }

  openFormProduct() {
    const modalRef = this.modalService.open(FormProductComponent);
    modalRef.result.then(value => {
      this.productService.addNewProduct(value as Product).subscribe(value1 => {
        this.products = this.productService.allProducts();
      });
    }).catch(reason => {
    });
  }

  openFormItem(product: Product) {
    this.setupCart().subscribe(cart => {
      if (cart) {
        this.cart = cart;
        this.hasCartService.hasCartChange(true);
        const modalRef = this.modalService.open(FormAddItemComponent);
        modalRef.componentInstance.product = product;
        modalRef.result.then(value => {
          this.cartService.addNewItem(this.cart!, value as Item).subscribe(value1 => {

            this.cart = value1;
            this.products = this.productService.allProducts();
          });
        }).catch(reason => {
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
        this.cartService.getShoppingCart(value).subscribe(value1 => {
          subscriber.next(value1);
        });
      }).catch(reason => {
        subscriber.next();
      });
    });

  }

}
