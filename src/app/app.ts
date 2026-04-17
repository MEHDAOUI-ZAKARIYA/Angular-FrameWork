import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './components/product-list/product-list';
import { Product, ProductCategory, CartItem } from './models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {

  // --- Filtres ---
  searchText       = '';
  selectedCategory = '';
  maxPrice         = 2500;

  // --- État ---
  selectedProduct: Product | null = null;
  cart: CartItem[] = [];

  // --- Données ---
  allProducts: Product[] = [
    {
      id: 1,
      name: 'MacBook Pro 14"',
      brand: 'Apple',
      category: ProductCategory.ELECTRONIQUE,
      price: 1999,
      originalPrice: 2299,
      stock: 5,
      rating: 4.8,
      reviewCount: 342,
      imageUrl: 'https://picsum.photos/seed/mac/400/300',
      description: 'Puce M3 Pro, 18 Go RAM, 512 Go SSD.',
      tags: ['laptop', 'apple', 'pro']
    },
    {
      id: 2,
      name: 'iPhone 15',
      brand: 'Apple',
      category: ProductCategory.ELECTRONIQUE,
      price: 999,
      stock: 0,
      rating: 4.6,
      reviewCount: 891,
      imageUrl: 'https://picsum.photos/seed/phone/400/300',
      description: 'Puce A16, USB-C, Dynamic Island.',
      tags: ['smartphone', 'apple']
    },
    {
      id: 3,
      name: 'Galaxy S24 Ultra',
      brand: 'Samsung',
      category: ProductCategory.ELECTRONIQUE,
      price: 849,
      originalPrice: 999,
      stock: 3,
      rating: 4.5,
      reviewCount: 561,
      imageUrl: '',
      description: 'Écran AMOLED 6.8", stylet S Pen inclus.',
      tags: ['smartphone', 'samsung', 'android']
    },
    {
      id: 4,
      name: 'Veste Running',
      brand: 'Nike',
      category: ProductCategory.SPORT,
      price: 89,
      stock: 14,
      rating: 4.2,
      reviewCount: 128,
      imageUrl: 'https://picsum.photos/seed/nike/400/300',
      description: 'Coupe-vent léger, idéal pour la course.',
      tags: ['running', 'veste', 'nike']
    },
    {
      id: 5,
      name: 'Canapé 3 places',
      brand: 'IKEA',
      category: ProductCategory.MAISON,
      price: 599,
      stock: 2,
      rating: 3.9,
      reviewCount: 74,
      imageUrl: '',
      description: 'Tissu gris chiné, pieds en bois massif.',
      tags: ['canapé', 'salon', 'ikea']
    },
    {
      id: 6,
      name: 'T-shirt Oversize',
      brand: 'Zara',
      category: ProductCategory.VETEMENT,
      price: 25,
      originalPrice: 39,
      stock: 30,
      rating: 4.0,
      reviewCount: 210,
      imageUrl: 'https://picsum.photos/seed/zara/400/300',
      description: 'Coton bio, coupe ample, plusieurs coloris.',
      tags: ['t-shirt', 'mode', 'zara']
    },
  ];

  get categories(): ProductCategory[] {
    return Object.values(ProductCategory);
  }

  get filteredProducts(): Product[] {
    const search = this.searchText.toLowerCase().trim();
    return this.allProducts.filter(product => {
      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search)  ||
        product.brand.toLowerCase().includes(search);
      const matchesCategory =
        !this.selectedCategory ||
        product.category === this.selectedCategory;
      const matchesPrice = product.price <= this.maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }

  // ✅ Point 1 : reçoit l'événement productSelected
  onProductSelected(product: Product): void {
    // Désélectionne si on reclique sur la même fiche
    this.selectedProduct =
      this.selectedProduct?.id === product.id ? null : product;
  }

  // ✅ Point 2 : reçoit l'événement addedToCart
  onAddToCart(product: Product): void {
    const existing = this.cart.find(item => item.product.id === product.id);

    if (existing) {
      // Produit déjà dans le panier → on incrémente la quantité
      existing.quantity++;
    } else {
      // Nouveau produit → on push un CartItem
      this.cart.push({ product, quantity: 1 });
    }
  }

  // --- Helpers panier ---
  get cartTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  get cartCount(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter(item => item.product.id !== productId);
  }
}
