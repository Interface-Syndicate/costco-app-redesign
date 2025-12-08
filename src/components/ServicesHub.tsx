import { Fuel, ShoppingBag, BadgeCheck, Eye, PillBottle, UtensilsCrossed, Truck, MapPin, Plane, CreditCard } from 'lucide-react';

export interface ServiceItem {
  id: string;
  name: string;
  icon: any;
  description: string;
}

// All services data - exported for "See All" view
export const allServices: ServiceItem[] = [
  { 
    id: 'membership', 
    name: 'Membership', 
    icon: BadgeCheck,
    description: 'Join Costco and enjoy exclusive member benefits'
  },
  { 
    id: 'optical', 
    name: 'Optical', 
    icon: Eye,
    description: 'Eye exams, glasses, and contact lenses'
  },
  { 
    id: 'pharmacy', 
    name: 'Pharmacy', 
    icon: PillBottle,
    description: 'Prescription refills and health services'
  },
  { 
    id: 'foodcourt', 
    name: 'Food Court', 
    icon: UtensilsCrossed,
    description: 'Delicious meals and snacks at great prices'
  },
  { 
    id: 'travel', 
    name: 'Travel', 
    icon: Plane,
    description: 'Book your next vacation with exclusive deals'
  },
  { 
    id: 'gas', 
    name: 'Gas', 
    icon: Fuel,
    description: 'Fill up at our low-cost gas stations'
  },
  { 
    id: 'grocery', 
    name: 'Grocery', 
    icon: ShoppingBag,
    description: 'Fresh produce and pantry essentials'
  },
  { 
    id: 'delivery', 
    name: 'Delivery', 
    icon: Truck,
    description: 'Same-day and 2-day delivery options'
  },
  { 
    id: 'payments', 
    name: 'Payments', 
    icon: CreditCard,
    description: 'Costco Anywhere Visa Card and payment options'
  },
];
