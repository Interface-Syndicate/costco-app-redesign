import { Product } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Random shopping items including food - exported for "See All" view
export const recommendedProducts: Product[] = [
  { id: 'tl1', name: 'Fresh Strawberries', price: 6.99, quantity: '2 lbs', category: 'Produce', image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=80' },
  { id: 'tl2', name: 'Organic Bananas', price: 2.99, quantity: '3 lbs', category: 'Produce', image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800&q=80' },
  { id: 'tl3', name: 'Fresh Baked Croissants', price: 8.99, quantity: '12 pack', category: 'Bakery', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80' },
  { id: 'tl4', name: 'Premium Ground Beef', price: 19.99, quantity: '5 lbs', category: 'Meat', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80' },
  { id: 'tl5', name: 'Greek Yogurt', price: 9.99, quantity: '24 oz', category: 'Dairy', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80' },
  { id: 'tl6', name: 'Organic Avocados', price: 7.99, quantity: '6 pack', category: 'Produce', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80' },
  { id: 'tl7', name: 'Mixed Berry Smoothie Mix', price: 12.99, quantity: '5 lbs', category: 'Frozen', image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=800&q=80' },
  { id: 'tl8', name: 'Artisan Bread Loaf', price: 4.99, quantity: '2 pack', category: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80' },
  { id: 'tl9', name: 'Fresh Atlantic Lobster', price: 39.99, quantity: '2 lbs', category: 'Seafood', image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&q=80' },
  { id: 'tl10', name: 'Organic Blueberries', price: 8.99, quantity: '18 oz', category: 'Produce', image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=800&q=80' },
  { id: 'tl11', name: 'Gourmet Cheese Platter', price: 24.99, quantity: '2.5 lbs', category: 'Deli', image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=800&q=80' },
  { id: 'tl12', name: 'Fresh Sushi Platter', price: 19.99, quantity: '24 pieces', category: 'Deli', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80' },
  { id: 'tl13', name: 'Premium Ice Cream', price: 11.99, quantity: '1.5 gallons', category: 'Frozen', image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&q=80' },
  { id: 'tl14', name: 'Fresh Pizza Dough', price: 5.99, quantity: '4 pack', category: 'Bakery', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80' },
  { id: 'tl15', name: 'Organic Grapes', price: 6.99, quantity: '3 lbs', category: 'Produce', image: 'https://images.unsplash.com/photo-1599819177315-6e8f7e9dbbf7?w=800&q=80' },
  { id: 'tl16', name: 'Deli Meat Variety Pack', price: 16.99, quantity: '3 lbs', category: 'Deli', image: 'https://images.unsplash.com/photo-1608623814075-e51df1bdc82f?w=800&q=80' },
];

interface TwoLayerCarouselProps {
  onAddToCart: (product: Product) => void;
  onProductClick?: (product: Product) => void;
  isGuest?: boolean;
  onShowAll?: () => void;
}

export function TwoLayerCarousel({ onAddToCart, onProductClick, isGuest = false, onShowAll }: TwoLayerCarouselProps) {
  // Split products into two layers
  const layerOneProducts = recommendedProducts.slice(0, 8);
  const layerTwoProducts = recommendedProducts.slice(8, 16);

  return (
    <div className="mb-6">
      <div className="px-4 flex items-center justify-between mb-3">
        <h2 className="text-[#384959]">You May Also Like</h2>
        <button className="text-[#6A89A7] text-sm hover:text-[#88BDF2] transition-colors" onClick={onShowAll}>
          See All &gt;
        </button>
      </div>

      {/* First Layer */}
      <div className="overflow-x-auto scrollbar-hide mb-3">
        <div className="flex gap-3 px-4 pb-2">
          {layerOneProducts.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[140px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all cursor-pointer"
              onClick={() => onProductClick?.(product)}
            >
              <div className="aspect-square bg-gray-50 overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <div className="text-xs text-[#6A89A7] mb-1">{product.category}</div>
                <h3 className="text-xs text-[#384959] mb-2 line-clamp-2 h-8">
                  {product.name}
                </h3>
                <div className="text-sm text-[#6A89A7] mb-2">
                  ${product.price.toFixed(2)}
                </div>
                <div className="text-xs text-[#6A89A7] mb-2">
                  {product.quantity}
                </div>
                {!isGuest && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="w-full bg-[#E8DCC2] text-[#384959] text-xs py-1.5 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Second Layer */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-4 pb-2">
          {layerTwoProducts.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[140px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all cursor-pointer"
              onClick={() => onProductClick?.(product)}
            >
              <div className="aspect-square bg-gray-50 overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <div className="text-xs text-[#6A89A7] mb-1">{product.category}</div>
                <h3 className="text-xs text-[#384959] mb-2 line-clamp-2 h-8">
                  {product.name}
                </h3>
                <div className="text-sm text-[#6A89A7] mb-2">
                  ${product.price.toFixed(2)}
                </div>
                <div className="text-xs text-[#6A89A7] mb-2">
                  {product.quantity}
                </div>
                {!isGuest && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="w-full bg-[#E8DCC2] text-[#384959] text-xs py-1.5 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}