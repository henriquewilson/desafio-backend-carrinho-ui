import {Component, OnInit} from '@angular/core';
import {HasCartService} from "./core/share-data/has-cart.service";
import {ShoppingCart} from "./core/model/shopping-cart";
import {CartService} from "./services/leads/cart.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'desafio-backend-carrinho';

  hasCart = false;

  constructor(private hasCartService: HasCartService) {
  }

  ngOnInit(): void {
    this.hasCartService.hasCartObservable.subscribe(value => {
      this.hasCart = value;
    });
  }

  logout(): void {
    this.hasCart = false;
    this.hasCartService.deleteCartChange(true);
  }


}
