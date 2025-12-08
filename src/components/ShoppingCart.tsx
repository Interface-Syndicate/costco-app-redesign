import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export function ShoppingCart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: ShoppingCartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b bg-[#6A89A7]">
            <h2 className="text-white">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#88BDF2] rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center text-[#6A89A7] mt-12">
                Your cart is empty
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-4 pb-4 border-b">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#384959] truncate">{item.product.name}</h3>
                      <div className="text-sm text-[#6A89A7]">{item.product.quantity}</div>
                      <div className="text-[#6A89A7] mt-1">${item.product.price.toFixed(2)}</div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-[#E57373]" />
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors active:scale-95"
                        >
                          <Minus className="w-4 h-4 text-[#384959]" />
                        </button>
                        <span className="w-8 text-center text-[#384959]">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors active:scale-95"
                        >
                          <Plus className="w-4 h-4 text-[#384959]" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t p-4 space-y-3 bg-gray-50">
              <div className="flex justify-between text-[#6A89A7]">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#6A89A7]">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-[#384959]">Total</span>
                <span className="text-[#6A89A7]">${total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-[#E8DCC2] text-[#384959] py-3 rounded-lg hover:bg-[#d4c8ad] transition-colors active:scale-95">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
