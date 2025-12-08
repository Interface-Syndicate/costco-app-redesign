export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: string;
  category: string;
  image: string;
  isOnSale?: boolean;
  originalPrice?: number;
  saleEndDate?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'processing' | 'shipped';
  total: number;
  items: { product: Product; quantity: number }[];
  shippingAddress?: string;
  paymentMethod?: string;
  subtotal?: number;
  tax?: number;
  shipping?: number;
}
