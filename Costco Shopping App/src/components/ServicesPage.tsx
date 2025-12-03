import { ArrowLeft, BadgeCheck, CreditCard, MapPin, Fuel, ShoppingBag, Calendar, Users, Gift, Phone, Award, Star, RefreshCw, Plane, Ship, Info, Truck, Tag, Leaf, Eye, PillBottle, UtensilsCrossed, Package, Upload, Clock } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ServicesPageProps {
  serviceType: 'membership' | 'optical' | 'pharmacy' | 'foodcourt' | 'travel' | 'gas' | 'grocery' | 'delivery';
  onBack: () => void;
  isGuest: boolean;
  onGuestAction: () => void;
}

export function ServicesPage({ serviceType, onBack, isGuest, onGuestAction }: ServicesPageProps) {
  const [autoRenewEnabled, setAutoRenewEnabled] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '•••• •••• •••• 4532',
    expiryDate: '12/26',
    cardholderName: 'John Doe',
  });
  
  // Payments state
  const [autoPayEnabled, setAutoPayEnabled] = useState(false);
  const [showVisaApplicationModal, setShowVisaApplicationModal] = useState(false);
  const [showDigitalWalletModal, setShowDigitalWalletModal] = useState(false);
  const [showVisaConfirmation, setShowVisaConfirmation] = useState(false);
  const [visaFormData, setVisaFormData] = useState({
    fullName: '',
    annualIncome: '',
    ssn: '',
  });
  const [visaFormErrors, setVisaFormErrors] = useState({
    fullName: false,
    annualIncome: false,
    ssn: false,
  });
  
  // Digital Wallet state
  const [walletCards, setWalletCards] = useState<Array<{type: string; last4: string}>>([]);
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [newCardData, setNewCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });
  
  // Travel state
  const [showVacationModal, setShowVacationModal] = useState(false);
  const [showCruiseModal, setShowCruiseModal] = useState(false);
  const [showTravelBenefitsModal, setShowTravelBenefitsModal] = useState(false);
  const [showAllVacationsModal, setShowAllVacationsModal] = useState(false);
  const [showAllCruisesModal, setShowAllCruisesModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [bookingData, setBookingData] = useState({
    departureDate: '',
    travelers: '2',
    specialRequests: '',
  });
  
  // Grocery state
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [showWeeklyDealsModal, setShowWeeklyDealsModal] = useState(false);
  const [showOrganicModal, setShowOrganicModal] = useState(false);
  
  // Membership state
  const [showHouseholdModal, setShowHouseholdModal] = useState(false);
  const [showGoldStarBenefits, setShowGoldStarBenefits] = useState(false);
  const [showExecutiveBenefits, setShowExecutiveBenefits] = useState(false);
  const [householdCardData, setHouseholdCardData] = useState({
    name: '',
    relationship: 'spouse',
  });
  
  // Optical state
  const [showEyeExamModal, setShowEyeExamModal] = useState(false);
  const [showFramesModal, setShowFramesModal] = useState(false);
  const [showContactsModal, setShowContactsModal] = useState(false);
  const [eyeExamData, setEyeExamData] = useState({
    date: '',
    time: '',
    location: 'Charlotte Costco',
  });
  const [eyeExamErrors, setEyeExamErrors] = useState({
    date: false,
    time: false,
  });
  const [showEyeExamConfirmation, setShowEyeExamConfirmation] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState<any>(null);
  const [showFrameDetail, setShowFrameDetail] = useState(false);
  const [framePrescriptionImage, setFramePrescriptionImage] = useState<string | null>(null);
  const [showFrameConfirmation, setShowFrameConfirmation] = useState(false);
  const [contactsCart, setContactsCart] = useState<any[]>([]);
  const [showContactsCart, setShowContactsCart] = useState(false);
  const [showContactsConfirmation, setShowContactsConfirmation] = useState(false);
  const [contactsOrderTotal, setContactsOrderTotal] = useState(0);
  
  // Pharmacy state
  const [showRefillModal, setShowRefillModal] = useState(false);
  const [showImmunizationModal, setShowImmunizationModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [refillData, setRefillData] = useState({
    prescriptionNumber: '',
    pharmacyPhone: '',
  });
  const [showRefillConfirmation, setShowRefillConfirmation] = useState(false);
  const [refillErrors, setRefillErrors] = useState({
    prescriptionNumber: false,
  });
  const [immunizationData, setImmunizationData] = useState({
    type: '',
    date: '',
    time: '',
    location: 'Charlotte Costco',
  });
  const [showImmunizationConfirmation, setShowImmunizationConfirmation] = useState(false);
  const [immunizationErrors, setImmunizationErrors] = useState({
    type: false,
    date: false,
    time: false,
  });
  const [transferData, setTransferData] = useState({
    currentPharmacy: '',
    pharmacyPhone: '',
    prescriptionNumber: '',
  });
  const [showTransferConfirmation, setShowTransferConfirmation] = useState(false);
  const [transferErrors, setTransferErrors] = useState({
    currentPharmacy: false,
    pharmacyPhone: false,
    prescriptionNumber: false,
  });
  
  // Food Court state
  const [showFoodCourtMenu, setShowFoodCourtMenu] = useState(false);
  const [foodCourtCart, setFoodCourtCart] = useState<any[]>([]);
  const [showFoodCourtCart, setShowFoodCourtCart] = useState(false);
  const [showFoodCourtConfirmation, setShowFoodCourtConfirmation] = useState(false);
  const [foodCourtPickupTime, setFoodCourtPickupTime] = useState('');
  
  // Grocery state
  const [showGroceryProducts, setShowGroceryProducts] = useState(false);
  const [groceryCart, setGroceryCart] = useState<any[]>([]);
  const [showGroceryCart, setShowGroceryCart] = useState(false);
  const [selectedGroceryCategory, setSelectedGroceryCategory] = useState('all');
  
  // Delivery state
  const [showSameDayDelivery, setShowSameDayDelivery] = useState(false);
  const [showTwoDayDelivery, setShowTwoDayDelivery] = useState(false);
  const [showTrackOrder, setShowTrackOrder] = useState(false);

  const serviceContent = {
    membership: {
      title: 'Membership',
      icon: BadgeCheck,
      color: '#6A89A7',
      description: 'Manage your Costco membership and benefits',
      features: [
        {
          icon: BadgeCheck,
          title: 'Gold Star Membership',
          description: 'Standard membership with full warehouse access',
          price: '$60/year',
        },
        {
          icon: Gift,
          title: 'Executive Membership',
          description: 'Premium membership with 2% annual reward',
          price: '$120/year',
        },
        {
          icon: Users,
          title: 'Add Household Card',
          description: 'Free additional card for household member',
          price: 'Free',
        },
      ],
    },
    payments: {
      title: 'Payments',
      icon: CreditCard,
      color: '#88BDF2',
      description: 'Payment methods and transaction history',
      features: [
        {
          icon: CreditCard,
          title: 'Costco Anywhere Visa',
          description: 'Earn cashback on all purchases',
          price: 'Apply Now',
        },
        {
          icon: Phone,
          title: 'Digital Wallet',
          description: 'Quick checkout with saved payment methods',
          price: 'Setup',
        },
        {
          icon: Calendar,
          title: 'Auto-Pay',
          description: 'Set up automatic membership renewal',
          price: 'Enable',
        },
      ],
    },
    travel: {
      title: 'Travel',
      icon: MapPin,
      color: '#E8DCC2',
      description: 'Exclusive travel deals for members',
      features: [
        {
          icon: MapPin,
          title: 'Vacation Packages',
          description: 'Save on hotels, flights, and car rentals',
          price: 'Browse Deals',
        },
        {
          icon: Calendar,
          title: 'Cruise Packages',
          description: 'Exclusive pricing on popular cruise lines',
          price: 'View Cruises',
        },
        {
          icon: Gift,
          title: 'Member Benefits',
          description: 'Additional perks and upgrades',
          price: 'Learn More',
        },
      ],
    },
    gas: {
      title: 'Gas Station',
      icon: Fuel,
      color: '#9FB8A3',
      description: 'Find nearby Costco gas stations and prices',
      features: [
        {
          icon: MapPin,
          title: 'Charlotte - Main St',
          description: 'Regular: $2.89/gal • Premium: $3.19/gal',
          price: '2.3 miles',
        },
        {
          icon: MapPin,
          title: 'Charlotte - East Blvd',
          description: 'Regular: $2.91/gal • Premium: $3.21/gal',
          price: '4.7 miles',
        },
        {
          icon: MapPin,
          title: 'Charlotte - North Ave',
          description: 'Regular: $2.87/gal • Premium: $3.17/gal',
          price: '6.1 miles',
        },
      ],
    },
    grocery: {
      title: 'Grocery',
      icon: ShoppingBag,
      color: '#BDDDFC',
      description: 'Fresh groceries and same-day delivery',
      features: [
        {
          icon: ShoppingBag,
          title: 'Same-Day Delivery',
          description: 'Get groceries delivered in 2 hours',
          price: 'Order Now',
        },
        {
          icon: Calendar,
          title: 'Weekly Deals',
          description: 'Special pricing on fresh produce',
          price: 'View Deals',
        },
        {
          icon: Gift,
          title: 'Organic Selection',
          description: 'Kirkland Signature organic products',
          price: 'Shop Now',
        },
      ],
    },
    optical: {
      title: 'Optical',
      icon: Eye,
      color: '#88BDF2',
      description: 'Eye exams, glasses, and contact lenses',
      features: [
        {
          icon: Eye,
          title: 'Eye Exam',
          description: 'Comprehensive eye examination by licensed optometrists',
          price: '$79',
        },
        {
          icon: Award,
          title: 'Designer Frames',
          description: 'Wide selection of frames from top brands',
          price: 'From $59',
        },
        {
          icon: Gift,
          title: 'Contact Lenses',
          description: 'Discount prices on popular brands',
          price: 'Shop Now',
        },
      ],
    },
    pharmacy: {
      title: 'Pharmacy',
      icon: PillBottle,
      color: '#9FB8A3',
      description: 'Prescription refills and health services',
      features: [
        {
          icon: PillBottle,
          title: 'Prescription Refill',
          description: 'Refill prescriptions online or in-store',
          price: 'Refill Now',
        },
        {
          icon: Calendar,
          title: 'Immunizations',
          description: 'Flu shots, vaccines, and health screenings',
          price: 'Schedule',
        },
        {
          icon: Users,
          title: 'Transfer Prescription',
          description: 'Easy transfer from other pharmacies',
          price: 'Transfer',
        },
      ],
    },
    foodcourt: {
      title: 'Food Court',
      icon: UtensilsCrossed,
      color: '#E8DCC2',
      description: 'Member-exclusive food court menu',
      features: [
        {
          icon: UtensilsCrossed,
          title: 'Hot Dog Combo',
          description: 'All-beef hot dog with soda refill',
          price: '$1.50',
        },
        {
          icon: Tag,
          title: 'Pizza Slice',
          description: 'Cheese or pepperoni - 18" whole pizzas available',
          price: '$1.99',
        },
        {
          icon: Gift,
          title: 'Chicken Bake',
          description: 'Chicken, bacon, cheese, and Caesar dressing',
          price: '$3.99',
        },
      ],
    },
    delivery: {
      title: 'Delivery',
      icon: Truck,
      color: '#BDDDFC',
      description: 'Same-day and 2-day delivery options',
      features: [
        {
          icon: Truck,
          title: 'Same-Day Delivery',
          description: 'Get essentials delivered in 2 hours',
          price: '$10 fee',
        },
        {
          icon: Package,
          title: '2-Day Delivery',
          description: 'Free delivery on orders over $75',
          price: 'Free',
        },
        {
          icon: MapPin,
          title: 'Track Order',
          description: 'Real-time tracking for all deliveries',
          price: 'Track Now',
        },
      ],
    },
  };

  const service = serviceContent[serviceType];
  const IconComponent = service.icon;

  // Travel packages data
  const allVacationPackages = [
    { name: 'Hawaii Paradise', duration: '7 nights', type: 'Flight + Hotel', price: 1299, savings: '25%', icon: 'blue', description: 'Waikiki Beach Resort' },
    { name: 'Caribbean Escape', duration: '5 nights', type: 'All-Inclusive', price: 899, savings: '30%', icon: 'orange', description: 'Cancun, Mexico' },
    { name: 'European Adventure', duration: '10 nights', type: 'Multi-City', price: 1799, savings: '20%', icon: 'purple', description: 'Paris, Rome, Barcelona' },
    { name: 'Mexico Beach Resort', duration: '6 nights', type: 'All-Inclusive', price: 799, savings: '35%', icon: 'teal', description: 'Cabo San Lucas' },
    { name: 'Orlando Family Fun', duration: '4 nights', type: 'Hotel + Theme Parks', price: 599, savings: '20%', icon: 'pink', description: 'Disney World Access' },
    { name: 'New York City', duration: '3 nights', type: 'Hotel + Broadway', price: 499, savings: '15%', icon: 'indigo', description: 'Times Square Hotel' },
  ];

  const allCruisePackages = [
    { name: 'Alaskan Adventure', duration: '7-day cruise', type: 'Inside Passage', price: 699, badge: 'Member Exclusive', icon: 'blue' },
    { name: 'Mediterranean Magic', duration: '10-day cruise', type: 'Greek Isles', price: 1299, badge: 'Save $400', icon: 'teal' },
    { name: 'Caribbean Explorer', duration: '5-day cruise', type: 'Eastern Caribbean', price: 499, badge: 'Best Value', icon: 'green' },
    { name: 'Mexican Riviera', duration: '7-day cruise', type: 'Pacific Coast', price: 599, badge: 'Popular', icon: 'orange' },
    { name: 'Bahamas Getaway', duration: '3-day cruise', type: 'Nassau & Freeport', price: 299, badge: 'Weekend Deal', icon: 'purple' },
    { name: 'Northern Europe', duration: '12-day cruise', type: 'Scandinavia & Russia', price: 1599, badge: 'Premium', icon: 'indigo' },
  ];

  // Food Court Menu Data
  const foodCourtMenuItems = [
    { id: 1, name: 'Hot Dog Combo', price: 1.50, desc: 'All-beef hot dog with soda refill', category: 'meals' },
    { id: 2, name: 'Pizza Slice', price: 1.99, desc: 'Cheese or pepperoni', category: 'meals' },
    { id: 3, name: 'Whole Pizza', price: 9.99, desc: '18" cheese or pepperoni', category: 'meals' },
    { id: 4, name: 'Chicken Bake', price: 3.99, desc: 'Chicken, bacon, cheese & Caesar dressing', category: 'meals' },
    { id: 5, name: 'Caesar Salad', price: 4.99, desc: 'Fresh romaine with chicken', category: 'meals' },
    { id: 6, name: 'Acai Bowl', price: 5.49, desc: 'Açaí berries, granola, and fresh fruit', category: 'meals' },
    { id: 7, name: 'Churro', price: 1.49, desc: 'Cinnamon sugar churro', category: 'desserts' },
    { id: 8, name: 'Smoothie', price: 2.99, desc: 'Strawberry or mango', category: 'drinks' },
    { id: 9, name: 'Soft Serve', price: 1.49, desc: 'Vanilla or swirl', category: 'desserts' },
    { id: 10, name: 'Frozen Yogurt', price: 1.99, desc: 'Low-fat vanilla', category: 'desserts' },
    { id: 11, name: 'Soda', price: 0.69, desc: 'Pepsi products with free refills', category: 'drinks' },
    { id: 12, name: 'Bottled Water', price: 0.99, desc: 'Kirkland purified water', category: 'drinks' },
  ];

  // Grocery Products Data
  const groceryProducts = [
    // Produce
    { id: 1, name: 'Organic Bananas', price: 1.99, unit: '3 lbs', category: 'produce', savings: '30%' },
    { id: 2, name: 'Strawberries', price: 4.99, unit: '2 lbs', category: 'produce', badge: 'Fresh' },
    { id: 3, name: 'Avocados', price: 5.99, unit: '6 pack', category: 'produce', savings: '25%' },
    { id: 4, name: 'Mixed Greens', price: 3.99, unit: '1 lb', category: 'produce', badge: 'Organic' },
    // Meat & Seafood
    { id: 5, name: 'Chicken Breast', price: 19.99, unit: '6 lbs', category: 'meat', badge: 'Fresh' },
    { id: 6, name: 'Ground Beef', price: 24.99, unit: '5 lbs', category: 'meat', savings: '20%' },
    { id: 7, name: 'Atlantic Salmon', price: 29.99, unit: '3 lbs', category: 'seafood', badge: 'Wild Caught' },
    { id: 8, name: 'Shrimp', price: 22.99, unit: '2 lbs', category: 'seafood', savings: '15%' },
    // Dairy & Eggs
    { id: 9, name: 'Organic Eggs', price: 6.99, unit: '24 count', category: 'dairy', badge: 'Organic' },
    { id: 10, name: 'Milk', price: 4.99, unit: '1 gallon', category: 'dairy' },
    { id: 11, name: 'Cheese Variety', price: 12.99, unit: '2 lbs', category: 'dairy', savings: '25%' },
    { id: 12, name: 'Greek Yogurt', price: 8.99, unit: '12 pack', category: 'dairy', badge: 'Kirkland' },
    // Pantry
    { id: 13, name: 'Olive Oil', price: 14.99, unit: '2 liters', category: 'pantry', badge: 'Premium' },
    { id: 14, name: 'Quinoa', price: 9.99, unit: '4 lbs', category: 'pantry', badge: 'Organic' },
    { id: 15, name: 'Almonds', price: 16.99, unit: '3 lbs', category: 'pantry', savings: '30%' },
    { id: 16, name: 'Coffee Beans', price: 19.99, unit: '3 lbs', category: 'pantry', badge: 'Kirkland' },
    // Frozen
    { id: 17, name: 'Mixed Berries', price: 7.99, unit: '4 lbs', category: 'frozen', badge: 'Organic' },
    { id: 18, name: 'Pizza', price: 12.99, unit: '4 pack', category: 'frozen', savings: '20%' },
    { id: 19, name: 'Ice Cream', price: 8.99, unit: '3 quarts', category: 'frozen' },
    { id: 20, name: 'Chicken Nuggets', price: 13.99, unit: '5 lbs', category: 'frozen', badge: 'Kids Love' },
  ];

  const handleBookPackage = (pkg: any, type: 'vacation' | 'cruise') => {
    setSelectedPackage({ ...pkg, packageType: type });
    setShowBookingModal(true);
    setShowAllVacationsModal(false);
    setShowAllCruisesModal(false);
    setShowVacationModal(false);
    setShowCruiseModal(false);
  };

  const handleBookingSubmit = () => {
    if (!bookingData.departureDate || !bookingData.travelers) {
      return;
    }
    if (isGuest) {
      setShowBookingModal(false);
      onGuestAction();
      return;
    }
    setShowBookingModal(false);
    setShowBookingConfirmation(true);
    setBookingData({
      departureDate: '',
      travelers: '2',
      specialRequests: '',
    });
  };

  const handleVisaApplicationSubmit = () => {
    // Validate all fields
    const errors = {
      fullName: !visaFormData.fullName.trim(),
      annualIncome: !visaFormData.annualIncome.trim(),
      ssn: !visaFormData.ssn.trim(),
    };
    
    setVisaFormErrors(errors);
    
    // If any field has an error, don't submit
    if (Object.values(errors).some(error => error)) {
      return;
    }
    
    if (isGuest) {
      setShowVisaApplicationModal(false);
      onGuestAction();
      return;
    }
    
    // All fields valid, show confirmation
    setShowVisaApplicationModal(false);
    setShowVisaConfirmation(true);
    // Reset form
    setVisaFormData({
      fullName: '',
      annualIncome: '',
      ssn: '',
    });
  };

  const handleAddCardToWallet = () => {
    if (!newCardData.cardNumber || !newCardData.expiryDate || !newCardData.cvv || !newCardData.cardholderName) {
      return;
    }
    
    // Extract last 4 digits
    const last4 = newCardData.cardNumber.slice(-4);
    const cardType = newCardData.cardNumber.startsWith('4') ? 'Visa' : 
                     newCardData.cardNumber.startsWith('5') ? 'Mastercard' : 
                     newCardData.cardNumber.startsWith('3') ? 'Amex' : 'Card';
    
    setWalletCards([...walletCards, { type: cardType, last4 }]);
    
    // Reset form
    setNewCardData({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
    });
    setShowAddCardForm(false);
  };

  // Pharmacy handlers
  const handleRefillSubmit = () => {
    const errors = {
      prescriptionNumber: !refillData.prescriptionNumber.trim(),
    };
    setRefillErrors(errors);
    
    if (Object.values(errors).some(error => error)) {
      return;
    }
    
    if (isGuest) {
      onGuestAction();
      return;
    }
    
    setShowRefillModal(false);
    setShowRefillConfirmation(true);
    setRefillData({ prescriptionNumber: '', pharmacyPhone: '' });
  };

  const handleImmunizationSubmit = () => {
    const errors = {
      type: !immunizationData.type,
      date: !immunizationData.date,
      time: !immunizationData.time,
    };
    setImmunizationErrors(errors);
    
    if (Object.values(errors).some(error => error)) {
      return;
    }
    
    if (isGuest) {
      onGuestAction();
      return;
    }
    
    setShowImmunizationModal(false);
    setShowImmunizationConfirmation(true);
    setImmunizationData({ type: '', date: '', time: '', location: 'Charlotte Costco' });
  };

  const handleTransferSubmit = () => {
    const errors = {
      currentPharmacy: !transferData.currentPharmacy.trim(),
      pharmacyPhone: !transferData.pharmacyPhone.trim(),
      prescriptionNumber: !transferData.prescriptionNumber.trim(),
    };
    setTransferErrors(errors);
    
    if (Object.values(errors).some(error => error)) {
      return;
    }
    
    if (isGuest) {
      onGuestAction();
      return;
    }
    
    setShowTransferModal(false);
    setShowTransferConfirmation(true);
    setTransferData({ currentPharmacy: '', pharmacyPhone: '', prescriptionNumber: '' });
  };

  // Food Court handlers
  const handleFoodCourtCheckout = () => {
    if (foodCourtCart.length === 0 || !foodCourtPickupTime) {
      return;
    }
    
    if (isGuest) {
      onGuestAction();
      return;
    }
    
    setShowFoodCourtCart(false);
    setShowFoodCourtConfirmation(true);
    setFoodCourtCart([]);
    setFoodCourtPickupTime('');
  };

  const handleFeatureClick = (featureTitle: string) => {
    // Handle Membership
    if (serviceType === 'membership') {
      if (featureTitle === 'Gold Star Membership') {
        setShowGoldStarBenefits(true);
      } else if (featureTitle === 'Executive Membership') {
        setShowExecutiveBenefits(true);
      } else if (featureTitle === 'Add Household Card') {
        setShowHouseholdModal(true);
      }
    }
    // Handle Payments
    else if (serviceType === 'payments') {
      if (featureTitle === 'Costco Anywhere Visa') {
        setShowVisaApplicationModal(true);
      } else if (featureTitle === 'Digital Wallet') {
        setShowDigitalWalletModal(true);
      } else if (featureTitle === 'Auto-Pay') {
        setAutoPayEnabled(!autoPayEnabled);
      }
    }
    // Handle Travel
    else if (serviceType === 'travel') {
      if (featureTitle === 'Vacation Packages') {
        setShowVacationModal(true);
      } else if (featureTitle === 'Cruise Packages') {
        setShowCruiseModal(true);
      } else if (featureTitle === 'Member Benefits') {
        setShowTravelBenefitsModal(true);
      }
    }
    // Handle Grocery
    else if (serviceType === 'grocery') {
      setShowGroceryProducts(true);
    }
    // Handle Optical
    else if (serviceType === 'optical') {
      if (featureTitle === 'Eye Exam') {
        setShowEyeExamModal(true);
      } else if (featureTitle === 'Designer Frames') {
        setShowFramesModal(true);
      } else if (featureTitle === 'Contact Lenses') {
        setShowContactsModal(true);
      }
    }
    // Handle Pharmacy
    else if (serviceType === 'pharmacy') {
      if (featureTitle === 'Prescription Refill') {
        setShowRefillModal(true);
      } else if (featureTitle === 'Immunizations') {
        setShowImmunizationModal(true);
      } else if (featureTitle === 'Transfer Prescription') {
        setShowTransferModal(true);
      }
    }
    // Handle Food Court
    else if (serviceType === 'foodcourt') {
      setShowFoodCourtMenu(true);
    }
    // Handle Delivery
    else if (serviceType === 'delivery') {
      if (featureTitle === 'Same-Day Delivery') {
        setShowSameDayDelivery(true);
      } else if (featureTitle === '2-Day Delivery') {
        setShowTwoDayDelivery(true);
      } else if (featureTitle === 'Track Order') {
        setShowTrackOrder(true);
      }
    }
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
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${service.color}20` }}
              >
                <IconComponent className="w-5 h-5" style={{ color: service.color }} />
              </div>
              <div>
                <h2 className="text-[#384959]">{service.title}</h2>
                <p className="text-xs text-[#6A89A7]">{service.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Current Membership Card - Only show for membership */}
        {serviceType === 'membership' && (
          <div className="mb-6">
            {/* Active Membership Card */}
            <div className="bg-gradient-to-br from-[#6A89A7] to-[#384959] rounded-xl p-6 text-white shadow-lg mb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-[#88BDF2]" />
                  <div>
                    <div className="text-sm opacity-90">Current Membership</div>
                    <h3 className="text-xl">Gold Star Member</h3>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                  <div className="text-xs opacity-90">Status</div>
                  <div className="text-sm flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Active
                  </div>
                </div>
              </div>

              {/* Member Details */}
              <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-white/20">
                <div>
                  <div className="text-xs opacity-75 mb-1">Member ID</div>
                  <div className="text-sm">1234 5678 9012</div>
                </div>
                <div>
                  <div className="text-xs opacity-75 mb-1">Member Since</div>
                  <div className="text-sm">January 2020</div>
                </div>
                <div>
                  <div className="text-xs opacity-75 mb-1">Renewal Date</div>
                  <div className="text-sm flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    06/15/2026
                  </div>
                </div>
                <div>
                  <div className="text-xs opacity-75 mb-1">Primary Cardholder</div>
                  <div className="text-sm">John Doe</div>
                </div>
              </div>

              {/* Rewards Section */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#88BDF2]" />
                    <span className="text-sm">Annual Rewards</span>
                  </div>
                  <span className="text-2xl">$0.00</span>
                </div>
                <div className="text-xs opacity-75">
                  Upgrade to Executive Membership to earn 2% back
                </div>
              </div>

              {/* Barcode */}
              <div className="bg-white rounded-lg p-3">
                <div className="flex gap-2">
                  <div className="flex-1 space-y-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="h-1 bg-[#384959] rounded"></div>
                    ))}
                  </div>
                  <div className="flex-1 space-y-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="h-1 bg-[#384959] rounded"></div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-center mt-2 text-[#384959]">Scan at checkout</p>
              </div>
            </div>

            {/* Membership Benefits */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Gift className="w-5 h-5 text-[#6A89A7]" />
                <h3 className="text-[#384959]">Your Benefits</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6A89A7] mt-1.5"></div>
                  <p className="text-sm text-[#6A89A7]">Access to all Costco warehouses worldwide</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6A89A7] mt-1.5"></div>
                  <p className="text-sm text-[#6A89A7]">Exclusive member-only pricing and deals</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6A89A7] mt-1.5"></div>
                  <p className="text-sm text-[#6A89A7]">Free second household card</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6A89A7] mt-1.5"></div>
                  <p className="text-sm text-[#6A89A7]">Costco services: pharmacy, optical, gas</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6A89A7] mt-1.5"></div>
                  <p className="text-sm text-[#6A89A7]">Online shopping with free shipping on select items</p>
                </div>
              </div>
            </div>

            {/* Household Card Holder */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#6A89A7]" />
                  <h3 className="text-[#384959]">Household Cardholder</h3>
                </div>
                <button className="text-[#6A89A7] text-sm hover:text-[#88BDF2] transition-colors">
                  Edit
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm text-[#384959] mb-1">Jane Doe</div>
                <div className="text-xs text-[#6A89A7]">Spouse • Card ID: 9012 3456 7890</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
              <h3 className="text-[#384959] mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                    autoRenewEnabled
                      ? 'bg-green-50 border-2 border-green-200'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    if (isGuest) {
                      onGuestAction();
                      return;
                    }
                    setAutoRenewEnabled(!autoRenewEnabled);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <RefreshCw className={`w-5 h-5 ${autoRenewEnabled ? 'text-green-600' : 'text-[#6A89A7]'}`} />
                    <div className="text-left">
                      <div className="text-sm text-[#384959]">Auto-Renew Membership</div>
                      <div className={`text-xs ${autoRenewEnabled ? 'text-green-600' : 'text-[#6A89A7]'}`}>
                        {autoRenewEnabled ? 'Automatic renewal is active' : 'Set up automatic renewal'}
                      </div>
                    </div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded ${
                    autoRenewEnabled
                      ? 'bg-green-100 text-green-700'
                      : 'text-[#6A89A7]'
                  }`}>
                    {autoRenewEnabled ? '✓ Enabled' : 'Enable'}
                  </div>
                </button>
                <button
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    if (isGuest) {
                      onGuestAction();
                      return;
                    }
                    setShowPaymentModal(true);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-[#6A89A7]" />
                    <div className="text-left">
                      <div className="text-sm text-[#384959]">Update Payment Method</div>
                      <div className="text-xs text-[#6A89A7]">Manage billing information</div>
                    </div>
                  </div>
                  <div className="text-xs text-[#6A89A7]">Update</div>
                </button>
              </div>
            </div>

            {/* Section Title */}
            <h3 className="text-[#384959] mb-3 px-1">Membership Options</h3>
          </div>
        )}

        <div className="space-y-3">
          {service.features.map((feature, index) => {
            const FeatureIcon = feature.icon;
            
            // Special handling for Auto-Pay toggle in Payments
            if (serviceType === 'payments' && feature.title === 'Auto-Pay') {
              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl p-4 shadow-sm border transition-all cursor-pointer ${
                    autoPayEnabled
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-100 hover:shadow-md'
                  }`}
                  onClick={() => setAutoPayEnabled(!autoPayEnabled)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      autoPayEnabled ? 'bg-green-100' : 'bg-[#BDDDFC]/30'
                    }`}>
                      <FeatureIcon className={`w-6 h-6 ${autoPayEnabled ? 'text-green-600' : 'text-[#6A89A7]'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#384959] mb-1">{feature.title}</h3>
                      <p className={`text-sm mb-3 ${autoPayEnabled ? 'text-green-600' : 'text-[#6A89A7]'}`}>
                        {autoPayEnabled ? 'Automatic payments are active' : feature.description}
                      </p>
                      <div className={`text-sm px-4 py-2 rounded-lg inline-block ${
                        autoPayEnabled
                          ? 'bg-green-100 text-green-700'
                          : 'bg-[#E8DCC2] text-[#384959]'
                      }`}>
                        {autoPayEnabled ? '✓ Enabled' : feature.price}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            
            // Regular features
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
                onClick={() => handleFeatureClick(feature.title)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#BDDDFC]/30 flex items-center justify-center flex-shrink-0">
                    <FeatureIcon className="w-6 h-6 text-[#6A89A7]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#384959] mb-1">{feature.title}</h3>
                    <p className="text-sm text-[#6A89A7] mb-3">{feature.description}</p>
                    <button className="bg-[#E8DCC2] text-[#384959] text-sm px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95">
                      {feature.price}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-gradient-to-br from-[#6A89A7] to-[#88BDF2] rounded-xl p-6 text-white">
          <h3 className="mb-2">Need Help?</h3>
          <p className="text-sm mb-4 opacity-90">
            Our member services team is here to assist you with any questions.
          </p>
          <button className="bg-white text-[#6A89A7] px-6 py-2 rounded-lg hover:bg-gray-100 transition-all active:scale-95">
            Contact Support
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#384959]">Update Payment Method</h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm text-[#6A89A7] mb-2">
                  <CreditCard className="w-4 h-4" />
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 transition-all"
                  value={paymentData.cardNumber}
                  onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm text-[#6A89A7] mb-2">
                    <Calendar className="w-4 h-4" />
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 transition-all"
                    value={paymentData.expiryDate}
                    onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#6A89A7] mb-2 block">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-[#6A89A7] mb-2">
                  <Users className="w-4 h-4" />
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 transition-all"
                  value={paymentData.cardholderName}
                  onChange={(e) => setPaymentData({ ...paymentData, cardholderName: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 bg-gray-100 text-[#384959] px-4 py-2 rounded-lg hover:bg-gray-200 transition-all active:scale-95"
                onClick={() => setShowPaymentModal(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95"
                onClick={() => setShowPaymentModal(false)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Visa Application Modal */}
      {showVisaApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-[#6A89A7]" />
                <h3 className="text-[#384959]">Costco Anywhere Visa</h3>
              </div>
              <button
                onClick={() => {
                  setShowVisaApplicationModal(false);
                  setVisaFormErrors({ fullName: false, annualIncome: false, ssn: false });
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-[#6A89A7] to-[#88BDF2] rounded-lg p-4 text-white">
                <h4 className="mb-2">Cashback Rewards</h4>
                <div className="space-y-1 text-sm">
                  <p>• 4% back on eligible gas purchases (up to $7,000/year)</p>
                  <p>• 3% back on restaurants and eligible travel</p>
                  <p>• 2% back at Costco and Costco.com</p>
                  <p>• 1% back on all other purchases</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-[#6A89A7] mb-2 block">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={visaFormData.fullName}
                  onChange={(e) => {
                    setVisaFormData({ ...visaFormData, fullName: e.target.value });
                    setVisaFormErrors({ ...visaFormErrors, fullName: false });
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    visaFormErrors.fullName 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-300 focus:border-[#6A89A7] focus:ring-[#6A89A7]/20'
                  }`}
                />
                {visaFormErrors.fullName && (
                  <p className="text-xs text-red-500 mt-1">Full name is required</p>
                )}
              </div>
              <div>
                <label className="text-sm text-[#6A89A7] mb-2 block">
                  Annual Income <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="$50,000"
                  value={visaFormData.annualIncome}
                  onChange={(e) => {
                    setVisaFormData({ ...visaFormData, annualIncome: e.target.value });
                    setVisaFormErrors({ ...visaFormErrors, annualIncome: false });
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    visaFormErrors.annualIncome 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-300 focus:border-[#6A89A7] focus:ring-[#6A89A7]/20'
                  }`}
                />
                {visaFormErrors.annualIncome && (
                  <p className="text-xs text-red-500 mt-1">Annual income is required</p>
                )}
              </div>
              <div>
                <label className="text-sm text-[#6A89A7] mb-2 block">
                  Social Security Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="XXX-XX-XXXX"
                  value={visaFormData.ssn}
                  onChange={(e) => {
                    setVisaFormData({ ...visaFormData, ssn: e.target.value });
                    setVisaFormErrors({ ...visaFormErrors, ssn: false });
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    visaFormErrors.ssn 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-300 focus:border-[#6A89A7] focus:ring-[#6A89A7]/20'
                  }`}
                />
                {visaFormErrors.ssn && (
                  <p className="text-xs text-red-500 mt-1">Social Security Number is required</p>
                )}
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 bg-gray-100 text-[#384959] px-4 py-2 rounded-lg hover:bg-gray-200 transition-all active:scale-95"
                onClick={() => {
                  setShowVisaApplicationModal(false);
                  setVisaFormErrors({ fullName: false, annualIncome: false, ssn: false });
                }}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95"
                onClick={handleVisaApplicationSubmit}
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Visa Confirmation Modal */}
      {showVisaConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-[#384959] mb-2">Application Submitted!</h3>
              <p className="text-sm text-[#6A89A7] mb-4">
                Thank you for applying for the Costco Anywhere Visa Card. We'll review your application and send you a decision within 7-10 business days.
              </p>
              <div className="bg-[#BDDDFC]/20 rounded-lg p-4 w-full mb-4">
                <div className="flex items-center gap-2 text-sm text-[#6A89A7]">
                  <Info className="w-4 h-4" />
                  <span>Check your email for confirmation details</span>
                </div>
              </div>
              <button
                className="w-full bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95"
                onClick={() => setShowVisaConfirmation(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Digital Wallet Modal */}
      {showDigitalWalletModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Phone className="w-6 h-6 text-[#6A89A7]" />
                <h3 className="text-[#384959]">Digital Wallet</h3>
              </div>
              <button
                onClick={() => {
                  setShowDigitalWalletModal(false);
                  setShowAddCardForm(false);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-[#6A89A7]">
                Add payment methods to your digital wallet for faster checkout
              </p>

              {/* Saved Cards */}
              {walletCards.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm text-[#384959]">Saved Cards</h4>
                  {walletCards.map((card, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm text-[#384959]">{card.type} •••• {card.last4}</div>
                          <div className="text-xs text-[#6A89A7]">Verified</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setWalletCards(walletCards.filter((_, i) => i !== index))}
                        className="text-red-500 text-sm hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Card Form */}
              {showAddCardForm ? (
                <div className="space-y-3 p-4 border-2 border-[#6A89A7] rounded-lg">
                  <h4 className="text-sm text-[#384959]">Add New Card</h4>
                  <div>
                    <label className="text-xs text-[#6A89A7] mb-1 block">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={newCardData.cardNumber}
                      onChange={(e) => setNewCardData({ ...newCardData, cardNumber: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-[#6A89A7] mb-1 block">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={newCardData.expiryDate}
                        onChange={(e) => setNewCardData({ ...newCardData, expiryDate: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#6A89A7] mb-1 block">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        maxLength={3}
                        value={newCardData.cvv}
                        onChange={(e) => setNewCardData({ ...newCardData, cvv: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[#6A89A7] mb-1 block">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={newCardData.cardholderName}
                      onChange={(e) => setNewCardData({ ...newCardData, cardholderName: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 transition-all"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      className="flex-1 bg-gray-100 text-[#384959] text-sm px-3 py-2 rounded-lg hover:bg-gray-200 transition-all"
                      onClick={() => {
                        setShowAddCardForm(false);
                        setNewCardData({ cardNumber: '', expiryDate: '', cvv: '', cardholderName: '' });
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="flex-1 bg-[#E8DCC2] text-[#384959] text-sm px-3 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all"
                      onClick={handleAddCardToWallet}
                    >
                      Add Card
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-[#6A89A7] transition-all flex items-center justify-between"
                    onClick={() => setShowAddCardForm(true)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm text-[#384959]">Credit/Debit Card</div>
                        <div className="text-xs text-[#6A89A7]">Visa, Mastercard, Amex</div>
                      </div>
                    </div>
                    <span className="text-[#6A89A7]">+</span>
                  </button>
                  <button className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-[#6A89A7] transition-all flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm text-[#384959]">Apple Pay</div>
                        <div className="text-xs text-[#6A89A7]">Quick and secure</div>
                      </div>
                    </div>
                    <span className="text-[#6A89A7]">+</span>
                  </button>
                </div>
              )}
            </div>
            {!showAddCardForm && (
              <div className="flex gap-3 mt-6">
                <button
                  className="flex-1 bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95"
                  onClick={() => {
                    setShowDigitalWalletModal(false);
                    setShowAddCardForm(false);
                  }}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Vacation Packages Modal */}
      {showVacationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Plane className="w-6 h-6 text-[#6A89A7]" />
                <h3 className="text-[#384959]">Vacation Packages</h3>
              </div>
              <button
                onClick={() => setShowVacationModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              {allVacationPackages.slice(0, 3).map((pkg, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-[#6A89A7] transition-all">
                  <div className="flex items-start gap-3">
                    <div className={`w-16 h-16 bg-${pkg.icon}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Plane className={`w-8 h-8 text-${pkg.icon}-600`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#384959] mb-1">{pkg.name}</h4>
                      <p className="text-sm text-[#6A89A7] mb-2">{pkg.duration} • {pkg.type}</p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#384959]">From ${pkg.price}/person</span>
                        <span className="text-xs text-green-600">Save {pkg.savings}</span>
                      </div>
                      <button
                        className="w-full bg-[#E8DCC2] text-[#384959] text-sm px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95"
                        onClick={() => handleBookPackage(pkg, 'vacation')}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="w-full mt-6 bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95"
              onClick={() => {
                setShowVacationModal(false);
                setShowAllVacationsModal(true);
              }}
            >
              View All Packages
            </button>
          </div>
        </div>
      )}

      {/* Cruise Packages Modal */}
      {showCruiseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Ship className="w-6 h-6 text-[#6A89A7]" />
                <h3 className="text-[#384959]">Cruise Packages</h3>
              </div>
              <button
                onClick={() => setShowCruiseModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              {allCruisePackages.slice(0, 3).map((pkg, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-[#6A89A7] transition-all">
                  <div className="flex items-start gap-3">
                    <div className={`w-16 h-16 bg-${pkg.icon}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Ship className={`w-8 h-8 text-${pkg.icon}-600`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#384959] mb-1">{pkg.name}</h4>
                      <p className="text-sm text-[#6A89A7] mb-2">{pkg.duration} • {pkg.type}</p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#384959]">From ${pkg.price}/person</span>
                        <span className="text-xs text-green-600">{pkg.badge}</span>
                      </div>
                      <button
                        className="w-full bg-[#E8DCC2] text-[#384959] text-sm px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95"
                        onClick={() => handleBookPackage(pkg, 'cruise')}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="w-full mt-6 bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95"
              onClick={() => {
                setShowCruiseModal(false);
                setShowAllCruisesModal(true);
              }}
            >
              View All Cruises
            </button>
          </div>
        </div>
      )}

      {/* Travel Benefits Modal */}
      {showTravelBenefitsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Info className="w-6 h-6 text-[#6A89A7]" />
                <h3 className="text-[#384959]">Member Travel Benefits</h3>
              </div>
              <button
                onClick={() => setShowTravelBenefitsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-[#6A89A7] to-[#88BDF2] rounded-lg p-4 text-white">
                <h4 className="mb-3">Exclusive Perks</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5"></div>
                    <p>Room upgrades when available</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5"></div>
                    <p>Free breakfast at select hotels</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5"></div>
                    <p>Priority boarding on cruises</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5"></div>
                    <p>24/7 travel concierge service</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5"></div>
                    <p>Exclusive member-only rates</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5"></div>
                    <p>Flexible booking and cancellation</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-[#6A89A7]">
                Executive members earn 2% rewards on Costco Travel purchases
              </p>
            </div>
            <button
              className="w-full mt-6 bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95"
              onClick={() => setShowTravelBenefitsModal(false)}
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* Same-Day Delivery Modal */}
      {showDeliveryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Truck className="w-6 h-6 text-[#6A89A7]" />
                <h3 className="text-[#384959]">Same-Day Delivery</h3>
              </div>
              <button
                onClick={() => setShowDeliveryModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-[#BDDDFC]/20 border-2 border-[#88BDF2] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-5 h-5 text-[#6A89A7]" />
                  <h4 className="text-[#384959]">Fast Delivery Available</h4>
                </div>
                <p className="text-sm text-[#6A89A7]">
                  Order groceries now and get them delivered in as little as 2 hours
                </p>
              </div>
              <div>
                <label className="text-sm text-[#6A89A7] mb-2 block">Delivery Address</label>
                <input
                  type="text"
                  placeholder="123 Main Street, Charlotte, NC"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 transition-all"
                />
              </div>
              <div>
                <label className="text-sm text-[#6A89A7] mb-2 block">Delivery Window</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 transition-all">
                  <option>Today 2-4 PM</option>
                  <option>Today 4-6 PM</option>
                  <option>Today 6-8 PM</option>
                  <option>Tomorrow 10AM-12PM</option>
                </select>
              </div>
              <p className="text-xs text-[#6A89A7]">
                *Delivery fee applies. Minimum order $35.
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 bg-gray-100 text-[#384959] px-4 py-2 rounded-lg hover:bg-gray-200 transition-all active:scale-95"
                onClick={() => setShowDeliveryModal(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95"
                onClick={() => setShowDeliveryModal(false)}
              >
                Start Shopping
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Deals Modal */}
      {showWeeklyDealsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Tag className="w-6 h-6 text-[#6A89A7]" />
                <h3 className="text-[#384959]">Weekly Grocery Deals</h3>
              </div>
              <button
                onClick={() => setShowWeeklyDealsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              <div className="border border-gray-200 rounded-lg p-4 hover:border-[#6A89A7] transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-[#384959]">Fresh Strawberries</h4>
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">Save $3</span>
                </div>
                <p className="text-sm text-[#6A89A7] mb-1">2 lbs container</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg text-[#384959]">$4.99</span>
                  <span className="text-sm text-gray-400 line-through">$7.99</span>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:border-[#6A89A7] transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-[#384959]">Organic Avocados</h4>
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">Save $2</span>
                </div>
                <p className="text-sm text-[#6A89A7] mb-1">Bag of 6</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg text-[#384959]">$6.99</span>
                  <span className="text-sm text-gray-400 line-through">$8.99</span>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:border-[#6A89A7] transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-[#384959]">Romaine Lettuce</h4>
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">Save $1.50</span>
                </div>
                <p className="text-sm text-[#6A89A7] mb-1">6-pack hearts</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg text-[#384959]">$3.49</span>
                  <span className="text-sm text-gray-400 line-through">$4.99</span>
                </div>
              </div>
            </div>
            <button
              className="w-full mt-6 bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95"
              onClick={() => setShowWeeklyDealsModal(false)}
            >
              View All Deals
            </button>
          </div>
        </div>
      )}

      {/* Organic Selection Modal */}
      {showOrganicModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Leaf className="w-6 h-6 text-green-600" />
                <h3 className="text-[#384959]">Organic Selection</h3>
              </div>
              <button
                onClick={() => setShowOrganicModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  <h4 className="text-[#384959]">Kirkland Signature Organic</h4>
                </div>
                <p className="text-sm text-[#6A89A7]">
                  Premium quality organic products at unbeatable prices
                </p>
              </div>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-3 hover:border-green-500 transition-all">
                  <div className="flex items-center gap-2 mb-1">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <h4 className="text-sm text-[#384959]">Organic Chicken Breast</h4>
                  </div>
                  <p className="text-xs text-[#6A89A7]">3 lbs • USDA Organic</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:border-green-500 transition-all">
                  <div className="flex items-center gap-2 mb-1">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <h4 className="text-sm text-[#384959]">Organic Mixed Greens</h4>
                  </div>
                  <p className="text-xs text-[#6A89A7]">1 lb container • Fresh daily</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:border-green-500 transition-all">
                  <div className="flex items-center gap-2 mb-1">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <h4 className="text-sm text-[#384959]">Organic Quinoa</h4>
                  </div>
                  <p className="text-xs text-[#6A89A7]">4 lbs • Non-GMO</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:border-green-500 transition-all">
                  <div className="flex items-center gap-2 mb-1">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <h4 className="text-sm text-[#384959]">Organic Almond Butter</h4>
                  </div>
                  <p className="text-xs text-[#6A89A7]">27 oz jar • Creamy</p>
                </div>
              </div>
            </div>
            <button
              className="w-full mt-6 bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95"
              onClick={() => setShowOrganicModal(false)}
            >
              Shop Organic
            </button>
          </div>
        </div>
      )}

      {/* All Vacation Packages Modal */}
      {showAllVacationsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Plane className="w-6 h-6 text-[#6A89A7]" />
                <h3 className="text-[#384959]">All Vacation Packages</h3>
              </div>
              <button
                onClick={() => setShowAllVacationsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {allVacationPackages.map((pkg, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-[#6A89A7] transition-all">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-12 h-12 bg-${pkg.icon}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Plane className={`w-6 h-6 text-${pkg.icon}-600`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[#384959] mb-1">{pkg.name}</h4>
                      <p className="text-xs text-[#6A89A7]">{pkg.description}</p>
                    </div>
                  </div>
                  <div className="text-sm text-[#6A89A7] mb-2">{pkg.duration} • {pkg.type}</div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#384959]">From ${pkg.price}/person</span>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">Save {pkg.savings}</span>
                  </div>
                  <button
                    className="w-full bg-[#E8DCC2] text-[#384959] text-sm px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95"
                    onClick={() => handleBookPackage(pkg, 'vacation')}
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All Cruise Packages Modal */}
      {showAllCruisesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Ship className="w-6 h-6 text-[#6A89A7]" />
                <h3 className="text-[#384959]">All Cruise Packages</h3>
              </div>
              <button
                onClick={() => setShowAllCruisesModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {allCruisePackages.map((pkg, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-[#6A89A7] transition-all">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-12 h-12 bg-${pkg.icon}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Ship className={`w-6 h-6 text-${pkg.icon}-600`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[#384959] mb-1">{pkg.name}</h4>
                      <p className="text-xs text-[#6A89A7]">{pkg.type}</p>
                    </div>
                  </div>
                  <div className="text-sm text-[#6A89A7] mb-2">{pkg.duration}</div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#384959]">From ${pkg.price}/person</span>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">{pkg.badge}</span>
                  </div>
                  <button
                    className="w-full bg-[#E8DCC2] text-[#384959] text-sm px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95"
                    onClick={() => handleBookPackage(pkg, 'cruise')}
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {selectedPackage.packageType === 'vacation' ? (
                  <Plane className="w-6 h-6 text-[#6A89A7]" />
                ) : (
                  <Ship className="w-6 h-6 text-[#6A89A7]" />
                )}
                <h3 className="text-[#384959]">Book Your Trip</h3>
              </div>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Package Summary */}
            <div className="bg-gradient-to-br from-[#6A89A7] to-[#88BDF2] rounded-lg p-4 text-white mb-4">
              <h4 className="mb-2">{selectedPackage.name}</h4>
              <p className="text-sm opacity-90 mb-2">{selectedPackage.duration}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg">${selectedPackage.price}/person</span>
                {selectedPackage.savings && (
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">Save {selectedPackage.savings}</span>
                )}
                {selectedPackage.badge && (
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">{selectedPackage.badge}</span>
                )}
              </div>
            </div>

            {/* Booking Form */}
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#6A89A7] mb-2 block">
                  Departure Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={bookingData.departureDate}
                  onChange={(e) => setBookingData({ ...bookingData, departureDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 transition-all"
                />
              </div>
              <div>
                <label className="text-sm text-[#6A89A7] mb-2 block">
                  Number of Travelers <span className="text-red-500">*</span>
                </label>
                <select
                  value={bookingData.travelers}
                  onChange={(e) => setBookingData({ ...bookingData, travelers: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 transition-all"
                >
                  <option value="1">1 Traveler</option>
                  <option value="2">2 Travelers</option>
                  <option value="3">3 Travelers</option>
                  <option value="4">4 Travelers</option>
                  <option value="5">5+ Travelers</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-[#6A89A7] mb-2 block">Special Requests (Optional)</label>
                <textarea
                  value={bookingData.specialRequests}
                  onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                  placeholder="Room preferences, dietary restrictions, etc."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 transition-all resize-none"
                />
              </div>

              {/* Pricing Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-[#6A89A7]">Price per person</span>
                  <span className="text-sm text-[#384959]">${selectedPackage.price}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-[#6A89A7]">Travelers</span>
                  <span className="text-sm text-[#384959]">×{bookingData.travelers}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-[#384959]">Total</span>
                    <span className="text-lg text-[#384959]">
                      ${selectedPackage.price * parseInt(bookingData.travelers)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 bg-gray-100 text-[#384959] px-4 py-2 rounded-lg hover:bg-gray-200 transition-all active:scale-95"
                onClick={() => setShowBookingModal(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95"
                onClick={handleBookingSubmit}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Confirmation Modal */}
      {showBookingConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-[#384959] mb-2">Booking Confirmed!</h3>
              <p className="text-sm text-[#6A89A7] mb-4">
                Your travel package has been successfully booked. A confirmation email with all the details has been sent to your registered email address.
              </p>
              <div className="bg-[#BDDDFC]/20 rounded-lg p-4 w-full mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6A89A7]">Confirmation #</span>
                    <span className="text-[#384959]">CT{Math.floor(Math.random() * 1000000)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6A89A7]">Booking Date</span>
                    <span className="text-[#384959]">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 w-full mb-4">
                <p className="text-xs text-yellow-800">
                  A Costco Travel specialist will contact you within 24 hours to finalize your booking details.
                </p>
              </div>
              <button
                className="w-full bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all active:scale-95"
                onClick={() => setShowBookingConfirmation(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Membership Modals */}
      {/* Gold Star Benefits Modal */}
      {showGoldStarBenefits && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#384959]">Gold Star Membership Benefits</h3>
              <button onClick={() => setShowGoldStarBenefits(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-3">
              <div className="bg-[#BDDDFC]/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <BadgeCheck className="w-5 h-5 text-[#6A89A7]" />
                  <span className="text-[#384959]">Full Warehouse Access</span>
                </div>
                <p className="text-sm text-[#6A89A7]">Shop at any Costco warehouse worldwide</p>
              </div>
              <div className="bg-[#BDDDFC]/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="w-5 h-5 text-[#6A89A7]" />
                  <span className="text-[#384959]">Exclusive Member Pricing</span>
                </div>
                <p className="text-sm text-[#6A89A7]">Save on quality merchandise and services</p>
              </div>
              <div className="bg-[#BDDDFC]/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <ShoppingBag className="w-5 h-5 text-[#6A89A7]" />
                  <span className="text-[#384959]">Costco.com Shopping</span>
                </div>
                <p className="text-sm text-[#6A89A7]">Online ordering with special member-only items</p>
              </div>
              <div className="bg-[#BDDDFC]/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-[#6A89A7]" />
                  <span className="text-[#384959]">Free Household Card</span>
                </div>
                <p className="text-sm text-[#6A89A7]">One complimentary card for household member</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="text-center mb-3">
                <span className="text-2xl text-[#384959]">$60</span>
                <span className="text-[#6A89A7]">/year</span>
              </div>
              <button className="w-full bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all" onClick={() => setShowGoldStarBenefits(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Executive Benefits Modal */}
      {showExecutiveBenefits && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#384959]">Executive Membership Benefits</h3>
              <button onClick={() => setShowExecutiveBenefits(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-3">
              <div className="bg-gradient-to-br from-[#6A89A7] to-[#88BDF2] rounded-lg p-4 text-white mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-6 h-6" />
                  <span className="text-lg">Premium Membership</span>
                </div>
                <p className="text-sm opacity-90">All Gold Star benefits PLUS exclusive rewards</p>
              </div>
              <div className="bg-[#BDDDFC]/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="w-5 h-5 text-[#6A89A7]" />
                  <span className="text-[#384959]">2% Annual Reward</span>
                </div>
                <p className="text-sm text-[#6A89A7]">Earn 2% back on eligible Costco purchases (up to $1,250/year)</p>
              </div>
              <div className="bg-[#BDDDFC]/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-[#6A89A7]" />
                  <span className="text-[#384959]">Extra Travel Savings</span>
                </div>
                <p className="text-sm text-[#6A89A7]">Additional discounts on Costco Travel packages</p>
              </div>
              <div className="bg-[#BDDDFC]/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-5 h-5 text-[#6A89A7]" />
                  <span className="text-[#384959]">Member Services</span>
                </div>
                <p className="text-sm text-[#6A89A7]">Dedicated executive member support line</p>
              </div>
              <div className="bg-[#BDDDFC]/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-[#6A89A7]" />
                  <span className="text-[#384959]">Special Offers</span>
                </div>
                <p className="text-sm text-[#6A89A7]">Exclusive coupons and early access to sales</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="text-center mb-3">
                <span className="text-2xl text-[#384959]">$120</span>
                <span className="text-[#6A89A7]">/year</span>
              </div>
              <button className="w-full bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all" onClick={() => setShowExecutiveBenefits(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Household Card Modal */}
      {showHouseholdModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#384959]">Add Household Cardholder</h3>
              <button onClick={() => setShowHouseholdModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#6A89A7] mb-2 block">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={householdCardData.name}
                  onChange={(e) => setHouseholdCardData({ ...householdCardData, name: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 transition-all"
                />
              </div>
              <div>
                <label className="text-sm text-[#6A89A7] mb-2 block">Relationship</label>
                <select
                  value={householdCardData.relationship}
                  onChange={(e) => setHouseholdCardData({ ...householdCardData, relationship: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 transition-all"
                >
                  <option value="spouse">Spouse</option>
                  <option value="partner">Domestic Partner</option>
                  <option value="parent">Parent</option>
                  <option value="sibling">Sibling</option>
                </select>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  The household cardholder must be 18 years or older and live at the same address as the primary member.
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 bg-gray-100 text-[#384959] px-4 py-2 rounded-lg hover:bg-gray-200 transition-all"
                onClick={() => setShowHouseholdModal(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all"
                onClick={() => {
                  if (householdCardData.name) {
                    setShowHouseholdModal(false);
                    setHouseholdCardData({ name: '', relationship: 'spouse' });
                  }
                }}
              >
                Add Cardholder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Optical Modals */}
      {/* Eye Exam Modal */}
      {showEyeExamModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Eye className="w-6 h-6 text-[#6A89A7]" />
                <h3 className="text-[#384959]">Schedule Eye Exam</h3>
              </div>
              <button onClick={() => setShowEyeExamModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#6A89A7] mb-2 block">Location</label>
                <select
                  value={eyeExamData.location}
                  onChange={(e) => setEyeExamData({ ...eyeExamData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20"
                >
                  <option>Charlotte Costco</option>
                  <option>Charlotte East</option>
                  <option>Charlotte North</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-[#6A89A7] mb-2 block">Preferred Date <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  value={eyeExamData.date}
                  onChange={(e) => {
                    setEyeExamData({ ...eyeExamData, date: e.target.value });
                    setEyeExamErrors({ ...eyeExamErrors, date: false });
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    eyeExamErrors.date 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-300 focus:border-[#6A89A7] focus:ring-[#6A89A7]/20'
                  }`}
                />
                {eyeExamErrors.date && (
                  <p className="text-xs text-red-500 mt-1">Please select a date</p>
                )}
              </div>
              <div>
                <label className="text-sm text-[#6A89A7] mb-2 block">Preferred Time <span className="text-red-500">*</span></label>
                <select
                  value={eyeExamData.time}
                  onChange={(e) => {
                    setEyeExamData({ ...eyeExamData, time: e.target.value });
                    setEyeExamErrors({ ...eyeExamErrors, time: false });
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    eyeExamErrors.time 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-300 focus:border-[#6A89A7] focus:ring-[#6A89A7]/20'
                  }`}
                >
                  <option value="">Select time</option>
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>1:00 PM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:00 PM</option>
                </select>
                {eyeExamErrors.time && (
                  <p className="text-xs text-red-500 mt-1">Please select a time</p>
                )}
              </div>
              <div className="bg-[#BDDDFC]/20 rounded-lg p-3">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-[#6A89A7]">Exam Fee</span>
                  <span className="text-[#384959]">$79</span>
                </div>
                <p className="text-xs text-[#6A89A7]">Comprehensive eye health examination by licensed optometrist</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 bg-gray-100 text-[#384959] px-4 py-2 rounded-lg hover:bg-gray-200 transition-all"
                onClick={() => setShowEyeExamModal(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all"
                onClick={() => {
                  const errors = {
                    date: !eyeExamData.date,
                    time: !eyeExamData.time,
                  };
                  setEyeExamErrors(errors);
                  
                  if (!errors.date && !errors.time) {
                    if (isGuest) {
                      setShowEyeExamModal(false);
                      onGuestAction();
                      return;
                    }
                    setShowEyeExamModal(false);
                    setShowEyeExamConfirmation(true);
                  }
                }}
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Designer Frames Modal */}
      {showFramesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#384959]">Designer Frames</h3>
              <button onClick={() => setShowFramesModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { brand: 'Ray-Ban', model: 'Aviator Classic', price: 159, image: 'https://images.unsplash.com/photo-1743038561517-52cd6ea2533b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGV5ZWdsYXNzZXMlMjBzdW5nbGFzc2VzfGVufDF8fHx8MTc2NDcyNjQwOXww&ixlib=rb-4.1.0&q=80&w=400' },
                { brand: 'Oakley', model: 'Holbrook', price: 189, image: 'https://images.unsplash.com/photo-1743038561517-52cd6ea2533b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGV5ZWdsYXNzZXMlMjBzdW5nbGFzc2VzfGVufDF8fHx8MTc2NDcyNjQwOXww&ixlib=rb-4.1.0&q=80&w=400' },
                { brand: 'Coach', model: 'HC8279', price: 149, image: 'https://images.unsplash.com/photo-1743038561517-52cd6ea2533b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGV5ZWdsYXNzZXMlMjBzdW5nbGFzc2VzfGVufDF8fHx8MTc2NDcyNjQwOXww&ixlib=rb-4.1.0&q=80&w=400' },
                { brand: 'Prada', model: 'PR 17WS', price: 299, image: 'https://images.unsplash.com/photo-1743038561517-52cd6ea2533b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGV5ZWdsYXNzZXMlMjBzdW5nbGFzc2VzfGVufDF8fHx8MTc2NDcyNjQwOXww&ixlib=rb-4.1.0&q=80&w=400' },
                { brand: 'Versace', model: 'VE4361', price: 279, image: 'https://images.unsplash.com/photo-1743038561517-52cd6ea2533b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGV5ZWdsYXNzZXMlMjBzdW5nbGFzc2VzfGVufDF8fHx8MTc2NDcyNjQwOXww&ixlib=rb-4.1.0&q=80&w=400' },
                { brand: 'Burberry', model: 'BE4321', price: 249, image: 'https://images.unsplash.com/photo-1743038561517-52cd6ea2533b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGV5ZWdsYXNzZXMlMjBzdW5nbGFzc2VzfGVufDF8fHx8MTc2NDcyNjQwOXww&ixlib=rb-4.1.0&q=80&w=400' },
              ].map((frame, idx) => (
                <div 
                  key={idx} 
                  className="border border-gray-200 rounded-lg p-4 hover:border-[#6A89A7] transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedFrame(frame);
                    setShowFramesModal(false);
                    setShowFrameDetail(true);
                  }}
                >
                  <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
                    <ImageWithFallback 
                      src={frame.image}
                      alt={`${frame.brand} ${frame.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-[#384959] mb-1">{frame.brand}</h4>
                  <p className="text-xs text-[#6A89A7] mb-1">{frame.model}</p>
                  <p className="text-sm text-[#6A89A7]">${frame.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contact Lenses Modal */}
      {showContactsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#384959]">Contact Lenses</h3>
              <button onClick={() => setShowContactsModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Acuvue Oasys', price: 54.99, desc: '24-pack, daily wear', qty: 1, image: 'https://images.unsplash.com/photo-1712431182145-dddb1a08a826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwbGVucyUyMGNhc2V8ZW58MXx8fHwxNzY0NzI2NDA5fDA&ixlib=rb-4.1.0&q=80&w=200' },
                { name: 'Dailies Total1', price: 69.99, desc: '90-pack, daily disposable', qty: 1, image: 'https://images.unsplash.com/photo-1712431182145-dddb1a08a826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwbGVucyUyMGNhc2V8ZW58MXx8fHwxNzY0NzI2NDA5fDA&ixlib=rb-4.1.0&q=80&w=200' },
                { name: 'Biofinity', price: 44.99, desc: '6-pack, monthly', qty: 1, image: 'https://images.unsplash.com/photo-1712431182145-dddb1a08a826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwbGVucyUyMGNhc2V8ZW58MXx8fHwxNzY0NzI2NDA5fDA&ixlib=rb-4.1.0&q=80&w=200' },
                { name: 'Air Optix', price: 49.99, desc: '6-pack, monthly', qty: 1, image: 'https://images.unsplash.com/photo-1712431182145-dddb1a08a826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwbGVucyUyMGNhc2V8ZW58MXx8fHwxNzY0NzI2NDA5fDA&ixlib=rb-4.1.0&q=80&w=200' },
                { name: 'Proclear', price: 39.99, desc: '6-pack, monthly', qty: 1, image: 'https://images.unsplash.com/photo-1712431182145-dddb1a08a826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwbGVucyUyMGNhc2V8ZW58MXx8fHwxNzY0NzI2NDA5fDA&ixlib=rb-4.1.0&q=80&w=200' },
              ].map((contact, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-[#6A89A7] transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback 
                        src={contact.image}
                        alt={contact.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#384959] mb-1">{contact.name}</h4>
                      <p className="text-sm text-[#6A89A7]">{contact.desc}</p>
                      <span className="text-[#6A89A7]">${contact.price}</span>
                    </div>
                  </div>
                  <button 
                    className="w-full bg-[#E8DCC2] text-[#384959] text-sm px-3 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all"
                    onClick={() => {
                      if (isGuest) {
                        onGuestAction();
                        return;
                      }
                      setContactsCart([...contactsCart, contact]);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
            {contactsCart.length > 0 && (
              <div className="mt-6 p-4 bg-[#BDDDFC]/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#384959]">Cart ({contactsCart.length} items)</span>
                  <button 
                    className="text-sm text-[#6A89A7] hover:text-[#384959]"
                    onClick={() => setShowContactsCart(true)}
                  >
                    View Cart
                  </button>
                </div>
              </div>
            )}
            <button
              className="w-full mt-4 bg-[#6A89A7] text-white px-4 py-2 rounded-lg hover:bg-[#5a7997] transition-all"
              onClick={() => setShowContactsModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Pharmacy Modals */}
      {/* Prescription Refill Modal */}
      {showRefillModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PillBottle className="w-6 h-6 text-[#6A89A7]" />
                <h3 className="text-[#384959]">Prescription Refill</h3>
              </div>
              <button onClick={() => setShowRefillModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#6A89A7] mb-2 block">Prescription Number <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={refillData.prescriptionNumber}
                  onChange={(e) => {
                    setRefillData({ ...refillData, prescriptionNumber: e.target.value });
                    if (refillErrors.prescriptionNumber) {
                      setRefillErrors({ ...refillErrors, prescriptionNumber: false });
                    }
                  }}
                  placeholder="Enter Rx number"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 ${
                    refillErrors.prescriptionNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {refillErrors.prescriptionNumber && (
                  <p className="text-xs text-red-500 mt-1">Prescription number is required</p>
                )}
              </div>
              <div>
                <label className="text-sm text-[#6A89A7] mb-2 block">Pharmacy Phone (Optional)</label>
                <input
                  type="tel"
                  value={refillData.pharmacyPhone}
                  onChange={(e) => setRefillData({ ...refillData, pharmacyPhone: e.target.value })}
                  placeholder="(704) 555-0123"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20"
                />
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  Your prescription will be ready for pickup in 1-2 hours. We'll send you a text when it's ready.
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 bg-gray-100 text-[#384959] px-4 py-2 rounded-lg hover:bg-gray-200 transition-all"
                onClick={() => {
                  setShowRefillModal(false);
                  setRefillErrors({ prescriptionNumber: false });
                }}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all"
                onClick={handleRefillSubmit}
              >
                Submit Refill
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Immunizations Modal */}
      {showImmunizationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-[#6A89A7]" />
                <h3 className="text-[#384959]">Schedule Immunization</h3>
              </div>
              <button onClick={() => {
                setShowImmunizationModal(false);
                setImmunizationErrors({ type: false, date: false, time: false });
              }} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#6A89A7] mb-2 block">Select Immunization <span className="text-red-500">*</span></label>
                <div className="space-y-2">
                  {[
                    { name: 'Flu Shot', price: 'Free with insurance', desc: 'Annual influenza vaccine' },
                    { name: 'COVID-19 Vaccine', price: 'Free', desc: 'Updated booster available' },
                    { name: 'Shingles Vaccine', price: '$200', desc: 'Recommended for ages 50+' },
                    { name: 'Tetanus (Tdap)', price: '$50', desc: 'Tetanus, diphtheria, pertussis' },
                    { name: 'Pneumonia Vaccine', price: 'Free with insurance', desc: 'Pneumococcal vaccine' },
                  ].map((vaccine) => (
                    <div
                      key={vaccine.name}
                      onClick={() => {
                        setImmunizationData({ ...immunizationData, type: vaccine.name });
                        if (immunizationErrors.type) {
                          setImmunizationErrors({ ...immunizationErrors, type: false });
                        }
                      }}
                      className={`border rounded-lg p-3 hover:border-[#6A89A7] transition-all cursor-pointer ${
                        immunizationData.type === vaccine.name ? 'border-[#6A89A7] bg-[#BDDDFC]/10' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-[#384959] text-sm">{vaccine.name}</h4>
                        <span className={`text-xs ${vaccine.price.includes('Free') ? 'text-green-600' : 'text-[#6A89A7]'}`}>{vaccine.price}</span>
                      </div>
                      <p className="text-xs text-[#6A89A7]">{vaccine.desc}</p>
                    </div>
                  ))}
                </div>
                {immunizationErrors.type && (
                  <p className="text-xs text-red-500 mt-1">Please select an immunization type</p>
                )}
              </div>
              <div>
                <label className="text-sm text-[#6A89A7] mb-2 block">Appointment Date <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  value={immunizationData.date}
                  onChange={(e) => {
                    setImmunizationData({ ...immunizationData, date: e.target.value });
                    if (immunizationErrors.date) {
                      setImmunizationErrors({ ...immunizationErrors, date: false });
                    }
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 ${
                    immunizationErrors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {immunizationErrors.date && (
                  <p className="text-xs text-red-500 mt-1">Date is required</p>
                )}
              </div>
              <div>
                <label className="text-sm text-[#6A89A7] mb-2 block">Preferred Time <span className="text-red-500">*</span></label>
                <select
                  value={immunizationData.time}
                  onChange={(e) => {
                    setImmunizationData({ ...immunizationData, time: e.target.value });
                    if (immunizationErrors.time) {
                      setImmunizationErrors({ ...immunizationErrors, time: false });
                    }
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 ${
                    immunizationErrors.time ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select time</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                </select>
                {immunizationErrors.time && (
                  <p className="text-xs text-red-500 mt-1">Time is required</p>
                )}
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs text-green-800">
                  No appointment needed for most vaccines. Walk-ins welcome during pharmacy hours.
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 bg-gray-100 text-[#384959] px-4 py-2 rounded-lg hover:bg-gray-200 transition-all"
                onClick={() => {
                  setShowImmunizationModal(false);
                  setImmunizationErrors({ type: false, date: false, time: false });
                }}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all"
                onClick={handleImmunizationSubmit}
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Prescription Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-6 h-6 text-[#6A89A7]" />
                <h3 className="text-[#384959]">Transfer Prescription</h3>
              </div>
              <button onClick={() => {
                setShowTransferModal(false);
                setTransferErrors({ currentPharmacy: false, pharmacyPhone: false, prescriptionNumber: false });
              }} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#6A89A7] mb-2 block">Current Pharmacy Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={transferData.currentPharmacy}
                  onChange={(e) => {
                    setTransferData({ ...transferData, currentPharmacy: e.target.value });
                    if (transferErrors.currentPharmacy) {
                      setTransferErrors({ ...transferErrors, currentPharmacy: false });
                    }
                  }}
                  placeholder="e.g., CVS Pharmacy"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 ${
                    transferErrors.currentPharmacy ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {transferErrors.currentPharmacy && (
                  <p className="text-xs text-red-500 mt-1">Pharmacy name is required</p>
                )}
              </div>
              <div>
                <label className="text-sm text-[#6A89A7] mb-2 block">Pharmacy Phone Number <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  value={transferData.pharmacyPhone}
                  onChange={(e) => {
                    setTransferData({ ...transferData, pharmacyPhone: e.target.value });
                    if (transferErrors.pharmacyPhone) {
                      setTransferErrors({ ...transferErrors, pharmacyPhone: false });
                    }
                  }}
                  placeholder="(704) 555-0123"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 ${
                    transferErrors.pharmacyPhone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {transferErrors.pharmacyPhone && (
                  <p className="text-xs text-red-500 mt-1">Phone number is required</p>
                )}
              </div>
              <div>
                <label className="text-sm text-[#6A89A7] mb-2 block">Prescription Number <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={transferData.prescriptionNumber}
                  onChange={(e) => {
                    setTransferData({ ...transferData, prescriptionNumber: e.target.value });
                    if (transferErrors.prescriptionNumber) {
                      setTransferErrors({ ...transferErrors, prescriptionNumber: false });
                    }
                  }}
                  placeholder="Enter Rx number"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 ${
                    transferErrors.prescriptionNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {transferErrors.prescriptionNumber && (
                  <p className="text-xs text-red-500 mt-1">Prescription number is required</p>
                )}
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs text-green-800">
                  We'll contact your current pharmacy to transfer your prescription. This usually takes 1-2 business days.
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 bg-gray-100 text-[#384959] px-4 py-2 rounded-lg hover:bg-gray-200 transition-all"
                onClick={() => {
                  setShowTransferModal(false);
                  setTransferErrors({ currentPharmacy: false, pharmacyPhone: false, prescriptionNumber: false });
                }}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all"
                onClick={handleTransferSubmit}
              >
                Request Transfer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Food Court Menu Modal */}
      {showFoodCourtMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="w-6 h-6 text-[#6A89A7]" />
                <h3 className="text-[#384959]">Food Court Menu</h3>
              </div>
              <button onClick={() => setShowFoodCourtMenu(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="bg-[#BDDDFC]/20 rounded-lg p-3 mb-4">
              <p className="text-xs text-[#384959]">
                <Clock className="w-4 h-4 inline mr-1" />
                Order ahead for in-store pickup. Skip the line!
              </p>
            </div>
            <div className="space-y-3">
              {foodCourtMenuItems.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#6A89A7] transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-[#384959] mb-1">{item.name}</h4>
                      <p className="text-xs text-[#6A89A7]">{item.desc}</p>
                    </div>
                    <span className="text-[#384959] ml-3">${item.price.toFixed(2)}</span>
                  </div>
                  {!isGuest && (
                    <button 
                      className="w-full bg-[#E8DCC2] text-[#384959] text-sm px-3 py-1.5 rounded-lg hover:bg-[#d4c8ad] transition-all"
                      onClick={() => setFoodCourtCart([...foodCourtCart, item])}
                    >
                      Add to Order
                    </button>
                  )}
                </div>
              ))}
            </div>
            {foodCourtCart.length > 0 && (
              <div className="mt-4 p-4 bg-[#BDDDFC]/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#384959]">Cart ({foodCourtCart.length} items)</span>
                  <span className="text-[#384959]">${foodCourtCart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
                </div>
                <button 
                  className="w-full bg-[#6A89A7] text-white px-4 py-2 rounded-lg hover:bg-[#5a7997] transition-all"
                  onClick={() => {
                    setShowFoodCourtMenu(false);
                    setShowFoodCourtCart(true);
                  }}
                >
                  Review Order
                </button>
              </div>
            )}
            <button
              className="w-full mt-4 bg-gray-100 text-[#384959] px-4 py-2 rounded-lg hover:bg-gray-200 transition-all"
              onClick={() => setShowFoodCourtMenu(false)}
            >
              Close Menu
            </button>
          </div>
        </div>
      )}

      {/* Delivery Modals */}
      {/* Same-Day Delivery Modal */}
      {showSameDayDelivery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Truck className="w-6 h-6 text-[#6A89A7]" />
                <h3 className="text-[#384959]">Same-Day Delivery</h3>
              </div>
              <button onClick={() => setShowSameDayDelivery(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-[#6A89A7] to-[#88BDF2] rounded-lg p-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5" />
                  <span>Fast Delivery</span>
                </div>
                <p className="text-sm opacity-90">Get your order delivered in as fast as 2 hours</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2">
                  <span className="text-[#6A89A7]">Delivery Fee</span>
                  <span className="text-[#384959]">$10</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-[#6A89A7]">Minimum Order</span>
                  <span className="text-[#384959]">$35</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-[#6A89A7]">Delivery Window</span>
                  <span className="text-[#384959]">2 hours</span>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  Available 7 days a week, 9 AM - 9 PM. Select eligible items at checkout.
                </p>
              </div>
            </div>
            <button
              className="w-full mt-6 bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all"
              onClick={() => setShowSameDayDelivery(false)}
            >
              Start Shopping
            </button>
          </div>
        </div>
      )}

      {/* 2-Day Delivery Modal */}
      {showTwoDayDelivery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Package className="w-6 h-6 text-[#6A89A7]" />
                <h3 className="text-[#384959]">2-Day Delivery</h3>
              </div>
              <button onClick={() => setShowTwoDayDelivery(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-[#9FB8A3] to-[#BDDDFC] rounded-lg p-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="w-5 h-5" />
                  <span>Free Shipping</span>
                </div>
                <p className="text-sm opacity-90">On orders over $75</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2">
                  <span className="text-[#6A89A7]">Delivery Fee</span>
                  <span className="text-green-600">FREE (over $75)</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-[#6A89A7]">Under $75</span>
                  <span className="text-[#384959]">$3.99 shipping</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-[#6A89A7]">Delivery Time</span>
                  <span className="text-[#384959]">2 business days</span>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs text-green-800">
                  Most items ship within 24 hours. Track your order anytime with our tracking system.
                </p>
              </div>
            </div>
            <button
              className="w-full mt-6 bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all"
              onClick={() => setShowTwoDayDelivery(false)}
            >
              Start Shopping
            </button>
          </div>
        </div>
      )}

      {/* Track Order Modal */}
      {showTrackOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-6 h-6 text-[#6A89A7]" />
                <h3 className="text-[#384959]">Track Your Order</h3>
              </div>
              <button onClick={() => setShowTrackOrder(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#6A89A7] mb-2 block">Order Number</label>
                <input
                  type="text"
                  placeholder="Enter order number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20"
                />
              </div>
              <div className="bg-[#BDDDFC]/20 rounded-lg p-4">
                <h4 className="text-[#384959] mb-3">Recent Orders</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <div>
                      <div className="text-sm text-[#384959]">#CT789456</div>
                      <div className="text-xs text-[#6A89A7]">Arriving today by 6 PM</div>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-[#384959]">#CT654321</div>
                      <div className="text-xs text-[#6A89A7]">Delivered Dec 1</div>
                    </div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="w-full mt-6 bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all"
              onClick={() => setShowTrackOrder(false)}
            >
              Track Order
            </button>
          </div>
        </div>
      )}

      {/* Eye Exam Confirmation Modal */}
      {showEyeExamConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-[#384959] mb-2">Appointment Confirmed!</h3>
              <p className="text-sm text-[#6A89A7] mb-4">
                Your eye exam has been successfully scheduled.
              </p>
              <div className="bg-[#BDDDFC]/20 rounded-lg p-4 w-full mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6A89A7]">Location:</span>
                    <span className="text-[#384959]">{eyeExamData.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6A89A7]">Date:</span>
                    <span className="text-[#384959]">{new Date(eyeExamData.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6A89A7]">Time:</span>
                    <span className="text-[#384959]">{eyeExamData.time}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="text-[#6A89A7]">Exam Fee:</span>
                    <span className="text-[#384959]">$79.00</span>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 w-full mb-4">
                <p className="text-xs text-blue-800">
                  A confirmation email has been sent. Please arrive 10 minutes early.
                </p>
              </div>
              <button
                className="w-full bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all"
                onClick={() => {
                  setShowEyeExamConfirmation(false);
                  setEyeExamData({ date: '', time: '', location: 'Charlotte Costco' });
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Frame Detail Modal */}
      {showFrameDetail && selectedFrame && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#384959]">{selectedFrame.brand} {selectedFrame.model}</h3>
              <button onClick={() => setShowFrameDetail(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
              <ImageWithFallback 
                src={selectedFrame.image}
                alt={`${selectedFrame.brand} ${selectedFrame.model}`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mb-4">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl text-[#384959]">${selectedFrame.price}</span>
                <span className="text-sm text-[#6A89A7]">frames only</span>
              </div>
              <p className="text-sm text-[#6A89A7]">Lenses additional - starting at $79</p>
            </div>

            <div className="mb-6 pb-6 border-b border-gray-200">
              <h4 className="text-[#384959] mb-3">Product Details</h4>
              <ul className="space-y-2 text-sm text-[#6A89A7]">
                <li>• Premium designer frames</li>
                <li>• UV protection</li>
                <li>• 1-year warranty included</li>
                <li>• Free adjustments for life</li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-[#384959] mb-3">Upload Prescription</h4>
              <p className="text-sm text-[#6A89A7] mb-3">Upload a photo of your prescription or have one on file</p>
              
              {framePrescriptionImage ? (
                <div className="relative">
                  <div className="border-2 border-green-500 rounded-lg p-3 bg-green-50">
                    <div className="flex items-center gap-2 text-sm text-green-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Prescription uploaded successfully
                    </div>
                  </div>
                  <button
                    onClick={() => setFramePrescriptionImage(null)}
                    className="absolute top-2 right-2 text-green-700 hover:text-green-900"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div>
                  <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center cursor-pointer hover:border-[#6A89A7] transition-all">
                    <Upload className="w-8 h-8 text-[#6A89A7] mb-2" />
                    <span className="text-sm text-[#6A89A7]">Click to upload prescription</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFramePrescriptionImage('uploaded');
                        }
                      }}
                    />
                  </label>
                  <p className="text-xs text-[#6A89A7] mt-2 text-center">JPG, PNG or PDF (max 5MB)</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <button
                className={`w-full px-4 py-3 rounded-lg transition-all ${
                  framePrescriptionImage
                    ? 'bg-[#E8DCC2] text-[#384959] hover:bg-[#d4c8ad]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!framePrescriptionImage}
                onClick={() => {
                  if (framePrescriptionImage) {
                    if (isGuest) {
                      setShowFrameDetail(false);
                      onGuestAction();
                      return;
                    }
                    setShowFrameDetail(false);
                    setShowFrameConfirmation(true);
                  }
                }}
              >
                Add to Cart
              </button>
              <button
                className="w-full bg-gray-100 text-[#384959] px-4 py-3 rounded-lg hover:bg-gray-200 transition-all"
                onClick={() => setShowFrameDetail(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Frame Order Confirmation Modal */}
      {showFrameConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-[#384959] mb-2">Added to Cart!</h3>
              <p className="text-sm text-[#6A89A7] mb-4">
                Your {selectedFrame?.brand} frames have been added to your cart.
              </p>
              <div className="bg-[#BDDDFC]/20 rounded-lg p-4 w-full mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6A89A7]">Frames:</span>
                    <span className="text-[#384959]">${selectedFrame?.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6A89A7]">Prescription Status:</span>
                    <span className="text-green-600 text-xs">✓ Uploaded</span>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 w-full mb-4">
                <p className="text-xs text-blue-800">
                  Your glasses will be ready for pickup in 7-10 business days. We'll contact you when they're ready.
                </p>
              </div>
              <button
                className="w-full bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all"
                onClick={() => {
                  setShowFrameConfirmation(false);
                  setSelectedFrame(null);
                  setFramePrescriptionImage(null);
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contacts Cart Modal */}
      {showContactsCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#384959]">Contact Lenses Cart</h3>
              <button onClick={() => setShowContactsCart(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            {contactsCart.length === 0 ? (
              <div className="text-center py-8 text-[#6A89A7]">
                <p>Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {contactsCart.map((item, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm text-[#384959]">{item.name}</h4>
                        <button
                          onClick={() => {
                            setContactsCart(contactsCart.filter((_, i) => i !== idx));
                          }}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#6A89A7]">{item.desc}</span>
                        <span className="text-sm text-[#384959]">${item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#6A89A7]">Subtotal:</span>
                    <span className="text-[#384959]">
                      ${contactsCart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#6A89A7]">Tax (8%):</span>
                    <span className="text-[#384959]">
                      ${(contactsCart.reduce((sum, item) => sum + item.price, 0) * 0.08).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="text-[#384959]">Total:</span>
                    <span className="text-[#6A89A7]">
                      ${(contactsCart.reduce((sum, item) => sum + item.price, 0) * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    className="w-full bg-[#E8DCC2] text-[#384959] px-4 py-3 rounded-lg hover:bg-[#d4c8ad] transition-all"
                    onClick={() => {
                      if (isGuest) {
                        setShowContactsCart(false);
                        setShowContactsModal(false);
                        onGuestAction();
                        return;
                      }
                      const total = contactsCart.reduce((sum, item) => sum + item.price, 0) * 1.08;
                      setContactsOrderTotal(total);
                      setShowContactsCart(false);
                      setShowContactsModal(false);
                      setShowContactsConfirmation(true);
                    }}
                  >
                    Checkout
                  </button>
                  <button
                    className="w-full bg-gray-100 text-[#384959] px-4 py-2 rounded-lg hover:bg-gray-200 transition-all"
                    onClick={() => setShowContactsCart(false)}
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Contacts Order Confirmation Modal */}
      {showContactsConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-[#384959] mb-2">Order Confirmed!</h3>
              <p className="text-[#6A89A7] text-sm mb-4">
                Your contact lenses order has been placed successfully.
              </p>
              <div className="bg-[#BDDDFC]/20 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#6A89A7]">Order Total:</span>
                  <span className="text-[#384959]">${contactsOrderTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6A89A7]">Items:</span>
                  <span className="text-[#384959]">{contactsCart.length}</span>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  Your contact lenses will be ready for pickup in 2-3 business days. We'll send you a notification when they're ready.
                </p>
              </div>
              <button
                className="w-full mt-4 bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all"
                onClick={() => {
                  setShowContactsConfirmation(false);
                  setContactsCart([]);
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pharmacy Confirmation Modals */}
      {showRefillConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-[#384959] mb-2">Refill Submitted!</h3>
              <p className="text-sm text-[#6A89A7] mb-4">
                Your prescription refill request has been received.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 w-full mb-4">
                <p className="text-xs text-blue-800">
                  Your prescription will be ready for pickup in 1-2 hours. We'll send you a text when it's ready.
                </p>
              </div>
              <button
                className="w-full bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all"
                onClick={() => setShowRefillConfirmation(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {showImmunizationConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-[#384959] mb-2">Appointment Scheduled!</h3>
              <p className="text-sm text-[#6A89A7] mb-4">
                Your immunization appointment has been confirmed.
              </p>
              <div className="bg-[#BDDDFC]/20 rounded-lg p-4 w-full mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6A89A7]">Type:</span>
                    <span className="text-[#384959]">{immunizationData.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6A89A7]">Date:</span>
                    <span className="text-[#384959]">{immunizationData.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6A89A7]">Time:</span>
                    <span className="text-[#384959]">{immunizationData.time}</span>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 w-full mb-4">
                <p className="text-xs text-green-800">
                  A confirmation email has been sent. No appointment needed - walk-ins welcome!
                </p>
              </div>
              <button
                className="w-full bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all"
                onClick={() => setShowImmunizationConfirmation(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {showTransferConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-[#384959] mb-2">Transfer Requested!</h3>
              <p className="text-sm text-[#6A89A7] mb-4">
                We'll contact your pharmacy to transfer your prescription.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 w-full mb-4">
                <p className="text-xs text-blue-800">
                  This usually takes 1-2 business days. We'll notify you when your prescription is ready.
                </p>
              </div>
              <button
                className="w-full bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all"
                onClick={() => setShowTransferConfirmation(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Food Court Cart & Confirmation */}
      {showFoodCourtCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#384959]">Review Your Order</h3>
              <button onClick={() => setShowFoodCourtCart(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-3 mb-4">
              {foodCourtCart.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <p className="text-[#384959]">{item.name}</p>
                    <p className="text-xs text-[#6A89A7]">{item.desc}</p>
                  </div>
                  <span className="text-[#384959]">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-3 mb-4">
              <div className="flex items-center justify-between text-lg">
                <span className="text-[#384959]">Total</span>
                <span className="text-[#384959]">${foodCourtCart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="text-sm text-[#6A89A7] mb-2 block">Pickup Time <span className="text-red-500">*</span></label>
              <select
                value={foodCourtPickupTime}
                onChange={(e) => setFoodCourtPickupTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20"
              >
                <option value="">Select pickup time</option>
                <option value="ASAP (15-20 min)">ASAP (15-20 min)</option>
                <option value="30 minutes">In 30 minutes</option>
                <option value="1 hour">In 1 hour</option>
                <option value="2 hours">In 2 hours</option>
              </select>
            </div>
            <div className="bg-[#BDDDFC]/20 rounded-lg p-3 mb-4">
              <p className="text-xs text-[#384959]">
                <MapPin className="w-4 h-4 inline mr-1" />
                Pickup at Charlotte Costco Food Court
              </p>
            </div>
            <div className="flex gap-3">
              <button
                className="flex-1 bg-gray-100 text-[#384959] px-4 py-2 rounded-lg hover:bg-gray-200 transition-all"
                onClick={() => setShowFoodCourtCart(false)}
              >
                Back
              </button>
              <button
                className="flex-1 bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all"
                onClick={handleFoodCourtCheckout}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      {showFoodCourtConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-[#384959] mb-2">Order Confirmed!</h3>
              <p className="text-sm text-[#6A89A7] mb-4">
                Your food court order has been placed successfully.
              </p>
              <div className="bg-[#BDDDFC]/20 rounded-lg p-4 w-full mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#6A89A7]">Pickup:</span>
                  <span className="text-[#384959]">{foodCourtPickupTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6A89A7]">Location:</span>
                  <span className="text-[#384959]">Charlotte Food Court</span>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 w-full mb-4">
                <p className="text-xs text-blue-800">
                  Show this confirmation at the pickup counter. We'll send you a text when your order is ready.
                </p>
              </div>
              <button
                className="w-full bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all"
                onClick={() => setShowFoodCourtConfirmation(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grocery Products Modal */}
      {showGroceryProducts && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-[#6A89A7]" />
                <h3 className="text-[#384959]">Shop Groceries</h3>
              </div>
              <button onClick={() => setShowGroceryProducts(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {['all', 'produce', 'meat', 'seafood', 'dairy', 'pantry', 'frozen'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedGroceryCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                    selectedGroceryCategory === cat
                      ? 'bg-[#6A89A7] text-white'
                      : 'bg-gray-100 text-[#384959] hover:bg-gray-200'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {groceryProducts
                .filter((product) => selectedGroceryCategory === 'all' || product.category === selectedGroceryCategory)
                .map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-3 hover:border-[#6A89A7] transition-all">
                    <div className="mb-2">
                      <h4 className="text-[#384959] text-sm mb-1">{product.name}</h4>
                      <p className="text-xs text-[#6A89A7]">{product.unit}</p>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#384959]">${product.price.toFixed(2)}</span>
                      {product.badge && (
                        <span className="text-xs bg-[#BDDDFC]/30 text-[#6A89A7] px-2 py-0.5 rounded">{product.badge}</span>
                      )}
                      {product.savings && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">{product.savings} off</span>
                      )}
                    </div>
                    {!isGuest && (
                      <button
                        className="w-full bg-[#E8DCC2] text-[#384959] text-xs px-3 py-1.5 rounded-lg hover:bg-[#d4c8ad] transition-all"
                        onClick={() => setGroceryCart([...groceryCart, product])}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                ))}
            </div>

            {groceryCart.length > 0 && (
              <div className="mt-4 p-4 bg-[#BDDDFC]/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#384959]">Cart ({groceryCart.length} items)</span>
                  <span className="text-[#384959]">${groceryCart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
                </div>
                <button
                  className="w-full bg-[#6A89A7] text-white px-4 py-2 rounded-lg hover:bg-[#5a7997] transition-all"
                  onClick={() => {
                    setShowGroceryProducts(false);
                    setShowGroceryCart(true);
                  }}
                >
                  View Cart
                </button>
              </div>
            )}

            <button
              className="w-full mt-4 bg-gray-100 text-[#384959] px-4 py-2 rounded-lg hover:bg-gray-200 transition-all"
              onClick={() => setShowGroceryProducts(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Grocery Cart Modal */}
      {showGroceryCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#384959]">Grocery Cart</h3>
              <button onClick={() => setShowGroceryCart(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-2 mb-4">
              {groceryCart.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex-1">
                    <p className="text-sm text-[#384959]">{item.name}</p>
                    <p className="text-xs text-[#6A89A7]">{item.unit}</p>
                  </div>
                  <span className="text-[#384959] ml-3">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-[#384959]">Subtotal</span>
                <span className="text-[#384959]">${groceryCart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
              </div>
            </div>
            <div className="bg-[#BDDDFC]/20 rounded-lg p-3 mb-4">
              <p className="text-xs text-[#384959]">
                Ready for checkout. Add to your main shopping cart or continue shopping.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                className="flex-1 bg-gray-100 text-[#384959] px-4 py-2 rounded-lg hover:bg-gray-200 transition-all"
                onClick={() => {
                  setShowGroceryCart(false);
                  setShowGroceryProducts(true);
                }}
              >
                Keep Shopping
              </button>
              <button
                className="flex-1 bg-[#E8DCC2] text-[#384959] px-4 py-2 rounded-lg hover:bg-[#d4c8ad] transition-all"
                onClick={() => {
                  setShowGroceryCart(false);
                  setGroceryCart([]);
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}