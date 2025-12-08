import { ChevronDown, MapPin, Fuel, ShoppingBag, BadgeCheck, Eye, PillBottle, UtensilsCrossed, Truck } from 'lucide-react';
import { Product } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import costcoLogo from 'figma:asset/3a30167e6b33385dd284fe7eb6a69e5e7cc329af.png';

interface HomePageProps {
  products: Product[];
  dealProducts: Product[];
  onAddToCart: (product: Product) => void;
  recentlyViewed: Product[];
  onServiceClick: (serviceType: 'membership' | 'optical' | 'pharmacy' | 'foodcourt' | 'travel' | 'gas' | 'grocery' | 'delivery') => void;
  onShowAllDeals?: () => void;
  onProductClick?: (product: Product) => void;
  isGuest?: boolean;
}

export function HomePage({ dealProducts, onAddToCart, recentlyViewed, onServiceClick, onShowAllDeals, onProductClick, isGuest = false }: HomePageProps) {
  const services = [
    { id: 'membership', name: 'Membership', icon: BadgeCheck },
    { id: 'optical', name: 'Optical', icon: Eye },
    { id: 'pharmacy', name: 'Pharmacy', icon: PillBottle },
    { id: 'foodcourt', name: 'Food Court', icon: UtensilsCrossed },
    { id: 'travel', name: 'Travel', icon: MapPin },
    { id: 'gas', name: 'Gas', icon: Fuel },
    { id: 'grocery', name: 'Grocery', icon: ShoppingBag },
    { id: 'delivery', name: 'Delivery', icon: Truck },
  ];

  return (
    <div className="pb-4">
      {/* Location Bar */}
      <div className="bg-[#BDDDFC] px-4 py-3 mb-4">
        <div className="flex items-center justify-center gap-2">
          <MapPin className="w-4 h-4 text-[#384959]" />
          <span className="text-[#384959] text-sm">Charlotte Costco near you • Delivering to 00000-000</span>
          <ChevronDown className="w-4 h-4 text-[#384959]" />
        </div>
      </div>

      {/* Costco Logo */}
      <div className="flex justify-center mb-6">
        <div className="text-center">
          <ImageWithFallback 
            src={costcoLogo} 
            alt="Costco Logo" 
            className="w-[180px] h-[180px] object-contain"
          />
        </div>
      </div>

      {/* Ongoing Deals Section */}
      {dealProducts && dealProducts.length > 0 && (
        <div className="mb-6">
          <div className="px-4 flex items-center justify-between mb-3">
            <h2 className="text-[#384959]">Ongoing Deals</h2>
            <button className="text-[#6A89A7] text-sm hover:text-[#88BDF2] transition-colors" onClick={onShowAllDeals}>
              See All &gt;
            </button>
          </div>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 px-4 pb-2">
              {dealProducts.map((product) => (
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
                    <h3 className="text-xs text-[#384959] mb-2 line-clamp-2 h-8">
                      {product.name}
                    </h3>
                    <div className="flex flex-col gap-1">
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-sm text-[#E57373]">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.saleEndDate && (
                        <span className="text-xs text-[#6A89A7]">
                          Until {product.saleEndDate}
                        </span>
                      )}
                    </div>
                    {!isGuest && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product);
                        }}
                        className="w-full mt-2 bg-[#E8DCC2] text-[#384959] text-xs py-1.5 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95"
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
      )}

      {/* Services Hub Section */}
      <div className="mb-6">
        <div className="px-4 mb-3">
          <h2 className="text-[#384959]">Services Hub</h2>
        </div>
        <div className="px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <button
                  key={service.id}
                  className="flex flex-col items-center gap-2 p-2 hover:bg-gray-50 rounded-xl transition-all active:scale-95 flex-shrink-0"
                  onClick={() => onServiceClick(service.id as 'membership' | 'optical' | 'pharmacy' | 'foodcourt' | 'travel' | 'gas' | 'grocery' | 'delivery')}
                >
                  <div className="w-14 h-14 rounded-full border-2 border-[#384959] flex items-center justify-center hover:border-[#6A89A7] hover:bg-[#BDDDFC]/20 transition-all">
                    <IconComponent className="w-6 h-6 text-[#384959]" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs text-[#384959] text-center whitespace-nowrap">{service.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recently Viewed Items Section */}
      {recentlyViewed && recentlyViewed.length > 0 && (
        <div className="mb-6">
          <div className="px-4 flex items-center justify-between mb-3">
            <h2 className="text-[#384959]">Recently Viewed Items</h2>
            <button className="text-[#6A89A7] text-sm hover:text-[#88BDF2] transition-colors">
              See All &gt;
            </button>
          </div>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 px-4 pb-2">
              {recentlyViewed.map((product) => (
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
                    <h3 className="text-xs text-[#384959] mb-2 line-clamp-2 h-8">
                      {product.name}
                    </h3>
                    <div className="text-sm text-[#6A89A7] mb-2">
                      ${product.price.toFixed(2)}
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
      )}
    </div>
  );
}