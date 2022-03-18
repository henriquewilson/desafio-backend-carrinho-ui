import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leftPadFilter',
  pure: false
})
export class LeftPadFilter implements PipeTransform {
  transform(item?: number): string {
    return (String('0').repeat(3) + item).substr((3 * -1), 3);
  }
}
