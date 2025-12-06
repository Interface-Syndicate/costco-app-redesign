import { useState } from "react";
import { Header } from "./components/Header";
import { ProductGrid } from "./components/ProductGrid";
import { BottomNav } from "./components/BottomNav";
import { ShoppingCart } from "./components/ShoppingCart";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { AccountPage } from "./components/AccountPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { ServicesPage } from "./components/ServicesPage";
import { OrderConfirmation } from "./components/OrderConfirmation";
import { HomePage } from "./components/HomePage";
import { SearchResults } from "./components/SearchResults";
import { GuestPrompt } from "./components/GuestPrompt";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { recommendedProducts } from "./components/TwoLayerCarousel";
import { allServices } from "./components/ServicesHub";
import { Product, CartItem, Order } from "./types";

const products: Product[] = [
  {
    id: "1",
    name: "Heart Teddy Bear",
    price: 12.99,
    quantity: "16 inch",
    category: "Toys",
    image:
      "https://images.unsplash.com/photo-1644265738765-202d54ab8359?q=80&w=682&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isOnSale: true,
    originalPrice: 19.99,
    saleEndDate: "12/10/2025",
  },
  {
    id: "2",
    name: "Dixie Ultra Paper Plates",
    price: 14.49,
    quantity: "220 count",
    category: "Household",
    image:
      "https://media.istockphoto.com/id/501426686/photo/stack-of-paper-plates.jpg?s=2048x2048&w=is&k=20&c=eNQzbtGYfXS1ZvTdy5Ltc-oxqiYLtkac2KL_wv8Pmgg=",
    isOnSale: true,
    originalPrice: 18.99,
    saleEndDate: "12/08/2025",
  },
  {
    id: "3",
    name: "Coffee",
    price: 9.99,
    quantity: "156 pack",
    category: "Household",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80",
  },
  {
    id: "4",
    name: "Kirkland Signature Organic Eggs",
    price: 8.99,
    quantity: "24 count",
    category: "Grocery",
    image:
      "https://plus.unsplash.com/premium_photo-1676686125407-227f3d352df8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8RWdnc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: "5",
    name: "Kirkland Signature Almonds",
    price: 14.99,
    quantity: "3 lbs",
    category: "Grocery",
    image:
      "https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QWxtb25kc3xlbnwwfHwwfHx8MA%3D%3D",
    isOnSale: true,
    originalPrice: 19.99,
    saleEndDate: "12/15/2025",
  },
  {
    id: "6",
    name: "Rotisserie Chicken",
    price: 4.99,
    quantity: "3 lbs",
    category: "Deli",
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80",
  },
  {
    id: "7",
    name: "Mixed Nuts",
    price: 19.99,
    quantity: "2.5 lbs",
    category: "Grocery",
    image:
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&q=80",
    isOnSale: true,
    originalPrice: 24.99,
    saleEndDate: "12/12/2025",
  },
  {
    id: "8",
    name: "Kirkland Signature Olive Oil",
    price: 22.99,
    quantity: "2 liters",
    category: "Grocery",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80",
  },
  {
    id: "9",
    name: "Fresh Atlantic Salmon",
    price: 29.99,
    quantity: "3 lbs",
    category: "Seafood",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
    isOnSale: true,
    originalPrice: 36.99,
    saleEndDate: "12/14/2025",
  },
  {
    id: "10",
    name: "Milk",
    price: 5.99,
    quantity: "40 bottles",
    category: "Beverages",
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=80",
  },
  {
    id: "11",
    name: "Cheese Pizza",
    price: 9.99,
    quantity: "4 pack",
    category: "Frozen",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    isOnSale: true,
    originalPrice: 13.99,
    saleEndDate: "12/06/2025",
  },
  {
    id: "12",
    name: "Organic Blueberries",
    price: 8.99,
    quantity: "18 oz",
    category: "Produce",
    image:
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=800&q=80",
    isOnSale: true,
    originalPrice: 11.99,
    saleEndDate: "12/05/2025",
  },
  {
    id: "13",
    name: "Kirkland Signature Paper Towels",
    price: 19.99,
    quantity: "12 rolls",
    category: "Household",
    image:
      "https://images.unsplash.com/photo-1615090525174-0131ad9367f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXBlciUyMHRvd2VscyUyMHJvbGx8ZW58MXx8fHwxNzY0NjcwNTQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isOnSale: true,
    originalPrice: 24.99,
    saleEndDate: "12/20/2025",
  },
  {
    id: "14",
    name: "Kirkland Signature Batteries",
    price: 16.99,
    quantity: "48 pack AA",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80",
    isOnSale: true,
    originalPrice: 21.99,
    saleEndDate: "12/18/2025",
  },
  {
    id: "15",
    name: "Premium Beef Ribeye Steak",
    price: 39.99,
    quantity: "4 lbs",
    category: "Meat",
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
    isOnSale: true,
    originalPrice: 49.99,
    saleEndDate: "12/07/2025",
  },
];

