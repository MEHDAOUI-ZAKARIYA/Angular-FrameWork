// discount.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name      : 'discount',
  standalone: true
})
export class DiscountPipe implements PipeTransform {

  transform(price: number, originalPrice?: number): string {
    if (!originalPrice || originalPrice <= price) return '';

    const ratio   = (originalPrice - price) / originalPrice;
    const percent = Math.round(ratio * 100);
    return `-${percent}%`;
  }
}
