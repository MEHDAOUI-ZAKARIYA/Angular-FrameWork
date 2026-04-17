import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [FormsModule, CommonModule, CurrencyPipe],
  templateUrl: './product-filter.html',
  styleUrls: ['./product-filter.scss']
})
export class ProductFilterComponent {

  // ── 1. Déclarations des champs ──────────────────────────────────────────────
  searchText: string = '';
  selectedCategory: string = 'toutes';
  maxPrice: number = 0;

  // Liste des 5 catégories disponibles
  readonly categories: string[] = [
    'électronique',
    'vêtements',
    'alimentation',
    'sport',
    'maison'
  ];

  // ── 7. Réinitialisation de tous les filtres ─────────────────────────────────
  onReset(): void {
    this.searchText      = '';
    this.selectedCategory = 'toutes';
    this.maxPrice        = 0;
  }

  // ── 8. Condition de désactivation du bouton "Filtrer" ──────────────────────
  get isFilterDisabled(): boolean {
    return (
      this.searchText.trim() === '' &&
      this.selectedCategory   === 'toutes' &&
      this.maxPrice           === 0
    );
  }

  onFilter(): void {
    console.log('Filtres appliqués :', {
      searchText:       this.searchText,
      selectedCategory: this.selectedCategory,
      maxPrice:         this.maxPrice
    });
  }
}
