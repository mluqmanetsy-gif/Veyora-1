import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Truck,
  MessageSquare,
  AlertCircle,
  ExternalLink,
  Copy,
  Tag
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { PAKISTAN_CITIES, PAKISTAN_PROVINCES } from '../data/products.ts';
import { STORE_CONTACT } from '../data/policies.ts';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    cartTotal,
    shippingFee,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    currentUser,
    setTrackingPreloadId,
    setIsTrackingOpen
  } = useStore();

  // Form State initialized with logged-in user profile if available
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [mobileNumber, setMobileNumber] = useState(
    currentUser?.whatsappNumber ? currentUser.whatsappNumber.replace('+92', '0') : ''
  );
  const [email, setEmail] = useState(currentUser?.email || '');
  const [address, setAddress] = useState(
    currentUser?.savedAddresses?.[0]?.street || ''
  );
  const [city, setCity] = useState(currentUser?.savedAddresses?.[0]?.city || 'Karachi');
  const [province, setProvince] = useState(currentUser?.savedAddresses?.[0]?.province || 'Sindh');
  const [postalCode, setPostalCode] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  // Promo code input
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  // Consents
  const [whatsappDeliveryConsent, setWhatsappDeliveryConsent] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [orderConfirmed, setOrderConfirmed] = useState<any | null>(null);
  const [copiedOrderId, setCopiedOrderId] = useState(false);

  if (!isCheckoutOpen) return null;

  // Validation helper for Pakistani Mobile Number
  const validatePhone = (num: string): { valid: boolean; normalized: string; error?: string } => {
    if (!num.trim()) {
      return { valid: false, normalized: '', error: 'WhatsApp / Mobile Number is mandatory for delivery confirmation.' };
    }

    const clean = num.replace(/[\s\-\(\)]/g, '');

    let normalized = clean;
    if (clean.startsWith('03') && clean.length === 11) {
      normalized = '+92' + clean.substring(1);
    } else if (clean.startsWith('3') && clean.length === 10) {
      normalized = '+92' + clean;
    } else if (clean.startsWith('+923') && clean.length === 13) {
      normalized = clean;
    } else if (clean.startsWith('923') && clean.length === 12) {
      normalized = '+' + clean;
    } else {
      return {
        valid: false,
        normalized: '',
        error: 'Please enter a valid Pakistani mobile number starting with 03 (e.g. 0300-1234567 or 0349-4968548).'
      };
    }

    return { valid: true, normalized };
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput.trim());
    setPromoMessage(res.message);
    if (res.success) {
      setPromoInput('');
    }
  };

  const discountAmount = appliedPromo?.discountAmount || 0;
  const finalTotal = Math.max(0, cartTotal - discountAmount) + shippingFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full customer name.');
      return;
    }

    const phoneCheck = validatePhone(mobileNumber);
    if (!phoneCheck.valid) {
      setErrorMessage(phoneCheck.error || 'Invalid WhatsApp number.');
      return;
    }

    if (!address.trim()) {
      setErrorMessage('Please provide your complete street delivery address.');
      return;
    }

    if (!city) {
      setErrorMessage('Please select your destination city.');
      return;
    }

    if (cart.length === 0) {
      setErrorMessage('Your cart is empty.');
      return;
    }

    setSubmitting(true);

    const payload = {
      customerName: fullName.trim(),
      whatsappNumber: phoneCheck.normalized,
      email: email.trim(),
      address: address.trim(),
      city,
      province,
      postalCode: postalCode.trim(),
      notes: orderNotes.trim(),
      items: cart.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        price: item.product.price,
        size: item.selectedSize,
        quantity: item.quantity,
        image: item.product.images[0]
      })),
      subtotal: cartTotal,
      discount: discountAmount,
      shipping: shippingFee,
      total: finalTotal,
      whatsappConsent: whatsappDeliveryConsent,
      marketingConsent
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit order.');
      }

      setOrderConfirmed(data);
      clearCart();
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error while placing order.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyOrderNumber = () => {
    if (orderConfirmed?.order?.id) {
      navigator.clipboard?.writeText(orderConfirmed.order.id);
      setCopiedOrderId(true);
      setTimeout(() => setCopiedOrderId(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-sm shadow-2xl overflow-hidden my-auto border border-[#EAEAEA]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FAF8F5] border-b border-[#EAEAEA]">
          <div className="flex items-center gap-2">
            <span className="text-xl font-serif font-bold tracking-widest text-[#171513]">
              VEYORA
            </span>
            <span className="text-stone-300">|</span>
            <span className="text-xs uppercase tracking-widest text-[#702B3A] font-semibold">
              Cash on Delivery Checkout (Pakistan)
            </span>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-stone-500 hover:text-black rounded-full hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation State View */}
        {orderConfirmed ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#171513]">
                Thank You for Shopping with VEYORA!
              </h2>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                Your order has been recorded. Our Karachi dispatch team will verify and hand over your parcel to Trax / Call Courier.
              </p>
            </div>

            {/* Order Card */}
            <div className="bg-[#FAF8F5] border border-[#EAEAEA] p-5 rounded-xs space-y-3">
              <div className="flex flex-wrap items-center justify-between border-b border-stone-200 pb-3 gap-2">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#B69A70] font-semibold block">
                    Order Reference ID
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-mono font-bold text-[#702B3A]">
                      #{orderConfirmed.order.id}
                    </span>
                    <button
                      onClick={copyOrderNumber}
                      className="text-stone-400 hover:text-black p-1 text-xs flex items-center gap-1"
                      title="Copy ID"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedOrderId ? 'Copied' : ''}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-widest text-stone-500 block">
                    Payment Method
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-xs">
                    Cash on Delivery (Pay at Doorstep)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700 pt-1">
                <div>
                  <p><strong>Customer:</strong> {orderConfirmed.order.customerName}</p>
                  <p><strong>WhatsApp:</strong> {orderConfirmed.order.whatsappNumber}</p>
                  <p><strong>Destination:</strong> {orderConfirmed.order.address}, {orderConfirmed.order.city}</p>
                </div>
                <div>
                  <p><strong>Total Due upon Delivery:</strong> <span className="font-bold text-[#702B3A]">Rs. {orderConfirmed.order.total.toLocaleString()}</span></p>
                  <p><strong>Courier Partner:</strong> {orderConfirmed.order.courier}</p>
                  <p><strong>Tracking No:</strong> {orderConfirmed.order.trackingNumber}</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Confirmation Concierge Action */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-emerald-700 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-emerald-950">
                  <p className="font-semibold">Instant WhatsApp Order Confirmation</p>
                  <p className="text-emerald-800 text-[11px] mt-0.5">
                    Click below to open our WhatsApp concierge chat ({STORE_CONTACT.whatsappFormatted}) with your prefilled order summary for priority packing.
                  </p>
                </div>
              </div>

              <a
                href={orderConfirmed.whatsappConfirmationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center gap-2 flex-shrink-0 shadow-sm"
              >
                <span>Confirm on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setTrackingPreloadId(orderConfirmed.order.id);
                  setOrderConfirmed(null);
                  setIsCheckoutOpen(false);
                  setIsTrackingOpen(true);
                }}
                className="px-6 py-2.5 border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs uppercase tracking-widest font-semibold rounded-xs"
              >
                Track This Order
              </button>
              <button
                onClick={() => {
                  setOrderConfirmed(null);
                  setIsCheckoutOpen(false);
                }}
                className="px-8 py-2.5 bg-[#171513] text-white text-xs uppercase tracking-widest font-semibold hover:bg-black transition-colors rounded-xs"
              >
                Return to Storefront
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form View */
          <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-6">
            {errorMessage && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Section 1: Customer Contact with MANDATORY WhatsApp Number */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-[#EAEAEA] pb-2">
                <span className="w-5 h-5 rounded-full bg-[#702B3A] text-white text-xs flex items-center justify-center font-medium">
                  1
                </span>
                <h3 className="text-sm uppercase tracking-widest font-semibold text-[#171513]">
                  Customer & Contact Details
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#171513] uppercase tracking-wider mb-1">
                    Full Name <span className="text-[#702B3A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ayesha Malik"
                    className="w-full px-3.5 py-2.5 text-xs border border-stone-300 focus:border-[#702B3A] focus:outline-none rounded-xs"
                  />
                </div>

                {/* MANDATORY WhatsApp / Mobile Number */}
                <div>
                  <label className="block text-xs font-medium text-[#171513] uppercase tracking-wider mb-1">
                    WhatsApp / Mobile Number <span className="text-[#702B3A]">* (Mandatory)</span>
                  </label>
                  <div className="flex gap-1.5">
                    <span className="px-3 py-2.5 bg-[#FAF8F5] border border-stone-300 text-xs text-stone-700 font-medium rounded-xs flex items-center">
                      🇵🇰 +92
                    </span>
                    <input
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="0300 1234567"
                      className="flex-1 px-3.5 py-2.5 text-xs border border-stone-300 focus:border-[#702B3A] focus:outline-none rounded-xs font-mono"
                    />
                  </div>
                  <p className="text-[10px] text-stone-500 mt-1 italic">
                    We need your WhatsApp number to confirm your order and share important delivery updates.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#171513] uppercase tracking-wider mb-1">
                  Email Address <span className="text-stone-400 font-normal">(Optional for digital invoice)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 text-xs border border-stone-300 focus:border-[#702B3A] focus:outline-none rounded-xs"
                />
              </div>

              {/* WhatsApp Consent Checkbox (REQUIRED separately per spec) */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 text-xs text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={whatsappDeliveryConsent}
                    onChange={(e) => setWhatsappDeliveryConsent(e.target.checked)}
                    className="mt-0.5 accent-[#702B3A]"
                  />
                  <span>
                    <strong>I agree to receive order confirmation and delivery updates on WhatsApp.</strong>
                  </span>
                </label>
              </div>

              <div>
                <label className="flex items-start gap-2.5 text-xs text-stone-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    className="mt-0.5 accent-[#702B3A]"
                  />
                  <span>
                    Keep me updated with exclusive VEYORA festive pret previews and luxury drops. (Optional)
                  </span>
                </label>
              </div>
            </div>

            {/* Section 2: Delivery Address across Pakistan */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 border-b border-[#EAEAEA] pb-2">
                <span className="w-5 h-5 rounded-full bg-[#702B3A] text-white text-xs flex items-center justify-center font-medium">
                  2
                </span>
                <h3 className="text-sm uppercase tracking-widest font-semibold text-[#171513]">
                  Delivery Address (Pakistan)
                </h3>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#171513] uppercase tracking-wider mb-1">
                  Street Address & House / Flat No. <span className="text-[#702B3A]">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. House 24-A, Street 7, Phase 5 DHA"
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 focus:border-[#702B3A] focus:outline-none rounded-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#171513] uppercase tracking-wider mb-1">
                    City <span className="text-[#702B3A]">*</span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-[#702B3A] focus:outline-none rounded-xs bg-white"
                  >
                    {PAKISTAN_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#171513] uppercase tracking-wider mb-1">
                    Province <span className="text-[#702B3A]">*</span>
                  </label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-[#702B3A] focus:outline-none rounded-xs bg-white"
                  >
                    {PAKISTAN_PROVINCES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#171513] uppercase tracking-wider mb-1">
                    Postal Code <span className="text-stone-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="e.g. 75500"
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 focus:border-[#702B3A] focus:outline-none rounded-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#171513] uppercase tracking-wider mb-1">
                  Special Delivery Instructions <span className="text-stone-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Call before arrival or leave with security"
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 focus:border-[#702B3A] focus:outline-none rounded-xs"
                />
              </div>
            </div>

            {/* Promo / Referral Voucher Entry */}
            <div className="pt-2">
              <label className="block text-xs font-medium text-[#171513] uppercase tracking-wider mb-1">
                Have a VEYORA Rewards Code or Referral Voucher?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Enter code (e.g. REWARD-200 or VEYORA500)"
                  className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded-xs uppercase font-mono"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-stone-800 text-white text-xs font-semibold rounded-xs hover:bg-black"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p className="text-[11px] text-stone-600 mt-1 italic">{promoMessage}</p>
              )}
            </div>

            {/* Section 3: Payment Method (Cash on Delivery) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 border-b border-[#EAEAEA] pb-2">
                <span className="w-5 h-5 rounded-full bg-[#702B3A] text-white text-xs flex items-center justify-center font-medium">
                  3
                </span>
                <h3 className="text-sm uppercase tracking-widest font-semibold text-[#171513]">
                  Approved Payment Method
                </h3>
              </div>

              <div className="p-4 border-2 border-[#702B3A] bg-[#702B3A]/5 rounded-xs flex items-start gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={true}
                  readOnly
                  className="mt-1 accent-[#702B3A]"
                />
                <div className="text-xs">
                  <p className="font-semibold text-[#171513] uppercase tracking-wider">
                    Cash on Delivery (COD)
                  </p>
                  <p className="text-stone-600 mt-0.5">
                    Pay safely in Pakistani Rupees to the delivery rider at your doorstep. Zero prepayment risk.
                  </p>
                </div>
              </div>
            </div>

            {/* Order Review Box */}
            <div className="p-4 bg-[#FAF8F5] border border-[#EAEAEA] rounded-xs space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Items ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                <span className="font-medium text-[#171513]">Rs. {cartTotal.toLocaleString()}</span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>Voucher ({appliedPromo.code})</span>
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-stone-400 hover:text-rose-600 ml-1"
                    >
                      (Remove)
                    </button>
                  </span>
                  <span>- Rs. {appliedPromo.discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600">
                <span>Nationwide Shipping</span>
                <span className="font-medium text-[#171513]">
                  {shippingFee === 0 ? <span className="text-emerald-700 font-semibold">FREE</span> : `Rs. ${shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between text-sm font-semibold text-[#171513] pt-2 border-t border-stone-200">
                <span>Total Due on Delivery (PKR)</span>
                <span className="text-base text-[#702B3A]">
                  Rs. {finalTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-[#702B3A] hover:bg-[#551D2A] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer disabled:opacity-50 rounded-xs"
            >
              {submitting ? (
                <span>Confirming Order...</span>
              ) : (
                <span>Confirm Order via Cash on Delivery</span>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B69A70]" />
              <span>7-Day Exchange Policy • Karachi Central Fulfillment</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
