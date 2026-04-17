export enum ProductCategory {
  ELECTRONIQUE = 'Électronique',
  VETEMENT     = 'Vêtements',
  MAISON       = 'Maison',
  SPORT        = 'Sport'
}

export enum StockStatus {
  EN_STOCK      = 'en stock',
  STOCK_LIMITE  = 'stock limité',
  RUPTURE       = 'rupture'
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  stock: number;
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  description: string;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// ✅ Helper : dérive le StockStatus depuis stock
export function getStockStatus(stock: number): StockStatus {
  if (stock === 0)   return StockStatus.RUPTURE;
  if (stock <= 5)    return StockStatus.STOCK_LIMITE;
  return StockStatus.EN_STOCK;
}
