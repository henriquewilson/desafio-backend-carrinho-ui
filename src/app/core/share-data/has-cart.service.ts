import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class HasCartService {

  private hasCart = new BehaviorSubject<boolean>(false);
  private deleteCart = new BehaviorSubject<boolean>(false);

  public hasCartObservable = this.hasCart.asObservable();
  public deleteCartObservable = this.deleteCart.asObservable();

  public hasCartChange(has: boolean): void {
    this.hasCart.next(has);
  }

  public deleteCartChange(d: boolean): void {
    this.deleteCart.next(d);
  }

}
