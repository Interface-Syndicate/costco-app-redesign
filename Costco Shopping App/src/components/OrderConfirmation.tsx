import { Check, Package, MapPin, Calendar } from 'lucide-react';

interface OrderConfirmationProps {
  orderNumber: string;
  onContinueShopping: () => void;
}

export function OrderConfirmation({ orderNumber, onContinueShopping }: OrderConfirmationProps) {
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Success Animation */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center">
          <div className="w-20 h-20 bg-[#9FB8A3] rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
          
          <h2 className="text-[#384959] mb-2">Order Confirmed!</h2>
          <p className="text-[#6A89A7] mb-6">
            Thank you for your purchase
          </p>

          {/* Order Number */}
          <div className="bg-[#BDDDFC]/30 rounded-lg p-4 mb-6">
            <p className="text-xs text-[#6A89A7] mb-1">Order Number</p>
            <p className="text-[#384959] tracking-wider">{orderNumber}</p>
          </div>

          {/* Order Details */}
          <div className="space-y-3 mb-6 text-left">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#88BDF2]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-[#6A89A7]" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm text-[#384959]">Order Processing</h4>
                <p className="text-xs text-[#6A89A7]">
                  We're preparing your items for shipment
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#88BDF2]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-[#6A89A7]" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm text-[#384959]">Estimated Delivery</h4>
                <p className="text-xs text-[#6A89A7]">
                  {estimatedDelivery.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#88BDF2]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#6A89A7]" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm text-[#384959]">Track Your Order</h4>
                <p className="text-xs text-[#6A89A7]">
                  You'll receive tracking info via email
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={onContinueShopping}
              className="w-full bg-[#E8DCC2] text-[#384959] py-3 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95"
            >
              Continue Shopping
            </button>
            <button className="w-full bg-white border-2 border-[#6A89A7] text-[#6A89A7] py-3 rounded-lg hover:bg-gray-50 transition-all">
              View Order Details
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4 text-center">
          <p className="text-sm text-[#6A89A7]">
            Questions? Contact us at{' '}
            <span className="text-[#6A89A7] underline">1-800-COSTCO</span>
          </p>
        </div>
      </div>
    </div>
  );
}
