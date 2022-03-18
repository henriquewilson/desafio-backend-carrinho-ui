import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class DrawerService {

  private startedOpen = new BehaviorSubject<boolean>(false);

  public startedOpenObservable = this.startedOpen.asObservable();

  public startedToOpen(open: boolean): void {
    this.startedOpen.next(open);
  }

}
