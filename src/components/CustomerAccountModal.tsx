import React, { useState } from 'react';
import {
  X,
  User,
  Package,
  MapPin,
  Heart,
  Clock,
  Gift,
  Share2,
  Copy,
  Check,
  Bell,
  LogOut,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { PRODUCTS, PAKISTAN_CITIES, PAKISTAN_PROVINCES } from '../data/products.ts';
import { STORE_CONTACT } from '../data/policies.ts';

type AccountTab = 'orders' | 'addresses' | 'rewards' | 'recentlyViewed' | 'profile' | 'alerts';

export const CustomerAccountModal: React.FC = () => {
  const {
    isAccountOpen,
    setIsAccountOpen,
    currentUser,
    loginUser,
    logoutUser,
    updateUserProfile,
    redeemPointsForCoupon,
    recentlyViewed,
    openProductDetail,
    addToCart,
    setIsTrackingOpen,
    setTrackingPreloadId,
    backInStockAlerts
  } = useStore();

  const [activeTab, setActiveTab] = useState<AccountTab>('orders');

  // Auth form state
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [loginInput, setLoginInput] = useState('');
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Address form
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddrLabel, setNewAddrLabel] = useState('Home');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('Karachi');
  const [newAddrProvince, setNewAddrProvince] = useState('Sindh');

  // Rewards redemption state
  const [redemptionNotice, setRedemptionNotice] = useState<string | null>(null);
  const [copiedReferral, setCopiedReferral] = useState(false);

  // Cart recovery consent toggle
  const [cartRecoveryConsent, setCartRecoveryConsent] = useState(true);

  if (!isAccountOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginInput.trim()) return;
    loginUser(loginInput.trim());
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regPhone.trim() || !regName.trim()) return;
    loginUser(regPhone.trim(), regName.trim());
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSent(true);
    setTimeout(() => {
      setForgotSent(false);
      setAuthMode('login');
    }, 3000);
  };

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrStreet.trim()) return;
    if (currentUser) {
      const updated = [
        ...currentUser.savedAddresses,
        {
          id: `addr-${Date.now()}`,
          label: newAddrLabel,
          street: newAddrStreet.trim(),
          city: newAddrCity,
          province: newAddrProvince,
          isDefault: currentUser.savedAddresses.length === 0
        }
      ];
      updateUserProfile({ savedAddresses: updated });
      setShowAddAddress(false);
      setNewAddrStreet('');
    }
  };

  const copyReferralCode = () => {
    if (currentUser?.referralCode) {
      navigator.clipboard?.writeText(currentUser.referralCode);
      setCopiedReferral(true);
      setTimeout(() => setCopiedReferral(false), 2000);
    }
  };

  const handleRedeem = (points: number) => {
    const res = redeemPointsForCoupon(points);
    setRedemptionNotice(res.message);
    setTimeout(() => setRedemptionNotice(null), 4000);
  };

  // Recently viewed products list
  const recentProducts = recentlyViewed
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-sm shadow-2xl overflow-hidden my-auto border border-[#EAEAEA]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FAF8F5] border-b border-[#EAEAEA]">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#702B3A]" />
            <div>
              <h2 className="text-base font-serif font-semibold tracking-wide text-[#171513]">
                {currentUser ? `Welcome, ${currentUser.name}` : 'Customer Account & Rewards Club'}
              </h2>
              <p className="text-[10px] uppercase tracking-wider text-[#B69A70] font-medium">
                VEYORA Client Portal • Pakistan
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAccountOpen(false)}
            className="p-1.5 text-stone-500 hover:text-black rounded-full hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {!currentUser ? (
          /* Authentication Form */
          <div className="p-6 sm:p-10 max-w-md mx-auto space-y-6">
            <div className="text-center space-y-1">
              <span className="text-2xl font-serif font-bold text-[#171513] tracking-widest">
                VEYORA
              </span>
              <p className="text-xs text-stone-500 font-light">
                Sign in to view order history, manage Cash on Delivery addresses, and earn VEYORA Club Points.
              </p>
            </div>

            {authMode === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#171513] mb-1">
                    WhatsApp Number or Email
                  </label>
                  <input
                    type="text"
                    required
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    placeholder="e.g. 0300 1234567 or ayesha@example.com"
                    className="w-full px-3.5 py-2.5 text-xs border border-stone-300 focus:border-[#702B3A] focus:outline-none rounded-xs"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#171513]">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setAuthMode('forgot')}
                      className="text-[11px] text-[#702B3A] hover:underline"
                    >
                      Forgot?
                    </button>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 text-xs border border-stone-300 focus:border-[#702B3A] focus:outline-none rounded-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#702B3A] hover:bg-[#551D2A] text-white text-xs font-semibold uppercase tracking-widest rounded-xs transition-colors"
                >
                  Sign In to VEYORA
                </button>

                <p className="text-center text-xs text-stone-500">
                  New to VEYORA?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className="text-[#702B3A] font-semibold hover:underline"
                  >
                    Create Account
                  </button>
                </p>
              </form>
            )}

            {authMode === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#171513] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Sana Javed"
                    className="w-full px-3.5 py-2.5 text-xs border border-stone-300 focus:border-[#702B3A] focus:outline-none rounded-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#171513] mb-1">
                    WhatsApp / Mobile Number <span className="text-[#702B3A]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="0300 1234567"
                    className="w-full px-3.5 py-2.5 text-xs border border-stone-300 focus:border-[#702B3A] focus:outline-none rounded-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#171513] mb-1">
                    Email Address <span className="text-stone-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="sana@example.com"
                    className="w-full px-3.5 py-2.5 text-xs border border-stone-300 focus:border-[#702B3A] focus:outline-none rounded-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#702B3A] hover:bg-[#551D2A] text-white text-xs font-semibold uppercase tracking-widest rounded-xs transition-colors"
                >
                  Create VEYORA Account
                </button>

                <p className="text-center text-xs text-stone-500">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="text-[#702B3A] font-semibold hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              </form>
            )}

            {authMode === 'forgot' && (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <p className="text-xs text-stone-600">
                  Enter your registered WhatsApp number or email address. We will send an instant password reset link directly to your WhatsApp.
                </p>

                {forgotSent ? (
                  <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xs border border-emerald-200">
                    A secure password recovery verification code has been dispatched to your WhatsApp.
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      required
                      placeholder="0300 1234567 or email"
                      className="w-full px-3.5 py-2.5 text-xs border border-stone-300 focus:border-[#702B3A] focus:outline-none rounded-xs"
                    />
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#702B3A] text-white text-xs font-semibold uppercase tracking-widest rounded-xs"
                    >
                      Send WhatsApp Reset Link
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="w-full text-center text-xs text-stone-500 hover:underline"
                >
                  Back to Sign In
                </button>
              </form>
            )}
          </div>
        ) : (
          /* Logged In Dashboard (Sections 19 & 20) */
          <div className="p-6 max-h-[82vh] overflow-y-auto space-y-6">
            {/* Top Loyalty & Profile Summary Banner */}
            <div className="bg-[#FAF8F5] border border-[#EAEAEA] p-5 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#B69A70] font-semibold">
                  VEYORA Privilege Member
                </span>
                <h3 className="text-lg font-serif font-semibold text-[#171513]">
                  {currentUser.name}
                </h3>
                <p className="text-xs text-stone-500">
                  WhatsApp: <span className="font-mono text-stone-800">{currentUser.whatsappNumber}</span> • Email: {currentUser.email}
                </p>
              </div>

              <div className="flex items-center gap-4 bg-white p-3 rounded-xs border border-stone-200">
                <div className="text-center">
                  <span className="text-[9px] uppercase tracking-wider text-stone-400 block font-semibold">
                    Rewards Balance
                  </span>
                  <span className="text-xl font-serif font-bold text-[#702B3A]">
                    {currentUser.rewardsPoints} Pts
                  </span>
                  <span className="text-[10px] text-emerald-700 block font-medium">
                    = Rs. {currentUser.rewardsPoints} Off
                  </span>
                </div>
                <div className="border-l border-stone-200 pl-4">
                  <button
                    onClick={() => setActiveTab('rewards')}
                    className="px-3 py-1.5 bg-[#702B3A] text-white text-[11px] font-semibold uppercase tracking-wider rounded-xs hover:bg-[#551D2A] transition-colors"
                  >
                    Redeem
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex overflow-x-auto no-scrollbar gap-2 border-b border-[#EAEAEA] pb-2 text-xs">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3 py-1.5 rounded-xs font-medium uppercase tracking-wider transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'orders' ? 'bg-[#702B3A] text-white' : 'text-stone-600 hover:text-black'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>Order History</span>
              </button>

              <button
                onClick={() => setActiveTab('rewards')}
                className={`px-3 py-1.5 rounded-xs font-medium uppercase tracking-wider transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'rewards' ? 'bg-[#702B3A] text-white' : 'text-stone-600 hover:text-black'
                }`}
              >
                <Gift className="w-3.5 h-3.5" />
                <span>Rewards & Referrals</span>
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`px-3 py-1.5 rounded-xs font-medium uppercase tracking-wider transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'addresses' ? 'bg-[#702B3A] text-white' : 'text-stone-600 hover:text-black'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Saved Addresses</span>
              </button>

              <button
                onClick={() => setActiveTab('recentlyViewed')}
                className={`px-3 py-1.5 rounded-xs font-medium uppercase tracking-wider transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'recentlyViewed' ? 'bg-[#702B3A] text-white' : 'text-stone-600 hover:text-black'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Recently Viewed</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`px-3 py-1.5 rounded-xs font-medium uppercase tracking-wider transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'profile' ? 'bg-[#702B3A] text-white' : 'text-stone-600 hover:text-black'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Profile Settings</span>
              </button>

              <button
                onClick={() => setActiveTab('alerts')}
                className={`px-3 py-1.5 rounded-xs font-medium uppercase tracking-wider transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'alerts' ? 'bg-[#702B3A] text-white' : 'text-stone-600 hover:text-black'
                }`}
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Stock Alerts</span>
              </button>
            </div>

            {/* TAB 1: ORDER HISTORY */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171513]">
                    Your Cash on Delivery Orders
                  </h4>
                  <span className="text-[11px] text-stone-500">Live courier tracking available</span>
                </div>

                <div className="space-y-3">
                  {/* Sample Orders for Client */}
                  <div className="p-4 border border-[#EAEAEA] rounded-xs bg-[#FAF8F5] space-y-3">
                    <div className="flex flex-wrap items-center justify-between border-b border-stone-200 pb-2 gap-2 text-xs">
                      <div>
                        <span className="font-mono font-bold text-[#702B3A]">#VY-89241</span>
                        <span className="text-stone-400 ml-2">Ordered: 2 days ago</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-xs text-[10px] font-semibold bg-blue-100 text-blue-800">
                          In Transit (Trax Logistics)
                        </span>
                        <button
                          onClick={() => {
                            setTrackingPreloadId('VY-89241');
                            setIsAccountOpen(false);
                            setIsTrackingOpen(true);
                          }}
                          className="px-2.5 py-1 bg-[#171513] text-white text-[11px] font-medium rounded-xs hover:bg-black transition-colors"
                        >
                          Track Parcel →
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80"
                          alt="Lawn Suit"
                          className="w-12 h-14 object-cover rounded-xs"
                        />
                        <div>
                          <p className="font-medium text-[#171513]">Emerald Zari 3-Piece Stitched Luxury Lawn Suit</p>
                          <p className="text-[11px] text-stone-500">Size: M • Qty: 1</p>
                        </div>
                      </div>
                      <span className="font-bold text-[#171513]">Rs. 9,850</span>
                    </div>
                  </div>

                  <div className="p-4 border border-[#EAEAEA] rounded-xs bg-[#FAF8F5] space-y-3">
                    <div className="flex flex-wrap items-center justify-between border-b border-stone-200 pb-2 gap-2 text-xs">
                      <div>
                        <span className="font-mono font-bold text-[#702B3A]">#VY-74120</span>
                        <span className="text-stone-400 ml-2">Delivered: 4 days ago</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-xs text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                          Delivered (Call Courier)
                        </span>
                        <button
                          onClick={() => {
                            setTrackingPreloadId('VY-74120');
                            setIsAccountOpen(false);
                            setIsTrackingOpen(true);
                          }}
                          className="px-2.5 py-1 bg-stone-200 text-stone-800 text-[11px] font-medium rounded-xs hover:bg-stone-300"
                        >
                          View Details
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <p className="font-medium text-[#171513]">The Sovereign Structured Burgundy Leather Tote + Khussa</p>
                        <p className="text-[11px] text-stone-500">2 Items • Paid in Cash: Rs. 13,900</p>
                      </div>
                      <span className="text-emerald-700 font-medium text-[11px]">Points Credited (+139 Pts)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: VEYORA REWARDS CLUB & REFERRALS (Section 20) */}
            {activeTab === 'rewards' && (
              <div className="space-y-6">
                {redemptionNotice && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xs font-medium">
                    {redemptionNotice}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Points Redemption Card */}
                  <div className="p-4 bg-white border border-[#EAEAEA] rounded-xs space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#B69A70]" />
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171513]">
                        Redeem Loyalty Points
                      </h4>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Convert points earned from qualifying delivered orders into direct cash discounts. 1 point = Rs. 1 discount.
                    </p>

                    <div className="space-y-2 pt-1">
                      <button
                        onClick={() => handleRedeem(200)}
                        disabled={currentUser.rewardsPoints < 200}
                        className="w-full py-2.5 bg-[#FAF8F5] hover:bg-[#702B3A] hover:text-white border border-stone-300 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-between px-3 disabled:opacity-40"
                      >
                        <span>Redeem 200 Points</span>
                        <span>Rs. 200 Voucher</span>
                      </button>

                      <button
                        onClick={() => handleRedeem(400)}
                        disabled={currentUser.rewardsPoints < 400}
                        className="w-full py-2.5 bg-[#FAF8F5] hover:bg-[#702B3A] hover:text-white border border-stone-300 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-between px-3 disabled:opacity-40"
                      >
                        <span>Redeem 400 Points</span>
                        <span>Rs. 400 Voucher</span>
                      </button>
                    </div>
                  </div>

                  {/* Referral Card */}
                  <div className="p-4 bg-white border border-[#EAEAEA] rounded-xs space-y-3">
                    <div className="flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-[#B69A70]" />
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171513]">
                        Refer a Sister or Friend
                      </h4>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Share your personal referral code. When a friend places their first Cash on Delivery order, they receive <strong className="text-[#171513]">Rs. 500 OFF</strong>, and you earn <strong className="text-[#702B3A]">500 Points</strong> upon successful delivery!
                    </p>

                    <div className="pt-2">
                      <label className="block text-[10px] uppercase tracking-wider text-stone-400 mb-1">
                        Your Personal Referral Code
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="flex-1 px-3 py-2 bg-[#FAF8F5] border border-stone-300 font-mono text-xs font-bold text-[#702B3A] rounded-xs">
                          {currentUser.referralCode}
                        </span>
                        <button
                          onClick={copyReferralCode}
                          className="px-4 py-2 bg-[#171513] text-white text-xs font-semibold rounded-xs hover:bg-black transition-colors flex items-center gap-1.5"
                        >
                          {copiedReferral ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedReferral ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Loyalty Rules & Anti-Abuse Terms (Section 20 requirement) */}
                <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-xs text-xs text-stone-600 space-y-1.5">
                  <h5 className="font-semibold text-[#171513] uppercase tracking-wider text-[11px]">
                    Clear Loyalty Terms & Abuse Prevention:
                  </h5>
                  <p>• Points are granted only on <strong>genuine qualifying delivered Cash on Delivery orders</strong>, credited 7 days after delivery once the exchange window closes.</p>
                  <p>• Cancelled orders, returns, and failed delivery (RTO) parcels automatically forfeit earned reward points.</p>
                  <p>• Referral self-use, duplicate device registrations, and fake addresses are automatically blocked.</p>
                </div>
              </div>
            )}

            {/* TAB 3: SAVED ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171513]">
                    Delivery Addresses (Pakistan)
                  </h4>
                  <button
                    onClick={() => setShowAddAddress(!showAddAddress)}
                    className="text-xs text-[#702B3A] font-semibold hover:underline"
                  >
                    + Add New Address
                  </button>
                </div>

                {showAddAddress && (
                  <form onSubmit={handleAddNewAddress} className="p-4 bg-[#FAF8F5] border border-stone-300 rounded-xs space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="block text-stone-700 mb-1">Label</label>
                        <input
                          type="text"
                          required
                          value={newAddrLabel}
                          onChange={(e) => setNewAddrLabel(e.target.value)}
                          placeholder="e.g. Work, Mom's House"
                          className="w-full px-3 py-2 border rounded-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-700 mb-1">City</label>
                        <select
                          value={newAddrCity}
                          onChange={(e) => setNewAddrCity(e.target.value)}
                          className="w-full px-3 py-2 border rounded-xs bg-white"
                        >
                          {PAKISTAN_CITIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-stone-700 mb-1">Province</label>
                        <select
                          value={newAddrProvince}
                          onChange={(e) => setNewAddrProvince(e.target.value)}
                          className="w-full px-3 py-2 border rounded-xs bg-white"
                        >
                          {PAKISTAN_PROVINCES.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-stone-700 mb-1 text-xs">Full Street Address</label>
                      <input
                        type="text"
                        required
                        value={newAddrStreet}
                        onChange={(e) => setNewAddrStreet(e.target.value)}
                        placeholder="House / Apartment, Street, Area"
                        className="w-full px-3 py-2 border rounded-xs bg-white text-xs"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddAddress(false)}
                        className="px-4 py-1.5 border text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-1.5 bg-[#702B3A] text-white text-xs font-semibold rounded-xs"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentUser.savedAddresses.map((addr) => (
                    <div key={addr.id} className="p-4 border border-[#EAEAEA] rounded-xs bg-white space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-[#171513]">{addr.label}</span>
                        {addr.isDefault && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-xs">
                            Default COD
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-600">{addr.street}</p>
                      <p className="text-[11px] text-stone-500">{addr.city}, {addr.province}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: RECENTLY VIEWED PRODUCTS (Section 19) */}
            {activeTab === 'recentlyViewed' && (
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171513]">
                  Recently Viewed Pieces
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {recentProducts.map((prod) => (
                    <div
                      key={prod!.id}
                      onClick={() => {
                        setIsAccountOpen(false);
                        openProductDetail(prod!);
                      }}
                      className="p-2 border border-[#EAEAEA] rounded-xs bg-[#FAF8F5] cursor-pointer hover:border-[#702B3A] transition-all"
                    >
                      <img src={prod!.images[0]} alt={prod!.title} className="w-full aspect-[3/4] object-cover rounded-xs mb-1.5" />
                      <p className="text-[11px] font-medium text-[#171513] truncate">{prod!.title}</p>
                      <p className="text-[10px] text-[#702B3A] font-semibold">Rs. {prod!.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: PROFILE & CONSENT SETTINGS */}
            {activeTab === 'profile' && (
              <div className="space-y-5 max-w-lg">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171513]">
                  Personal Sizing & Retention Preferences
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-stone-700 mb-1">Pret Size Preference</label>
                    <select
                      value={currentUser.preferredSize}
                      onChange={(e) => updateUserProfile({ preferredSize: e.target.value })}
                      className="w-full px-3 py-2 text-xs border rounded-xs bg-white"
                    >
                      <option value="XS">XS (Bust 34")</option>
                      <option value="S">S (Bust 36")</option>
                      <option value="M">M (Bust 39")</option>
                      <option value="L">L (Bust 42")</option>
                      <option value="XL">XL (Bust 45")</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-stone-700 mb-1">Footwear Size (Khussas)</label>
                    <select
                      value={currentUser.preferredShoeSize}
                      onChange={(e) => updateUserProfile({ preferredShoeSize: e.target.value })}
                      className="w-full px-3 py-2 text-xs border rounded-xs bg-white"
                    >
                      <option value="36">36 EU</option>
                      <option value="37">37 EU</option>
                      <option value="38">38 EU</option>
                      <option value="39">39 EU</option>
                      <option value="40">40 EU</option>
                      <option value="41">41 EU</option>
                    </select>
                  </div>
                </div>

                {/* Consent-Based Abandoned Cart Recovery per Section 19 */}
                <div className="p-3 bg-[#FAF8F5] border border-stone-200 rounded-xs space-y-1">
                  <label className="flex items-start gap-2 text-xs text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cartRecoveryConsent}
                      onChange={(e) => setCartRecoveryConsent(e.target.checked)}
                      className="mt-0.5 accent-[#702B3A]"
                    />
                    <span>
                      <strong>Consent for Bag Recovery:</strong> Send a gentle WhatsApp reminder with my saved bag items if I step away before checkout.
                    </span>
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    onClick={logoutUser}
                    className="px-4 py-2 border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-semibold rounded-xs flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out of Account</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 6: BACK IN STOCK ALERTS */}
            {activeTab === 'alerts' && (
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171513]">
                  Your Back-in-Stock Alert Subscriptions
                </h4>
                {backInStockAlerts.length === 0 ? (
                  <p className="text-xs text-stone-500">
                    You have not subscribed to any out-of-stock alerts yet. When an article is sold out, click "Notify Me on WhatsApp" on its page to receive instant alerts upon restock.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {backInStockAlerts.map((alt, idx) => {
                      const prod = PRODUCTS.find((p) => p.id === alt.productId);
                      return (
                        <div key={idx} className="p-3 border border-[#EAEAEA] rounded-xs bg-[#FAF8F5] flex items-center justify-between text-xs">
                          <div>
                            <p className="font-semibold text-[#171513]">{prod?.title || alt.productId}</p>
                            <p className="text-stone-500 text-[11px]">Size: {alt.size} • WhatsApp: {alt.phone}</p>
                          </div>
                          <span className="text-emerald-700 font-medium text-[11px] bg-emerald-50 px-2 py-0.5 rounded-xs">
                            Active Alert
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
