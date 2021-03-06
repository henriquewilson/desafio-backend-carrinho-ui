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

  total: number = 0;
  average: number = 0;

  constructor(private drawerService: DrawerService, private cartService: CartService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {

    this.drawerService.startedOpenObservable.subscribe(open => {
      if (open) {
        this.loadCartItems();
      }
    });
  }

  removeItem(item: Item) {
    this.cartService.removeItem(this.cart!, item).subscribe(value => {
      this.cart = value;
      this.loadTotal();
    });
  }

  openFormItem(item: Item) {
    const modalRef = this.modalService.open(FormAddItemComponent);
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.product = item?.product;
    modalRef.result.then(value => {
      this.cartService.addNewItem(this.cart!, value as Item).subscribe(value1 => {
        this.cart = value1;
        this.loadTotal();
      });
    }).catch(reason => {
    });

  }

  private loadCartItems() {
    if (this.cart?.clientId) {
      this.cartService.allItemsByCart(this.cart).subscribe(value => {
        this.cart!.items = value;
        this.loadTotal();
      });
    }
  }

  private loadTotal() {
    if (this.cart?.clientId) {
      this.cartService.totalByCart(this.cart).subscribe(value => {
        this.total = value;
      });

      this.cartService.allCartsAverage().subscribe(value => {
        this.average = value;
      });
    }
  }

}
