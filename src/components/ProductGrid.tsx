import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  favorites?: string[];
  onToggleFavorite?: (productId: string) => void;
  onProductClick?: (product: Product) => void;
}

export function ProductGrid({ products, onAddToCart, favorites = [], onToggleFavorite, onProductClick }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-[#6A89A7]">
        No products found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          isFavorite={favorites.includes(product.id)}
          onToggleFavorite={onToggleFavorite}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  );
}