import {Component, Input, OnInit} from '@angular/core';
import {ShoppingCart} from "../../../core/model/shopping-cart";
import {DrawerService} from "../../../core/share-data/drawer.service";
import {CartService} from "../../../services/leads/cart.service";
import {FormAddItemComponent} from "../form-add-item/form-add-item.component";
import {Item} from "../../../core/model/item";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-the-cart',
  templateUrl: './the-cart.component.html',
  styleUrls: ['./the-cart.component.scss']
})
export class TheCartComponent implements OnInit {

  @Input() cart: ShoppingCart | undefined;

  constructor(private drawerService: DrawerService, private cartService: CartService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {

    this.drawerService.startedOpenObservable.subscribe(open => {
      console.log(open)
      if (open) {
        this.loadCartItems();
      }
    });
  }

  removeItem(item: Item) {
    this.cartService.removeItem(this.cart!, item).subscribe(value => {
      console.log(value);
      this.cart = value;
    });
  }

  openFormItem(item: Item) {
    const modalRef = this.modalService.open(FormAddItemComponent);
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.product = item?.product;
    modalRef.result.then(value => {
      console.log(value);
      this.cartService.addNewItem(this.cart!, value as Item).subscribe(value1 => {
        console.log(value1);
        this.cart = value1;

      });
    }).catch(reason => {
      console.log(reason);
    });

  }

  private loadCartItems() {
    if (this.cart?.clientId) {
      this.cartService.allItemsByCart(this.cart).subscribe(value => {
        console.log(value);
        this.cart!.items = value;
      });
    }
  }

}
