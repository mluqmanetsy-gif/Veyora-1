import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  PackageCheck,
  AlertCircle,
  PhoneCall,
  ShieldCheck,
  MapPin,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { STORE_CONTACT } from '../data/policies.ts';

export const OrderTrackingModal: React.FC = () => {
  const { isTrackingOpen, setIsTrackingOpen, trackingPreloadId } = useStore();
  const [orderIdInput, setOrderIdInput] = useState(trackingPreloadId || 'VY-89241');
  const [verificationPhone, setVerificationPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [trackedOrder, setTrackedOrder] = useState<any | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (trackingPreloadId) {
      setOrderIdInput(trackingPreloadId);
    }
  }, [trackingPreloadId]);

  if (!isTrackingOpen) return null;

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!orderIdInput.trim()) {
      setError('Please enter your VEYORA Order Reference ID.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/orders/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderIdInput.trim(),
          verificationNumber: verificationPhone.trim()
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Order lookup failed.');
      }
      setTrackedOrder(data.order);
      setIsVerified(data.verified);
    } catch (err: any) {
      setError(err.message || 'Unable to locate order. Please verify your reference number.');
      setTrackedOrder(null);
    } finally {
      setLoading(false);
    }
  };

  // Section 18: Order Statuses
  const ALL_STATUSES = [
    'Order Received',
    'Order Confirmed',
    'Processing',
    'Dispatched',
    'In Transit',
    'Delivered'
  ];

  const getStatusIndex = (st: string) => {
    return ALL_STATUSES.indexOf(st);
  };

  const currentStatusIndex = trackedOrder ? getStatusIndex(trackedOrder.status) : -1;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-sm shadow-2xl overflow-hidden my-auto border border-[#EAEAEA]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FAF8F5] border-b border-[#EAEAEA]">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#702B3A]" />
            <div>
              <h2 className="text-base font-serif font-semibold tracking-wide text-[#171513]">
                Pakistan Courier Order Tracking
              </h2>
              <p className="text-[10px] uppercase tracking-wider text-[#B69A70] font-medium">
                Trax • Call Courier • Leopards Logistics
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsTrackingOpen(false)}
            className="p-1.5 text-stone-500 hover:text-black rounded-full hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[82vh] overflow-y-auto">
          {/* Tracking Search Form */}
          <form onSubmit={handleTrack} className="bg-[#FAF8F5] p-4 rounded-xs border border-[#EAEAEA] space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#171513] mb-1">
                  Order ID <span className="text-[#702B3A]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  placeholder="e.g. VY-89241"
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 focus:border-[#702B3A] focus:outline-none rounded-xs font-mono bg-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#171513] mb-1">
                  WhatsApp Number <span className="text-stone-400 font-normal">(For Full Details)</span>
                </label>
                <input
                  type="tel"
                  value={verificationPhone}
                  onChange={(e) => setVerificationPhone(e.target.value)}
                  placeholder="0300 1234567"
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 focus:border-[#702B3A] focus:outline-none rounded-xs font-mono bg-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-stone-500">
                Enter your WhatsApp number to unlock full recipient address and line items.
              </span>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-[#702B3A] hover:bg-[#551D2A] text-white text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{loading ? 'Searching...' : 'Track Order'}</span>
              </button>
            </div>
          </form>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Tracked Order Details */}
          {trackedOrder && (
            <div className="space-y-6 pt-2">
              {/* Order Summary Header */}
              <div className="p-4 bg-white border border-[#EAEAEA] rounded-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between border-b border-stone-100 pb-3 gap-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#B69A70] font-semibold">
                      Order Reference
                    </span>
                    <h3 className="text-lg font-mono font-bold text-[#171513]">
                      #{trackedOrder.id}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 block">
                      Current Status
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-xs bg-[#702B3A]/10 text-[#702B3A] border border-[#702B3A]/20">
                      {trackedOrder.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-stone-600">
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase">Destination</span>
                    <strong className="text-[#171513]">{trackedOrder.city}, {trackedOrder.province}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase">Courier Partner</span>
                    <strong className="text-[#171513]">{trackedOrder.courier}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase">Consignment No</span>
                    <strong className="text-stone-800 font-mono">{trackedOrder.trackingNumber}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase">Total Due (COD)</span>
                    <strong className="text-[#702B3A] font-bold">Rs. {trackedOrder.total.toLocaleString()}</strong>
                  </div>
                </div>

                {/* Privacy Warning / Verification State */}
                {!isVerified ? (
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xs text-[11px] text-amber-900 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                      <span>Private street address is masked. Enter your WhatsApp number above to verify.</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xs text-xs text-emerald-950 flex flex-col sm:flex-row justify-between gap-2">
                    <div>
                      <p className="font-semibold">Recipient: {trackedOrder.customerName}</p>
                      <p className="text-[11px] text-emerald-800">
                        {trackedOrder.address}, {trackedOrder.city} ({trackedOrder.whatsappNumber})
                      </p>
                    </div>
                    <span className="text-[10px] text-emerald-800 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified via WhatsApp
                    </span>
                  </div>
                )}
              </div>

              {/* 6 Formal Order Statuses Progression Bar (Section 18) */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#171513] block">
                  Shopify & Logistics Progress
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  {ALL_STATUSES.map((statusName, idx) => {
                    const isDone = idx <= currentStatusIndex;
                    const isCurrent = idx === currentStatusIndex;
                    return (
                      <div
                        key={statusName}
                        className={`p-2 rounded-xs border text-center transition-all ${
                          isCurrent
                            ? 'bg-[#702B3A] text-white border-[#702B3A] shadow-xs'
                            : isDone
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-stone-50 text-stone-400 border-stone-200'
                        }`}
                      >
                        <span className="text-[9px] uppercase tracking-wider font-semibold block">
                          Step 0{idx + 1}
                        </span>
                        <span className="text-[11px] font-medium leading-tight block mt-0.5">
                          {statusName}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Courier Fulfillment Activity Log */}
              {trackedOrder.fulfillmentEvents && trackedOrder.fulfillmentEvents.length > 0 && (
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#171513] block">
                    Fulfillment Milestones & Scans
                  </span>
                  <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                    {trackedOrder.fulfillmentEvents.map((evt: any, i: number) => (
                      <div key={i} className="relative flex items-start gap-3 text-xs">
                        <div className="absolute -left-6 w-4.5 h-4.5 rounded-full bg-[#702B3A] text-white flex items-center justify-center text-[10px]">
                          ✓
                        </div>
                        <div className="bg-[#FAF8F5] p-3 rounded-xs border border-[#EAEAEA] flex-1">
                          <div className="flex items-center justify-between text-stone-500 text-[10px] mb-1">
                            <span className="font-semibold text-[#702B3A] uppercase tracking-wider">
                              {evt.status}
                            </span>
                            <span>{evt.timestamp}</span>
                          </div>
                          <p className="text-[#171513] font-medium">{evt.description}</p>
                          <p className="text-stone-400 text-[10px] mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#B69A70]" />
                            <span>{evt.location}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Items in order if verified */}
              {isVerified && trackedOrder.items && (
                <div className="space-y-2 border-t border-stone-100 pt-3">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#171513] block">
                    Ordered Articles ({trackedOrder.items.length})
                  </span>
                  <div className="space-y-2">
                    {trackedOrder.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 p-2 border border-stone-200 rounded-xs bg-[#FAF8F5]">
                        <img src={item.image} alt={item.title} className="w-12 h-14 object-cover rounded-xs" />
                        <div className="flex-1 overflow-hidden text-xs">
                          <p className="font-medium text-[#171513] truncate">{item.title}</p>
                          <p className="text-[11px] text-stone-500">Size: {item.size} • Qty: {item.quantity}</p>
                        </div>
                        <span className="text-xs font-semibold text-[#702B3A]">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Help & WhatsApp Concierge */}
              <div className="p-3 bg-[#FAF8F5] border border-stone-200 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-stone-600">Need delivery assistance or address change?</span>
                <a
                  href={`${STORE_CONTACT.whatsappLink}?text=Hello%20VEYORA,%20inquiring%20about%20Order%20${trackedOrder.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xs transition-colors flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
