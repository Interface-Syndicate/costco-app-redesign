import { X, ShoppingCart, Heart, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
  isGuest?: boolean;
}

export function ProductDetailModal({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart, 
  isFavorite = false, 
  onToggleFavorite,
  isGuest = false
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen || !product) return null;

  // Mock additional images (in real app, these would come from product data)
  const images = [product.image, product.image, product.image];

  // Mock reviews data
  const rating = 4.5;
  const reviewCount = 127;

  // Mock product details
  const details = [
    'Premium quality bulk packaging',
    'Member exclusive pricing',
    'Satisfaction guaranteed',
    'Best value per unit',
  ];

  const handleAddToCart = () => {
    // If user is a guest, just call onAddToCart which will trigger the guest prompt
    // Don't show success message or close modal
    if (isGuest) {
      onAddToCart(product);
      return;
    }
    
    // For logged in users, add items and show success
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setQuantity(1);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="text-xs bg-[#6A89A7] text-white px-2 py-1 rounded">
              {product.category}
            </div>
            {product.isOnSale && (
              <div className="text-xs bg-[#E57373] text-white px-2 py-1 rounded">
                Sale
              </div>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-[#6A89A7]" />
          </button>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Left Column - Images */}
          <div>
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
              <ImageWithFallback
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-[#6A89A7]' : 'border-gray-200'
                  }`}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Features */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-[#6A89A7]">
                <Truck className="w-5 h-5 text-[#6A89A7]" />
                <span>Free delivery on orders over $75</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#6A89A7]">
                <Shield className="w-5 h-5 text-[#6A89A7]" />
                <span>100% Satisfaction Guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#6A89A7]">
                <RotateCcw className="w-5 h-5 text-[#6A89A7]" />
                <span>Easy returns within 90 days</span>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div>
            <h1 className="text-2xl text-[#384959] mb-3">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
                        ? 'fill-[#88BDF2] text-[#88BDF2]'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-[#6A89A7]">
                {rating} ({reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl text-[#384959]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <div className="text-sm text-green-600">
                  Save ${(product.originalPrice - product.price).toFixed(2)} (
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off)
                </div>
              )}
              {product.saleEndDate && (
                <div className="text-sm text-[#E57373] mt-2">
                  Sale ends {product.saleEndDate}
                </div>
              )}
              <div className="text-sm text-[#6A89A7] mt-2">
                Quantity: {product.quantity}
              </div>
            </div>

            {/* Product Details */}
            <div className="mb-6">
              <h3 className="text-[#384959] mb-3">Product Details</h3>
              <ul className="space-y-2">
                {details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-[#6A89A7]">
                    <span className="text-[#6A89A7] mt-1">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="text-[#384959] mb-3">Specifications</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#6A89A7]">Category:</span>
                  <span className="text-[#384959]">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6A89A7]">Package Size:</span>
                  <span className="text-[#384959]">{product.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6A89A7]">Item #:</span>
                  <span className="text-[#384959]">{product.id.padStart(8, '0')}</span>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="text-sm text-[#6A89A7] mb-2 block">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center text-[#384959]"
                >
                  -
                </button>
                <span className="w-12 text-center text-[#384959]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center text-[#384959]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#E8DCC2] text-[#384959] px-6 py-3 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              {onToggleFavorite && (
                <button
                  onClick={() => onToggleFavorite(product.id)}
                  className={`px-6 py-3 rounded-lg transition-all active:scale-95 border-2 ${
                    isFavorite
                      ? 'bg-[#E57373] border-[#E57373] text-white'
                      : 'bg-white border-gray-300 text-[#6A89A7] hover:border-[#6A89A7]'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`}
                  />
                </button>
              )}
            </div>

            {/* Total Price */}
            {quantity > 1 && (
              <div className="mt-4 p-4 bg-[#BDDDFC]/20 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-[#6A89A7]">Total ({quantity} items):</span>
                  <span className="text-xl text-[#384959]">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="border-t border-gray-200 px-6 py-6">
          <h3 className="text-[#384959] mb-4">Customer Reviews</h3>
          <div className="space-y-4">
            {/* Sample Reviews */}
            {[
              { name: 'Sarah M.', rating: 5, date: 'Nov 28, 2024', comment: 'Great value! The quality is excellent and the price can\'t be beat.' },
              { name: 'John D.', rating: 4, date: 'Nov 25, 2024', comment: 'Very satisfied with this purchase. Delivery was quick and packaging was good.' },
            ].map((review, idx) => (
              <div key={idx} className="pb-4 border-b border-gray-200 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#384959]">{review.name}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < review.rating
                              ? 'fill-[#88BDF2] text-[#88BDF2]'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-[#6A89A7]">{review.date}</span>
                </div>
                <p className="text-sm text-[#6A89A7]">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-20 rounded-xl">
            <div className="bg-white p-8 rounded-xl shadow-2xl text-center flex flex-col items-center animate-fade-in">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-xl text-[#384959] mb-1">Added to Cart!</p>
              <p className="text-sm text-[#6A89A7]">{quantity} {quantity === 1 ? 'item' : 'items'} added</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}