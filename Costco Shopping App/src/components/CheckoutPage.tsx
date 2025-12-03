import { useState } from 'react';
import { ArrowLeft, CreditCard, MapPin, Check } from 'lucide-react';
import { CartItem } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CheckoutPageProps {
  cart: CartItem[];
  onBack: () => void;
  onOrderComplete: () => void;
}

export function CheckoutPage({ cart, onBack, onOrderComplete }: CheckoutPageProps) {
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('review');
  };

  const handlePlaceOrder = () => {
    // Simulate order processing
    setTimeout(() => {
      onOrderComplete();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#384959]" />
            </button>
            <h2 className="text-[#384959]">Checkout</h2>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between">
            {['shipping', 'payment', 'review'].map((s, index) => (
              <div key={s} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      step === s
                        ? 'bg-[#6A89A7] text-white'
                        : index < ['shipping', 'payment', 'review'].indexOf(step)
                        ? 'bg-[#9FB8A3] text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {index < ['shipping', 'payment', 'review'].indexOf(step) ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="text-xs">{index + 1}</span>
                    )}
                  </div>
                  <span className="text-xs mt-1 text-[#384959] capitalize">{s}</span>
                </div>
                {index < 2 && (
                  <div
                    className={`h-0.5 flex-1 transition-all ${
                      index < ['shipping', 'payment', 'review'].indexOf(step)
                        ? 'bg-[#9FB8A3]'
                        : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Shipping Information */}
        {step === 'shipping' && (
          <form onSubmit={handleShippingSubmit} className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="text-[#384959] mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Shipping Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-[#6A89A7] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.fullName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#88BDF2]"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#6A89A7] mb-1">Address</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#88BDF2]"
                    placeholder="123 Main Street"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-[#6A89A7] mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#88BDF2]"
                      placeholder="Charlotte"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#6A89A7] mb-1">ZIP Code</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#88BDF2]"
                      placeholder="28202"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#6A89A7] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#88BDF2]"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#E8DCC2] text-[#384959] py-3 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95"
            >
              Continue to Payment
            </button>
          </form>
        )}

        {/* Payment Information */}
        {step === 'payment' && (
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="text-[#384959] mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-[#6A89A7] mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#88BDF2]"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#6A89A7] mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    required
                    value={paymentInfo.cardName}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#88BDF2]"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-[#6A89A7] mb-1">Expiry Date</label>
                    <input
                      type="text"
                      required
                      value={paymentInfo.expiry}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#88BDF2]"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#6A89A7] mb-1">CVV</label>
                    <input
                      type="text"
                      required
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#88BDF2]"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="flex-1 bg-white border-2 border-[#6A89A7] text-[#6A89A7] py-3 rounded-lg hover:bg-gray-50 transition-all"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#E8DCC2] text-[#384959] py-3 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95"
              >
                Review Order
              </button>
            </div>
          </form>
        )}

        {/* Review & Place Order */}
        {step === 'review' && (
          <div className="space-y-4">
            {/* Order Summary */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="text-[#384959] mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm text-[#384959] truncate">{item.product.name}</h4>
                      <p className="text-xs text-[#6A89A7]">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm text-[#6A89A7]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between text-sm text-[#6A89A7]">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#6A89A7]">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm text-[#6A89A7]">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-[#384959]">Total</span>
                  <span className="text-[#6A89A7]">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-[#384959]">Shipping Address</h3>
                <button
                  onClick={() => setStep('shipping')}
                  className="text-xs text-[#6A89A7] hover:text-[#88BDF2]"
                >
                  Edit
                </button>
              </div>
              <p className="text-sm text-[#6A89A7]">{shippingInfo.fullName}</p>
              <p className="text-sm text-[#6A89A7]">{shippingInfo.address}</p>
              <p className="text-sm text-[#6A89A7]">
                {shippingInfo.city}, {shippingInfo.zipCode}
              </p>
              <p className="text-sm text-[#6A89A7]">{shippingInfo.phone}</p>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-[#384959]">Payment Method</h3>
                <button
                  onClick={() => setStep('payment')}
                  className="text-xs text-[#6A89A7] hover:text-[#88BDF2]"
                >
                  Edit
                </button>
              </div>
              <p className="text-sm text-[#6A89A7]">
                •••• •••• •••• {paymentInfo.cardNumber.slice(-4)}
              </p>
              <p className="text-sm text-[#6A89A7]">{paymentInfo.cardName}</p>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-[#E8DCC2] text-[#384959] py-3 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95"
            >
              Place Order (${total.toFixed(2)})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}