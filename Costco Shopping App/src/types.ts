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