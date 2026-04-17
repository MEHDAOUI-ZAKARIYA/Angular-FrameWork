import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product, StockStatus, getStockStatus } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductListComponent {

  @Input()  products  : Product[]     = [];
  @Input()  selectedId: number | null = null;

  // ✅ Point 1 & 2 : les deux @Output()
  @Output() productSelected = new EventEmitter<Product>();
  @Output() addedToCart     = new EventEmitter<Product>();

  readonly StockStatus = StockStatus;

  getStockStatus(stock: number): StockStatus {
    return getStockStatus(stock);
  }

  // ✅ Point 3 : émis au clic sur la fiche entière
  onCardClick(product: Product): void {
    this.productSelected.emit(product);
  }

  // ✅ Point 4 : émis sur le bouton, stopPropagation évite de déclencher onCardClick
  onAddToCart(event: MouseEvent, product: Product): void {
    event.stopPropagation();
    this.addedToCart.emit(product);
  }

  getPlaceholderColor(id: number): string {
    const colors = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#3b82f6'];
    return colors[id % colors.length];
  }

  getStars(rating: number): string {
    return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  }
}
