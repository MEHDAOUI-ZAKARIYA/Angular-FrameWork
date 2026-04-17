import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stocksStatus',
})
export class StocksStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
