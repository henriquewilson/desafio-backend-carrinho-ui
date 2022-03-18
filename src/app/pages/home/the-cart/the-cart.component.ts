import {Component, Input, OnInit} from '@angular/core';
import {ShoppingCart} from "../../../core/model/shopping-cart";
import {DrawerService} from "../../../core/share-data/drawer.service";
import {CartService} from "../../../services/leads/cart.service";
import {ItemService} from "../../../services/leads/item.service";

@Component({
  selector: 'app-the-cart',
  templateUrl: './the-cart.component.html',
  styleUrls: ['./the-cart.component.scss']
})
export class TheCartComponent implements OnInit {

  @Input() cart: ShoppingCart | undefined;

  constructor(private drawerService: DrawerService, private cartService: CartService, private itemService: ItemService) {
  }

  ngOnInit(): void {

    this.drawerService.startedOpenObservable.subscribe(open => {
      console.log(open)
      if (open && this.cart?.clientId) {
        this.itemService.allItemsByCart(this.cart).subscribe(value => {
          console.log(value);
        });
      }
    });
  }

}