const dealProducts = products.filter((p) => p.isOnSale);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [authView, setAuthView] = useState<
    "login" | "register"
  >("login");
  const [username, setUsername] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [membershipType, setMembershipType] = useState<
    "gold" | "executive"
  >("gold");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<
    string[]
  >(["3", "6", "8", "9", "10"]);
  const [currentView, setCurrentView] = useState<
    "main" | "checkout" | "service" | "orderConfirmation"
  >("main");
  const [selectedService, setSelectedService] = useState<
    | "membership"
    | "optical"
    | "pharmacy"
    | "foodcourt"
    | "travel"
    | "gas"
    | "grocery"
    | "delivery"
    | "payments"
  >("membership");
  const [orderNumber, setOrderNumber] = useState("");
  const [showGuestPrompt, setShowGuestPrompt] = useState(false);
  const [showAllDeals, setShowAllDeals] = useState(false);
  const [showAllRecommendations, setShowAllRecommendations] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const recentlyViewedProducts = products
    .filter((p) => recentlyViewed.includes(p.id))
    .slice(0, 5);

  const addToCart = (product: Product) => {
    // Check if user is guest, show prompt instead
    if (isGuest) {
      setShowGuestPrompt(true);
      return;
    }

    // Track recently viewed when adding to cart
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== product.id);
      return [product.id, ...filtered].slice(0, 10);
    });

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id,
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const handleAddToCart = (
    product: Product,
    quantity: number = 1,
  ) => {
    // Check if user is guest, show prompt instead
    if (isGuest) {
      setShowGuestPrompt(true);
      return;
    }

    // Track recently viewed when adding to cart
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== product.id);
      return [product.id, ...filtered].slice(0, 10);
    });

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id,
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId),
    );
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
  ) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleServiceClick = (
    serviceType:
      | "membership"
      | "optical"
      | "pharmacy"
      | "foodcourt"
      | "travel"
      | "gas"
      | "grocery"
      | "delivery"
      | "payments",
  ) => {
    setSelectedService(serviceType);
    setCurrentView("service");
  };

  const handleCheckout = () => {
    setCurrentView("checkout");
  };

  const handleOrderComplete = () => {
    // Generate order number
    const orderNum =
      "COSTCO-" +
      Math.random().toString(36).substring(2, 11).toUpperCase();
    setOrderNumber(orderNum);
    
    // Calculate order totals
    const subtotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const tax = subtotal * 0.08;
    const shipping = 2.00;
    const total = subtotal + tax + shipping;
    
    // Create new order
    const newOrder: Order = {
      id: orderNum,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      status: 'processing',
      total: parseFloat(total.toFixed(2)),
      items: cart.map(item => ({
        product: item.product,
        quantity: item.quantity
      })),
      shippingAddress: '123 Main Street, Charlotte, NC 28202',
      paymentMethod: 'Visa ending in 4242',
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      shipping: shipping
    };
    
    // Add order to orders list
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    
    setCart([]);
    setCurrentView("orderConfirmation");
  };

  const handleBackToMain = () => {
    setCurrentView("main");
  };

  const handleContinueShopping = () => {
    setCurrentView("main");
    setActiveTab("home");
  };

  const handleLogin = (user: string) => {
    setUsername(user);
    setIsLoggedIn(true);
    setIsGuest(false);
  };

  const handleRegister = (
    user: string,
    membership: "gold" | "executive",
    name: string,
    email: string,
    phone: string,
  ) => {
    setUsername(user);
    setUserFullName(name);
    setUserEmail(email);
    setUserPhone(phone);
    setMembershipType(membership);
    setIsLoggedIn(true);
    setIsGuest(false);
  };

  const handleContinueAsGuest = () => {
    setUsername("Guest");
    setIsLoggedIn(true);
    setIsGuest(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsGuest(false);
    setUsername("");
    setAuthView("login");
    setCart([]);
    setFavorites([]);
    setCurrentView("main");
    setActiveTab("home");
  };

  // Show authentication screens if not logged in
  if (!isLoggedIn) {
    if (authView === "register") {
      return (
        <Register
          onRegister={handleRegister}
          onSwitchToLogin={() => setAuthView("login")}
        />
      );
    }
    return (
      <Login
        onLogin={handleLogin}
        onSwitchToRegister={() => setAuthView("register")}
        onContinueAsGuest={handleContinueAsGuest}
      />
    );
  }

  // Render different views
  if (currentView === "checkout") {
    return (
      <CheckoutPage
        cart={cart}
        onBack={handleBackToMain}
        onOrderComplete={handleOrderComplete}
      />
    );
  }

  if (currentView === "service") {
    return (
      <ServicesPage
        serviceType={selectedService}
        onBack={handleBackToMain}
        isGuest={isGuest}
        onGuestAction={() => setShowGuestPrompt(true)}
      />
    );
  }

  if (currentView === "orderConfirmation") {
    return (
      <OrderConfirmation
        orderNumber={orderNumber}
        onContinueShopping={handleContinueShopping}
      />
    );
  }

  const renderContent = () => {
    // Show all deals view
    if (showAllDeals) {
      return (
        <div className="px-4 py-8">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setShowAllDeals(false)}
              className="text-[#6A89A7] hover:text-[#384959] transition-colors"
            >
              &lt; Back
            </button>
            <h2 className="text-[#384959]">
              All Ongoing Deals
            </h2>
          </div>
          <ProductGrid
            products={dealProducts}
            onAddToCart={addToCart}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onProductClick={setSelectedProduct}
          />
        </div>
      );
    }

    // Show all recommendations view
    if (showAllRecommendations) {
      return (
        <div className="px-4 py-8">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setShowAllRecommendations(false)}
              className="text-[#6A89A7] hover:text-[#384959] transition-colors"
            >
              &lt; Back
            </button>
            <h2 className="text-[#384959]">
              You May Also Like
            </h2>
          </div>
          <ProductGrid
            products={recommendedProducts}
            onAddToCart={addToCart}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onProductClick={setSelectedProduct}
          />
        </div>
      );
    }

    // Show all services view
    if (showAllServices) {
      return (
        <div className="px-4 py-8">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setShowAllServices(false)}
              className="text-[#6A89A7] hover:text-[#384959] transition-colors"
            >
              &lt; Back
            </button>
            <h2 className="text-[#384959]">
              All Available Services
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {allServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <button
                  key={service.id}
                  className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:bg-gray-50 transition-all active:scale-95"
                  onClick={() => handleServiceClick(service.id as 'membership' | 'optical' | 'pharmacy' | 'foodcourt' | 'travel' | 'gas' | 'grocery' | 'delivery' | 'payments')}
                >
                  <div className="w-20 h-20 rounded-full border-2 border-[#384959] flex items-center justify-center hover:border-[#6A89A7] hover:bg-[#BDDDFC]/20 transition-all">
                    <IconComponent className="w-8 h-8 text-[#384959]" strokeWidth={1.5} />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm text-[#384959] mb-1">{service.name}</h3>
                    <p className="text-xs text-[#6A89A7]">{service.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case "home":
        return (
          <HomePage
            products={products}
            dealProducts={dealProducts}
            onAddToCart={addToCart}
            recentlyViewed={recentlyViewedProducts}
            onServiceClick={handleServiceClick}
            onShowAllDeals={() => setShowAllDeals(true)}
            onShowAllRecommendations={() => setShowAllRecommendations(true)}
            onShowAllServices={() => setShowAllServices(true)}
            onProductClick={setSelectedProduct}
            isGuest={isGuest}
          />
        );

      case "search":
        return (
          <SearchResults
            searchQuery={searchQuery}
            products={products}
            onAddToCart={addToCart}
            onServiceClick={handleServiceClick}
            onProductClick={setSelectedProduct}
            isGuest={isGuest}
          />
        );

      case "cart":
        return (
          <div className="px-4 py-8">
            <h2 className="text-[#384959] mb-4">
              Shopping Cart
            </h2>
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#6A89A7] mb-4">
                  Your cart is empty. Browse deals to start
                  shopping!
                </p>
                <button
                  onClick={() => setActiveTab("home")}
                  className="bg-[#E8DCC2] text-[#384959] px-6 py-3 rounded-lg hover:bg-[#d4c8ad] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[#384959] truncate">
                          {item.product.name}
                        </h3>
                        <div className="text-sm text-[#6A89A7]">
                          {item.product.quantity}
                        </div>
                        <div className="text-[#6A89A7] mt-1">
                          ${item.product.price.toFixed(2)}
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() =>
                            removeFromCart(item.product.id)
                          }
                          className="text-[#E57373] hover:text-[#d65858] transition-colors text-sm"
                        >
                          Remove
                        </button>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1,
                              )
                            }
                            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1,
                              )
                            }
                            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 space-y-3">
                  <div className="flex justify-between text-[#6A89A7]">
                    <span>Subtotal</span>
                    <span>
                      $
                      {cart
                        .reduce(
                          (sum, item) =>
                            sum +
                            item.product.price * item.quantity,
                          0,
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#6A89A7]">
                    <span>Tax (8%)</span>
                    <span>
                      $
                      {(
                        cart.reduce(
                          (sum, item) =>
                            sum +
                            item.product.price * item.quantity,
                          0,
                        ) * 0.08
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-[#384959]">
                      Total
                    </span>
                    <span className="text-[#6A89A7]">
                      $
                      {(
                        cart.reduce(
                          (sum, item) =>
                            sum +
                            item.product.price * item.quantity,
                          0,
                        ) * 1.08
                      ).toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-[#E8DCC2] text-[#384959] py-3 rounded-lg hover:bg-[#d4c8ad] transition-colors"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case "account":
        return (
          <AccountPage
            favorites={favorites}
            products={products}
            onNavigateToHome={() => setActiveTab("home")}
            onLogout={handleLogout}
            username={username}
            isGuest={isGuest}
            onServiceClick={handleServiceClick}
            onProductClick={setSelectedProduct}
            membershipType={membershipType}
            userFullName={userFullName}
            userEmail={userEmail}
            userPhone={userPhone}
            onAddToCart={addToCart}
            orders={orders}
          />
        );

      default:
        return null;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#f8f9fa] pb-20">
        <Header
          cartItemCount={cart.reduce(
            (sum, item) => sum + item.quantity,
            0,
          )}
          onCartClick={() => setActiveTab("cart")}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchFocus={() => setActiveTab("search")}
        />

        <main className="max-w-7xl mx-auto py-[8px]">
          {renderContent()}
        </main>

        <BottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <ShoppingCart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
        />

        <GuestPrompt
          isOpen={showGuestPrompt}
          onClose={() => setShowGuestPrompt(false)}
          onLogin={() => {
            setIsLoggedIn(false);
            setIsGuest(false);
            setAuthView("login");
            setShowGuestPrompt(false);
          }}
          onSignup={() => {
            setIsLoggedIn(false);
            setIsGuest(false);
            setAuthView("register");
            setShowGuestPrompt(false);
          }}
        />

        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          isFavorite={
            selectedProduct
              ? favorites.includes(selectedProduct.id)
              : false
          }
          onToggleFavorite={toggleFavorite}
          isGuest={isGuest}
        />
      </div>
    </ErrorBoundary>
  );
}
