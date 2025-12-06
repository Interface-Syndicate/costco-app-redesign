import { useState, useEffect } from 'react';
import { User, CreditCard, MapPin, Package, Settings, ChevronRight, Award, Calendar, Truck, Clock, BarChart3, Edit2, Camera, LogOut } from 'lucide-react';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Product, Order } from '../types';

interface AccountPageProps {
  favorites: string[];
  products: Product[];
  onNavigateToHome: () => void;
  onLogout?: () => void;
  username?: string;
  isGuest?: boolean;
  onServiceClick?: (serviceType: 'membership' | 'optical' | 'pharmacy' | 'foodcourt' | 'travel' | 'gas' | 'grocery' | 'delivery' | 'payments') => void;
  onProductClick?: (product: Product) => void;
  membershipType?: 'gold' | 'executive';
  userFullName?: string;
  userEmail?: string;
  userPhone?: string;
  onAddToCart?: (product: Product, quantity: number) => void;
  orders?: Order[];
}

export function AccountPage({ favorites, products, onNavigateToHome, onLogout, username, isGuest, onServiceClick, onProductClick, membershipType, userFullName, userEmail, userPhone, onAddToCart, orders }: AccountPageProps) {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userFullName || 'John Anderson',
    email: userEmail || 'john.anderson@email.com',
    phone: userPhone || '(704) 555-0123',
    memberSince: '2024',
    memberId: '1234 5678 9012 3456'
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsAlerts: false,
    weeklyDeals: true
  });

  // Sync profile data with props when they change
  useEffect(() => {
    setProfileData({
      name: userFullName || 'John Anderson',
      email: userEmail || 'john.anderson@email.com',
      phone: userPhone || '(704) 555-0123',
      memberSince: '2024',
      memberId: '1234 5678 9012 3456'
    });
  }, [userFullName, userEmail, userPhone]);

  // Get user initials from full name
  const getUserInitials = () => {
    if (userFullName) {
      const names = userFullName.trim().split(' ');
      if (names.length >= 2) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase();
      }
      return userFullName.slice(0, 2).toUpperCase();
    }
    if (username) {
      return username.slice(0, 2).toUpperCase();
    }
    return 'JA';
  };

  const favoriteProducts = products.filter(p => favorites.includes(p.id));
  const totalSpent = orders ? orders.reduce((sum, order) => sum + order.total, 0) : 0;
  const rewardsBalance = Math.floor(totalSpent * 0.02 * 100) / 100; // 2% cashback

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Package className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'processing':
        return <Clock className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  const handleReorder = (order: Order) => {
    if (onAddToCart) {
      order.items.forEach((item) => {
        onAddToCart(item.product, item.quantity);
      });
      // Show a success message or toast (we'll use a simple alert for now)
      alert(`${order.items.length} item(s) added to cart!`);
    }
  };

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto">
      {/* Guest Banner */}
      {isGuest && (
        <Card className="p-6 mb-6 bg-gradient-to-r from-[#88BDF2] to-[#6A89A7] border-none">
          <div className="flex items-center justify-between text-white">
            <div>
              <h3 className="mb-1">You're browsing as a guest</h3>
              <p className="text-sm text-white/90">Create an account to save your favorites, view order history, and earn rewards!</p>
            </div>
            <button 
              onClick={onLogout}
              className="px-6 py-2 bg-white text-[#6A89A7] rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap ml-4"
            >
              Sign Up
            </button>
          </div>
        </Card>
      )}

      {/* Profile Header */}
      <Card className="p-6 mb-6 border-gray-200">
        <div className="flex items-start gap-4 mb-6">
          <div className="relative group">
            <div className="w-20 h-20 border-2 border-[#88BDF2] rounded-full bg-gradient-to-br from-[#6A89A7] to-[#88BDF2] flex items-center justify-center overflow-hidden">
              <span className="text-2xl text-white">
                {getUserInitials()}
              </span>
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#88BDF2] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-[#384959] mb-1">{userFullName || username || profileData.name}</h2>
                <p className="text-[#6A89A7] text-sm mb-1">{profileData.email}</p>
                <p className="text-[#6A89A7] text-sm">Member since {profileData.memberSince}</p>
              </div>
              <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                <DialogTrigger asChild>
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Edit2 className="w-5 h-5 text-[#6A89A7]" />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-[#384959]">Edit Profile</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="border-gray-200"
                      />
                    </div>
                    <button
                      onClick={() => setIsEditProfileOpen(false)}
                      className="w-full bg-[#E8DCC2] text-[#384959] py-2 rounded-lg hover:bg-[#d4c8ad] transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Membership Card */}
        <div className={`rounded-xl p-6 text-white ${
          membershipType === 'executive' 
            ? 'bg-gradient-to-br from-[#384959] via-[#6A89A7] to-[#88BDF2]' 
            : 'bg-gradient-to-br from-[#6A89A7] to-[#384959]'
        }`}>
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Award className={`w-5 h-5 ${membershipType === 'executive' ? 'text-yellow-300' : 'text-[#88BDF2]'}`} />
                <span className="text-sm opacity-90">
                  {membershipType === 'executive' ? 'Executive Member' : 'Gold Star Member'}
                </span>
              </div>
              <h3 className="text-xl mb-1">{userFullName || username || profileData.name}</h3>
              <p className="text-sm opacity-75">{profileData.memberId}</p>
              {membershipType === 'executive' && (
                <p className="text-xs mt-2 bg-white/20 px-2 py-1 rounded inline-block">
                  2% Annual Reward on Eligible Purchases
                </p>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm opacity-75 mb-1">
                {membershipType === 'executive' ? 'Rewards Balance' : 'Membership'}
              </div>
              <div className="text-2xl">
                {membershipType === 'executive' ? `$${rewardsBalance.toFixed(2)}` : '$60/yr'}
              </div>
            </div>
          </div>
          <div className="flex gap-2 bg-white rounded p-2">
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
          <p className="text-xs text-center mt-2 opacity-75">Scan at checkout</p>
        </div>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="p-4 border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#88BDF2] bg-opacity-20 flex items-center justify-center mb-2">
              <BarChart3 className="w-6 h-6 text-[#6A89A7]" />
            </div>
            <div className="text-2xl text-[#384959] mb-1">{orders ? orders.length : 0}</div>
            <div className="text-xs text-[#6A89A7]">Orders</div>
          </div>
        </Card>
        <Card className="p-4 border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#88BDF2] bg-opacity-20 flex items-center justify-center mb-2">
              <Award className="w-6 h-6 text-[#6A89A7]" />
            </div>
            <div className="text-2xl text-[#384959] mb-1">${rewardsBalance}</div>
            <div className="text-xs text-[#6A89A7]">Rewards</div>
          </div>
        </Card>
        <Card className="p-4 border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#88BDF2] bg-opacity-20 flex items-center justify-center mb-2">
              <Package className="w-6 h-6 text-[#6A89A7]" />
            </div>
            <div className="text-2xl text-[#384959] mb-1">{favorites.length}</div>
            <div className="text-xs text-[#6A89A7]">Favorites</div>
          </div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="orders" className="data-[state=active]:bg-[#88BDF2] data-[state=active]:text-[#384959]">
            Orders
          </TabsTrigger>
          <TabsTrigger value="favorites" className="data-[state=active]:bg-[#88BDF2] data-[state=active]:text-[#384959]">
            Favorites
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-[#88BDF2] data-[state=active]:text-[#384959]">
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-4">
          {orders ? orders.map((order) => (
            <Card key={order.id} className="border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-[#384959] mb-1">Order {order.id}</h3>
                    <div className="flex items-center gap-2 text-sm text-[#6A89A7]">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </Badge>
                </div>

                <Separator className="my-3" />

                <div className="space-y-3 mb-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm text-[#384959] truncate">{item.product.name}</h4>
                        <p className="text-xs text-[#6A89A7]">{item.product.quantity}</p>
                        <p className="text-sm text-[#6A89A7]">Qty: {item.quantity} × ${item.product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-3" />

                <div className="flex items-center justify-between">
                  <div className="text-[#384959]">Total: ${order.total.toFixed(2)}</div>
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-2 text-sm text-[#6A89A7] hover:text-[#88BDF2] transition-colors"
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                    </button>
                    <button
                      className="px-4 py-2 text-sm bg-[#E8DCC2] text-[#384959] rounded-lg hover:bg-[#d4c8ad] transition-colors"
                      onClick={() => handleReorder(order)}
                    >
                      Reorder
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          )) : (
            <Card className="p-8 border-gray-200">
              <div className="text-center">
                <Package className="w-12 h-12 text-[#6A89A7] mx-auto mb-3 opacity-50" />
                <p className="text-[#6A89A7] mb-4">No orders yet</p>
                <button
                  onClick={onNavigateToHome}
                  className="bg-[#E8DCC2] text-[#384959] px-6 py-2 rounded-lg hover:bg-[#d4c8ad] transition-colors"
                >
                  Browse Products
                </button>
              </div>
            </Card>
          )}
        </TabsContent>

        {/* Favorites Tab */}
        <TabsContent value="favorites" className="space-y-4">
          {favoriteProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {favoriteProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="border-gray-200 overflow-hidden hover:shadow-md transition-all hover:scale-105 cursor-pointer"
                  onClick={() => onProductClick?.(product)}
                >
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm text-[#384959] truncate mb-1">{product.name}</h4>
                    <p className="text-xs text-[#6A89A7] mb-2">{product.quantity}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6A89A7]">${product.price.toFixed(2)}</span>
                      <button 
                        className="px-3 py-1 text-xs bg-[#E8DCC2] text-[#384959] rounded hover:bg-[#d4c8ad] transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart?.(product, 1);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 border-gray-200">
              <div className="text-center">
                <Package className="w-12 h-12 text-[#6A89A7] mx-auto mb-3 opacity-50" />
                <p className="text-[#6A89A7] mb-4">No favorites yet</p>
                <button
                  onClick={onNavigateToHome}
                  className="bg-[#E8DCC2] text-[#384959] px-6 py-2 rounded-lg hover:bg-[#d4c8ad] transition-colors"
                >
                  Browse Products
                </button>
              </div>
            </Card>
          )}
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          {/* Preferences */}
          <Card className="p-4 border-gray-200">
            <h3 className="text-[#384959] mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Notification Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-[#384959]">Email Notifications</div>
                  <div className="text-xs text-[#6A89A7]">Receive order updates via email</div>
                </div>
                <Switch
                  checked={preferences.emailNotifications}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, emailNotifications: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-[#384959]">Push Notifications</div>
                  <div className="text-xs text-[#6A89A7]">Get app notifications</div>
                </div>
                <Switch
                  checked={preferences.pushNotifications}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, pushNotifications: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-[#384959]">SMS Alerts</div>
                  <div className="text-xs text-[#6A89A7]">Delivery updates via text</div>
                </div>
                <Switch
                  checked={preferences.smsAlerts}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, smsAlerts: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-[#384959]">Weekly Deals</div>
                  <div className="text-xs text-[#6A89A7]">Get notified about special offers</div>
                </div>
                <Switch
                  checked={preferences.weeklyDeals}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, weeklyDeals: checked })}
                />
              </div>
            </div>
          </Card>

          {/* Warehouse Location */}
          <Card className="p-4 border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#88BDF2] bg-opacity-20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#6A89A7]" />
                </div>
                <div>
                  <h3 className="text-[#384959]">Primary Warehouse</h3>
                  <p className="text-sm text-[#6A89A7]">Charlotte Costco - 5.2 miles away</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#6A89A7]" />
            </div>
          </Card>

          {/* Payment Methods */}
          <Card 
            className="p-4 border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onServiceClick?.('payments')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#88BDF2] bg-opacity-20 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-[#6A89A7]" />
                </div>
                <div>
                  <h3 className="text-[#384959]">Payment Methods</h3>
                  <p className="text-sm text-[#6A89A7]">Manage your saved cards</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#6A89A7]" />
            </div>
          </Card>

          {/* Account Actions */}
          <div className="space-y-2 pt-4">
            <button className="w-full p-4 text-left text-[#6A89A7] hover:bg-gray-50 rounded-lg transition-colors">
              Privacy Policy
            </button>
            <button className="w-full p-4 text-left text-[#6A89A7] hover:bg-gray-50 rounded-lg transition-colors">
              Terms of Service
            </button>
            <button className="w-full p-4 text-left text-[#6A89A7] hover:bg-gray-50 rounded-lg transition-colors">
              Help & Support
            </button>
            <Separator className="my-2" />
            <button 
              onClick={onLogout}
              className="w-full p-4 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Order Details Dialog */}
      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="text-[#384959] flex items-center justify-between">
                  <span>Order Details - {selectedOrder.id}</span>
                  <Badge className={`${getStatusColor(selectedOrder.status)} flex items-center gap-1`}>
                    {getStatusIcon(selectedOrder.status)}
                    <span className="capitalize">{selectedOrder.status}</span>
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Order Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-[#6A89A7] mb-1">Order Date</div>
                    <div className="text-[#384959]">
                      {new Date(selectedOrder.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6A89A7] mb-1">Order Number</div>
                    <div className="text-[#384959]">{selectedOrder.id}</div>
                  </div>
                </div>

                <Separator />

                {/* Shipping Address */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-[#6A89A7]" />
                    <span className="text-sm text-[#6A89A7]">Shipping Address</span>
                  </div>
                  <div className="text-[#384959] pl-6">{selectedOrder.shippingAddress}</div>
                </div>

                {/* Payment Method */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-4 h-4 text-[#6A89A7]" />
                    <span className="text-sm text-[#6A89A7]">Payment Method</span>
                  </div>
                  <div className="text-[#384959] pl-6">{selectedOrder.paymentMethod}</div>
                </div>

                <Separator />

                {/* Order Items */}
                <div>
                  <h3 className="text-[#384959] mb-3">Order Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[#384959] mb-1">{item.product.name}</h4>
                          <p className="text-sm text-[#6A89A7] mb-1">{item.product.quantity}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[#6A89A7]">Quantity: {item.quantity}</span>
                            <span className="text-[#384959]">${(item.product.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Order Summary */}
                <div>
                  <h3 className="text-[#384959] mb-3">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[#6A89A7]">
                      <span>Subtotal</span>
                      <span>${selectedOrder.subtotal?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#6A89A7]">
                      <span>Shipping</span>
                      <span>${selectedOrder.shipping?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#6A89A7]">
                      <span>Tax</span>
                      <span>${selectedOrder.tax?.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-[#384959]">
                      <span>Total</span>
                      <span>${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    className="flex-1 bg-[#E8DCC2] text-[#384959] py-3 rounded-lg hover:bg-[#d4c8ad] transition-colors"
                    onClick={() => {
                      handleReorder(selectedOrder);
                      setIsOrderDetailsOpen(false);
                    }}
                  >
                    Reorder All Items
                  </button>
                  <button
                    className="px-6 py-3 text-[#6A89A7] border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOrderDetailsOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
