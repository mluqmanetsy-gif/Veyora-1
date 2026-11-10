import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS } from '../data/products.ts';

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface WardrobeOutfit {
  id: string;
  name: string;
  productIds: string[];
  createdAt: string;
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  whatsappNumber: string;
  preferredSize: string;
  preferredShoeSize: string;
  savedAddresses: Array<{
    id: string;
    label: string;
    street: string;
    city: string;
    province: string;
    isDefault: boolean;
  }>;
  rewardsPoints: number;
  referralCode: string;
  referralCount: number;
  redeemedRewards: Array<{
    code: string;
    amount: number;
    used: boolean;
    createdAt: string;
  }>;
}

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCartQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  shippingFee: number;
  freeShippingThreshold: number;
  appliedPromo: { code: string; discountAmount: number } | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  recentlyViewed: string[];
  recordRecentlyViewed: (productId: string) => void;

  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  trackingPreloadId: string;
  setTrackingPreloadId: (id: string) => void;

  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;

  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  activePolicyModal: string | null;
  setActivePolicyModal: (policy: string | null) => void;

  currentUser: CustomerUser | null;
  loginUser: (emailOrPhone: string, name?: string) => void;
  logoutUser: () => void;
  updateUserProfile: (updates: Partial<CustomerUser>) => void;
  redeemPointsForCoupon: (points: number) => { success: boolean; code?: string; message: string };

  backInStockAlerts: Array<{ productId: string; phone: string; size: string }>;
  registerBackInStockAlert: (productId: string, phone: string, size: string) => void;

  activeDepartment: string | null;
  setActiveDepartment: (dept: string | null) => void;
  activeSubcategory: string | null;
  setActiveSubcategory: (sub: string | null) => void;

  wardrobeOutfits: WardrobeOutfit[];
  saveWardrobeOutfit: (name: string, productIds: string[]) => void;
  deleteWardrobeOutfit: (id: string) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  openProductDetail: (product: Product) => void;
  navigateToDepartment: (dept: string, subcategory?: string) => void;
  openCheckout: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('veyora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('veyora_wishlist');
      return saved ? JSON.parse(saved) : ['cl-001', 'fw-001'];
    } catch {
      return ['cl-001', 'fw-001'];
    }
  });

  // Recently viewed product IDs
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('veyora_recent_views');
      return saved ? JSON.parse(saved) : ['cl-001', 'cl-002', 'bg-001'];
    } catch {
      return ['cl-001', 'cl-002', 'bg-001'];
    }
  });

  // Logged-in Customer User (Section 19 & 20)
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(() => {
    try {
      const saved = localStorage.getItem('veyora_customer_user');
      return saved
        ? JSON.parse(saved)
        : {
            id: 'usr-9281',
            name: 'Ayesha Malik',
            email: 'ayesha.malik@example.com',
            whatsappNumber: '+923001234567',
            preferredSize: 'M',
            preferredShoeSize: '38',
            savedAddresses: [
              {
                id: 'addr-1',
                label: 'Home (DHA Lahore)',
                street: 'House 42-B, Sector Z, Phase 5 DHA',
                city: 'Lahore',
                province: 'Punjab',
                isDefault: true
              },
              {
                id: 'addr-2',
                label: 'Karachi Residence',
                street: 'Apartment 701, Block 4, Clifton',
                city: 'Karachi',
                province: 'Sindh',
                isDefault: false
              }
            ],
            rewardsPoints: 450,
            referralCode: 'AYESHA-VEYORA-500',
            referralCount: 2,
            redeemedRewards: []
          };
    } catch {
      return null;
    }
  });

  // Applied Promo Code in Cart/Checkout
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountAmount: number } | null>(null);

  // Back in stock alerts
  const [backInStockAlerts, setBackInStockAlerts] = useState<Array<{ productId: string; phone: string; size: string }>>(() => {
    try {
      const saved = localStorage.getItem('veyora_back_in_stock');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wardrobe Outfits
  const [wardrobeOutfits, setWardrobeOutfits] = useState<WardrobeOutfit[]>(() => {
    try {
      const saved = localStorage.getItem('veyora_wardrobe');
      return saved ? JSON.parse(saved) : [
        {
          id: 'look-1',
          name: 'Festive Eid Ensemble',
          productIds: ['cl-001', 'fw-001', 'bg-001'],
          createdAt: new Date().toLocaleDateString()
        }
      ];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingPreloadId, setTrackingPreloadId] = useState('VY-89241');
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activePolicyModal, setActivePolicyModal] = useState<string | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [activeDepartment, setActiveDepartment] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('veyora_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('veyora_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('veyora_recent_views', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('veyora_customer_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('veyora_wardrobe', JSON.stringify(wardrobeOutfits));
  }, [wardrobeOutfits]);

  useEffect(() => {
    localStorage.setItem('veyora_back_in_stock', JSON.stringify(backInStockAlerts));
  }, [backInStockAlerts]);

  const recordRecentlyViewed = (productId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 10);
    });
  };

  const addToCart = (product: Product, size: string, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }
      return [...prev, { product, selectedSize: size, quantity }];
    });
    recordRecentlyViewed(product.id);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.selectedSize === size)));
  };

  const updateCartQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (code: string): { success: boolean; message: string } => {
    const clean = code.trim().toUpperCase();
    if (clean === 'VEYORA500' || clean.includes('VEYORA-500')) {
      setAppliedPromo({ code: clean, discountAmount: 500 });
      return { success: true, message: 'Referral discount of Rs. 500 applied successfully!' };
    }
    if (clean === 'REWARD200' || clean === 'REWARD-200') {
      setAppliedPromo({ code: clean, discountAmount: 200 });
      return { success: true, message: 'Loyalty Reward of Rs. 200 applied successfully!' };
    }
    if (clean === 'WELCOME10') {
      const discount = Math.round(cartTotal * 0.1);
      setAppliedPromo({ code: clean, discountAmount: discount });
      return { success: true, message: `10% Welcome Discount (Rs. ${discount.toLocaleString()}) applied!` };
    }
    return { success: false, message: 'Invalid or expired promotional code. Try REWARD-200 or VEYORA500.' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const saveWardrobeOutfit = (name: string, productIds: string[]) => {
    const newOutfit: WardrobeOutfit = {
      id: `outfit-${Date.now()}`,
      name,
      productIds,
      createdAt: new Date().toLocaleDateString()
    };
    setWardrobeOutfits((prev) => [newOutfit, ...prev]);
  };

  const deleteWardrobeOutfit = (id: string) => {
    setWardrobeOutfits((prev) => prev.filter((o) => o.id !== id));
  };

  const loginUser = (emailOrPhone: string, name?: string) => {
    const newUser: CustomerUser = {
      id: `usr-${Date.now()}`,
      name: name || 'Valued Client',
      email: emailOrPhone.includes('@') ? emailOrPhone : 'customer@veyora.pk',
      whatsappNumber: emailOrPhone.startsWith('+') || emailOrPhone.startsWith('03') ? emailOrPhone : '+923001234567',
      preferredSize: 'M',
      preferredShoeSize: '38',
      savedAddresses: [
        {
          id: 'addr-1',
          label: 'Default Address',
          street: 'Main Boulevard, Gulberg III',
          city: 'Lahore',
          province: 'Punjab',
          isDefault: true
        }
      ],
      rewardsPoints: 200,
      referralCode: `VEYORA-${Math.floor(1000 + Math.random() * 9000)}`,
      referralCount: 0,
      redeemedRewards: []
    };
    setCurrentUser(newUser);
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const updateUserProfile = (updates: Partial<CustomerUser>) => {
    if (!currentUser) return;
    setCurrentUser({ ...currentUser, ...updates });
  };

  const redeemPointsForCoupon = (pointsToRedeem: number): { success: boolean; code?: string; message: string } => {
    if (!currentUser || currentUser.rewardsPoints < pointsToRedeem) {
      return { success: false, message: 'Insufficient rewards points balance.' };
    }

    const discountValue = pointsToRedeem; // 1 point = Rs. 1
    const couponCode = `REWARD-${discountValue}-${Math.floor(100 + Math.random() * 900)}`;

    const updatedUser: CustomerUser = {
      ...currentUser,
      rewardsPoints: currentUser.rewardsPoints - pointsToRedeem,
      redeemedRewards: [
        {
          code: couponCode,
          amount: discountValue,
          used: false,
          createdAt: new Date().toLocaleDateString()
        },
        ...currentUser.redeemedRewards
      ]
    };

    setCurrentUser(updatedUser);
    setAppliedPromo({ code: couponCode, discountAmount: discountValue });
    return {
      success: true,
      code: couponCode,
      message: `Redeemed ${pointsToRedeem} points for Rs. ${discountValue} voucher! Applied automatically to your bag.`
    };
  };

  const registerBackInStockAlert = (productId: string, phone: string, size: string) => {
    setBackInStockAlerts((prev) => [...prev, { productId, phone, size }]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const freeShippingThreshold = 3500;
  const shippingFee = cartTotal >= freeShippingThreshold || cartTotal === 0 ? 0 : 200;

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    recordRecentlyViewed(product.id);
  };

  const navigateToDepartment = (dept: string, subcategory?: string) => {
    setActiveDepartment(dept);
    setActiveSubcategory(subcategory || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
        shippingFee,
        freeShippingThreshold,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        selectedProduct,
        setSelectedProduct,
        recentlyViewed,
        recordRecentlyViewed,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isTrackingOpen,
        setIsTrackingOpen,
        trackingPreloadId,
        setTrackingPreloadId,
        isAccountOpen,
        setIsAccountOpen,
        isAdminOpen,
        setIsAdminOpen,
        activePolicyModal,
        setActivePolicyModal,
        currentUser,
        loginUser,
        logoutUser,
        updateUserProfile,
        redeemPointsForCoupon,
        backInStockAlerts,
        registerBackInStockAlert,
        activeDepartment,
        setActiveDepartment,
        activeSubcategory,
        setActiveSubcategory,
        wardrobeOutfits,
        saveWardrobeOutfit,
        deleteWardrobeOutfit,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        openProductDetail,
        navigateToDepartment,
        openCheckout
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
