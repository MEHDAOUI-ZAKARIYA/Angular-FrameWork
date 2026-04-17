// product-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe, UpperCasePipe, PercentPipe } from '@angular/common';

import { Product }        from '../../models/product.model';
// import { StocksStatusPipe } from '../../pipes/stocks-status-pipe';
import { DiscountPipe }    from '../../pipes/discount-pipe';

@Component({
  selector   : 'app-product-card',
  standalone : true,
  imports    : [
    CommonModule,
    CurrencyPipe,
    UpperCasePipe,
    PercentPipe,
    // StocksStatusPipe,
    DiscountPipe
  ],
  templateUrl: './product-card.html',
  styleUrls  : ['./product-card.scss']
})
export class ProductCard {
  @Input({ required: true }) product!: Product;

  /** Retourne le ratio de remise (0–1) pour le pipe percent du template. */
  get discountRatio(): number {
    const { price, originalPrice } = this.product;
    if (!originalPrice || originalPrice <= price) return 0;
    return (originalPrice - price) / originalPrice;
  }
}
