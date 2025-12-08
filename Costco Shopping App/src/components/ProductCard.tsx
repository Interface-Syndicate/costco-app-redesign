import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
  onProductClick?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, isFavorite = false, onToggleFavorite, onProductClick }: ProductCardProps) {
  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer"
      onClick={() => onProductClick?.(product)}
    >
      <div className="aspect-square bg-gray-100 relative">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(product.id);
            }}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-all active:scale-95"
          >
            <Heart
              className={`w-5 h-5 transition-all ${
                isFavorite ? 'fill-[#E57373] text-[#E57373]' : 'text-[#6A89A7]'
              }`}
            />
          </button>
        )}
        {product.isOnSale && (
          <div className="absolute top-2 left-2 bg-[#E57373] text-white px-2 py-1 rounded text-xs">
            Sale
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="text-xs text-[#6A89A7] mb-1">{product.category}</div>
        <h3 className="text-[#384959] mb-2 line-clamp-2">{product.name}</h3>
        <div className="text-xs text-[#6A89A7] mb-3">{product.quantity}</div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[#6A89A7]">${product.price.toFixed(2)}</div>
            {product.originalPrice && (
              <div className="text-xs text-[#9ca3af] line-through">
                ${product.originalPrice.toFixed(2)}
              </div>
            )}
            {product.saleEndDate && (
              <div className="text-xs text-[#6A89A7] mt-1">
                Until {product.saleEndDate}
              </div>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="flex items-center gap-2 bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-colors active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}