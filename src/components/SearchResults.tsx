import { BadgeCheck, Eye, PillBottle, UtensilsCrossed, MapPin, Fuel, ShoppingBag, Truck, Package, CreditCard } from 'lucide-react';
import { Product } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SearchResultsProps {
  searchQuery: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onServiceClick: (serviceType: 'membership' | 'optical' | 'pharmacy' | 'foodcourt' | 'travel' | 'gas' | 'grocery' | 'delivery' | 'payments') => void;
  onProductClick: (product: Product) => void;
  isGuest?: boolean;
}

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  icon: any;
  type: 'membership' | 'optical' | 'pharmacy' | 'foodcourt' | 'travel' | 'gas' | 'grocery' | 'delivery' | 'payments';
  keywords: string[];
}

const services: ServiceItem[] = [
  {
    id: 'membership',
    name: 'Membership',
    description: 'Join or renew your Costco membership',
    icon: BadgeCheck,
    type: 'membership',
    keywords: ['membership', 'join', 'renew', 'sign up', 'executive', 'gold star', 'member'],
  },
  {
    id: 'optical',
    name: 'Optical Center',
    description: 'Eye exams, glasses, contacts, and more',
    icon: Eye,
    type: 'optical',
    keywords: ['optical', 'eye', 'exam', 'glasses', 'contacts', 'vision', 'frames', 'lens', 'prescription'],
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    description: 'Prescriptions, immunizations, and health services',
    icon: PillBottle,
    type: 'pharmacy',
    keywords: ['pharmacy', 'prescription', 'medicine', 'refill', 'immunization', 'vaccine', 'flu shot', 'health', 'medication'],
  },
  {
    id: 'foodcourt',
    name: 'Food Court',
    description: 'Hot dogs, pizza, and more at great prices',
    icon: UtensilsCrossed,
    type: 'foodcourt',
    keywords: ['food court', 'hot dog', 'pizza', 'chicken bake', 'churro', 'smoothie', 'food', 'eat', 'lunch', 'dinner'],
  },
  {
    id: 'travel',
    name: 'Travel Services',
    description: 'Book vacations, cruises, and rental cars',
    icon: MapPin,
    type: 'travel',
    keywords: ['travel', 'vacation', 'cruise', 'hotel', 'rental car', 'flight', 'trip', 'booking'],
  },
  {
    id: 'gas',
    name: 'Gas Station',
    description: 'Member-exclusive fuel at competitive prices',
    icon: Fuel,
    type: 'gas',
    keywords: ['gas', 'fuel', 'gasoline', 'diesel', 'petrol', 'station'],
  },
  {
    id: 'grocery',
    name: 'Grocery',
    description: 'Shop fresh produce, meat, and pantry essentials',
    icon: ShoppingBag,
    type: 'grocery',
    keywords: ['grocery', 'produce', 'meat', 'seafood', 'dairy', 'pantry', 'frozen', 'fresh', 'vegetables', 'fruit'],
  },
  {
    id: 'delivery',
    name: 'Delivery Services',
    description: 'Same-day, 2-day, and scheduled delivery options',
    icon: Truck,
    type: 'delivery',
    keywords: ['delivery', 'shipping', 'same day', '2-day', 'ship', 'deliver'],
  },
  {
    id: 'payments',
    name: 'Payment Options',
    description: 'Costco Anywhere Visa, Shop Card, and more',
    icon: CreditCard,
    type: 'payments',
    keywords: ['payment', 'visa', 'credit card', 'shop card', 'gift card', 'pay'],
  },
];

export function SearchResults({ searchQuery, products, onAddToCart, onServiceClick, onProductClick, isGuest = false }: SearchResultsProps) {
  const query = searchQuery.toLowerCase().trim();

  if (!query) {
    return (
      <div className="px-4 py-8">
        <div className="text-center py-12">
          <ShoppingBag className="w-16 h-16 text-[#6A89A7] mx-auto mb-4 opacity-50" />
          <h3 className="text-[#384959] mb-2">Search Costco</h3>
          <p className="text-[#6A89A7]">Find products, services, and more</p>
        </div>
      </div>
    );
  }

  // Search products
  const matchingProducts = products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query) ||
    product.quantity.toLowerCase().includes(query)
  );

  // Search services
  const matchingServices = services.filter(service =>
    service.name.toLowerCase().includes(query) ||
    service.description.toLowerCase().includes(query) ||
    service.keywords.some(keyword => keyword.includes(query))
  );

  // Search categories
  const categories = Array.from(new Set(products.map(p => p.category)));
  const matchingCategories = categories.filter(cat =>
    cat.toLowerCase().includes(query)
  );

  const hasResults = matchingProducts.length > 0 || matchingServices.length > 0 || matchingCategories.length > 0;

  return (
    <div className="px-4 py-8">
      <div className="mb-6">
        <h2 className="text-[#384959] mb-1">Search Results</h2>
        <p className="text-sm text-[#6A89A7]">
          Showing results for "{searchQuery}"
        </p>
      </div>

      {!hasResults ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-[#6A89A7] mx-auto mb-4 opacity-50" />
          <h3 className="text-[#384959] mb-2">No results found</h3>
          <p className="text-[#6A89A7]">Try searching for products, services, or categories</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Services Results */}
          {matchingServices.length > 0 && (
            <div>
              <h3 className="text-[#384959] mb-4">Services ({matchingServices.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchingServices.map((service) => {
                  const Icon = service.icon;
                  return (
                    <button
                      key={service.id}
                      onClick={() => onServiceClick(service.type)}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[#6A89A7] hover:shadow-md transition-all text-left"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-[#BDDDFC]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-[#6A89A7]" />
                        </div>
                        <div>
                          <h4 className="text-[#384959] mb-1">{service.name}</h4>
                          <p className="text-xs text-[#6A89A7]">{service.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Categories Results */}
          {matchingCategories.length > 0 && (
            <div>
              <h3 className="text-[#384959] mb-4">Categories ({matchingCategories.length})</h3>
              <div className="flex flex-wrap gap-2">
                {matchingCategories.map((category) => (
                  <button
                    key={category}
                    className="px-4 py-2 bg-[#BDDDFC]/20 text-[#6A89A7] rounded-lg hover:bg-[#BDDDFC]/40 transition-all"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Products Results */}
          {matchingProducts.length > 0 && (
            <div>
              <h3 className="text-[#384959] mb-4">Products ({matchingProducts.length})</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {matchingProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => onProductClick(product)}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100"
                  >
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      {product.isOnSale && (
                        <div className="inline-block bg-[#E57373] text-white text-xs px-2 py-0.5 rounded mb-2">
                          Sale
                        </div>
                      )}
                      <h3 className="text-[#384959] text-sm mb-1 line-clamp-2">{product.name}</h3>
                      <div className="text-xs text-[#6A89A7] mb-2">{product.quantity}</div>
                      <div className="flex items-center justify-between mb-2">
                        {product.isOnSale && product.originalPrice ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                            <span className="text-[#384959]">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[#384959]">${product.price.toFixed(2)}</span>
                        )}
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
          )}
        </div>
      )}
    </div>
  );
}
