import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DealsCarouselProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function DealsCarousel({ products, onAddToCart }: DealsCarouselProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
      {products.map(product => (
        <div
          key={product.id}
          className="flex-shrink-0 w-64 bg-[#88BDF2] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow snap-start"
        >
          <div className="aspect-square bg-white">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <div className="text-xs text-[#384959] mb-1">{product.category}</div>
            <h3 className="text-[#384959] mb-2 truncate">{product.name}</h3>
            <div className="text-xs text-[#384959] mb-3">{product.quantity}</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[#384959]">${product.price.toFixed(2)}</div>
                {product.originalPrice && (
                  <div className="text-xs text-[#6A89A7] line-through">
                    ${product.originalPrice.toFixed(2)}
                  </div>
                )}
              </div>
              <button
                onClick={() => onAddToCart(product)}
                className="flex items-center gap-2 bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-colors active:scale-95"
              >
                <ShoppingCart className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
