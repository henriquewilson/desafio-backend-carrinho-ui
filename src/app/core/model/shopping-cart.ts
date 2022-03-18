import {Product} from "./product";
import {Item} from "./item";

export interface ShoppingCart {
  id: number;
  items: Item[];
  clientId: string;
  quantity: number;
}
