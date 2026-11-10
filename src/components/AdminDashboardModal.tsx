import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  DollarSign,
  TrendingUp,
  ShoppingBag,
  Percent,
  Calculator,
  RefreshCw,
  CheckCircle,
  Truck,
  AlertTriangle,
  RotateCcw,
  Sliders,
  PhoneCall
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { PRODUCTS } from '../data/products.ts';
import { STORE_CONTACT } from '../data/policies.ts';

export const AdminDashboardModal: React.FC = () => {
  const { isAdminOpen, setIsAdminOpen } = useStore();

  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Metrics state
  const [metrics, setMetrics] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'inventory' | 'calculator'>('overview');

  // Profit Calculator State (Section 23)
  const [calcSellingPrice, setCalcSellingPrice] = useState('9850');
  const [calcProductCost, setCalcProductCost] = useState('4200');
  const [calcShippingCost, setCalcShippingCost] = useState('200');
  const [calcCodPercentage, setCalcCodPercentage] = useState('3'); // Trax/Call Courier 3% COD fee
  const [calcMarketingCost, setCalcMarketingCost] = useState('1200'); // Meta ads per order in PK
  const [calcOtherExpenses, setCalcOtherExpenses] = useState('450'); // Packaging & box

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/metrics');
      const data = await res.json();
      setMetrics(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdminOpen && isAuthenticated) {
      fetchMetrics();
    }
  }, [isAdminOpen, isAuthenticated]);

  if (!isAdminOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Access denied.');
      }
      setIsAuthenticated(true);
      fetchMetrics();
    } catch (err: any) {
      setAuthError(err.message || 'Invalid passcode.');
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchMetrics();
    } catch (err) {
      console.error(err);
    }
  };

  // Calculations for Profit Calculator
  const sellingPrice = parseFloat(calcSellingPrice) || 0;
  const productCost = parseFloat(calcProductCost) || 0;
  const shippingCost = parseFloat(calcShippingCost) || 0;
  const codFee = (sellingPrice * (parseFloat(calcCodPercentage) || 0)) / 100;
  const marketingCost = parseFloat(calcMarketingCost) || 0;
  const otherExpenses = parseFloat(calcOtherExpenses) || 0;

  const totalCostPerOrder = productCost + shippingCost + codFee + marketingCost + otherExpenses;
  const netProfit = sellingPrice - totalCostPerOrder;
  const profitMarginPercent = sellingPrice > 0 ? ((netProfit / sellingPrice) * 100).toFixed(1) : '0';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-white rounded-sm shadow-2xl overflow-hidden my-auto border border-[#EAEAEA]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#171513] text-white">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#B69A70]" />
            <div>
              <h2 className="text-base font-serif font-semibold tracking-wide">
                VEYORA Merchant Intelligence & Operations
              </h2>
              <p className="text-[10px] uppercase tracking-wider text-[#B69A70]">
                Karachi HQ • Cash on Delivery Logistics
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Admin Login Gate */
          <div className="p-8 sm:p-12 max-w-sm mx-auto space-y-4">
            <div className="text-center space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#702B3A] font-semibold">
                Restricted Access
              </span>
              <h3 className="text-xl font-serif font-bold text-[#171513]">
                Administrator Authentication
              </h3>
              <p className="text-xs text-stone-500">
                Enter your administrative security PIN to access live sales metrics and COD order verification.
              </p>
            </div>

            {authError && (
              <div className="p-2.5 bg-rose-50 text-rose-800 text-xs rounded-xs border border-rose-200">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter PIN (Default: veyora2026)"
                className="w-full px-3.5 py-2.5 text-xs border border-stone-300 focus:border-[#702B3A] focus:outline-none rounded-xs font-mono"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-[#702B3A] hover:bg-[#551D2A] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors"
              >
                Unlock Operations Console
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="p-6 max-h-[82vh] overflow-y-auto space-y-6">
            {/* Navigation Tabs */}
            <div className="flex overflow-x-auto no-scrollbar gap-2 border-b border-[#EAEAEA] pb-2 text-xs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 rounded-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === 'overview' ? 'bg-[#702B3A] text-white' : 'text-stone-600 hover:text-black'
                }`}
              >
                Executive Overview
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3 py-1.5 rounded-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === 'orders' ? 'bg-[#702B3A] text-white' : 'text-stone-600 hover:text-black'
                }`}
              >
                COD Orders & Verification
              </button>
              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-3 py-1.5 rounded-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === 'inventory' ? 'bg-[#702B3A] text-white' : 'text-stone-600 hover:text-black'
                }`}
              >
                Inventory Status
              </button>
              <button
                onClick={() => setActiveTab('calculator')}
                className={`px-3 py-1.5 rounded-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                  activeTab === 'calculator' ? 'bg-[#702B3A] text-white' : 'text-stone-600 hover:text-black'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Profit Calculator</span>
              </button>
            </div>

            {/* TAB 1: EXECUTIVE OVERVIEW */}
            {activeTab === 'overview' && metrics && (
              <div className="space-y-6">
                {/* 4 Top KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-[#FAF8F5] border border-[#EAEAEA] rounded-xs space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block">
                      Total Revenue (PKR)
                    </span>
                    <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#171513]">
                      Rs. {metrics.totalSales.toLocaleString()}
                    </h4>
                    <span className="text-[10px] text-emerald-700 font-medium">All COD Orders</span>
                  </div>

                  <div className="p-4 bg-[#FAF8F5] border border-[#EAEAEA] rounded-xs space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block">
                      Total Orders
                    </span>
                    <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#171513]">
                      {metrics.totalOrders}
                    </h4>
                    <span className="text-[10px] text-stone-500">
                      {metrics.deliveredOrdersCount} Delivered • {metrics.activeOrdersCount} Active
                    </span>
                  </div>

                  <div className="p-4 bg-[#FAF8F5] border border-[#EAEAEA] rounded-xs space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block">
                      Average Order Value (AOV)
                    </span>
                    <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#702B3A]">
                      Rs. {metrics.avgOrderValue.toLocaleString()}
                    </h4>
                    <span className="text-[10px] text-stone-500">Per customer checkout</span>
                  </div>

                  <div className="p-4 bg-[#FAF8F5] border border-[#EAEAEA] rounded-xs space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block">
                      RTO Rate (Courier)
                    </span>
                    <h4 className="text-xl sm:text-2xl font-serif font-bold text-emerald-700">
                      {metrics.rtoRate}%
                    </h4>
                    <span className="text-[10px] text-stone-500">Well below Pakistan 18% avg</span>
                  </div>
                </div>

                {/* Department Sales Breakdown */}
                <div className="p-4 border border-[#EAEAEA] rounded-xs bg-white space-y-3">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171513]">
                    Revenue by Storefront Department
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {Object.entries(metrics.departmentSales).map(([dept, amount]: any) => (
                      <div key={dept} className="p-3 bg-[#FAF8F5] rounded-xs border border-stone-200">
                        <span className="text-[10px] uppercase font-semibold text-[#B69A70] block">
                          {dept}
                        </span>
                        <span className="text-sm font-bold text-[#171513] block mt-0.5">
                          Rs. {amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: COD ORDERS & VERIFICATION (Section 23) */}
            {activeTab === 'orders' && metrics && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171513]">
                    Cash on Delivery Queue & Status Controls
                  </h4>
                  <button
                    onClick={fetchMetrics}
                    className="text-xs text-[#702B3A] font-semibold hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Refresh</span>
                  </button>
                </div>

                <div className="overflow-x-auto border border-[#EAEAEA] rounded-xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FAF8F5] border-b border-[#EAEAEA] text-[#171513] font-semibold">
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Customer & City</th>
                        <th className="p-3">WhatsApp Number</th>
                        <th className="p-3">Total (PKR)</th>
                        <th className="p-3">Courier</th>
                        <th className="p-3">Current Status</th>
                        <th className="p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {metrics.orders.map((o: any) => (
                        <tr key={o.id} className="hover:bg-stone-50/70">
                          <td className="p-3 font-mono font-bold text-[#702B3A]">#{o.id}</td>
                          <td className="p-3">
                            <strong className="text-[#171513] block">{o.customerName}</strong>
                            <span className="text-[10px] text-stone-500">{o.city}, {o.province}</span>
                          </td>
                          <td className="p-3 font-mono text-[11px]">{o.whatsappNumber}</td>
                          <td className="p-3 font-semibold text-[#171513]">Rs. {o.total.toLocaleString()}</td>
                          <td className="p-3 text-[11px] text-stone-600">{o.courier}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-xs text-[10px] font-semibold bg-[#702B3A]/10 text-[#702B3A]">
                              {o.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <select
                              value={o.status}
                              onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                              className="px-2 py-1 text-[11px] border border-stone-300 rounded-xs bg-white focus:outline-none"
                            >
                              <option value="Order Received">Order Received</option>
                              <option value="Order Confirmed">Order Confirmed</option>
                              <option value="Processing">Processing</option>
                              <option value="Dispatched">Dispatched</option>
                              <option value="In Transit">In Transit</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: INVENTORY STATUS */}
            {activeTab === 'inventory' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171513]">
                    Catalogue Inventory & Stock Warning Levels
                  </h4>
                  <span className="text-[11px] text-stone-500">{PRODUCTS.length} Total SKUs</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {PRODUCTS.map((p) => {
                    const isLow = p.stockCount <= 10;
                    return (
                      <div key={p.id} className="p-3 border border-[#EAEAEA] rounded-xs bg-[#FAF8F5] flex gap-3">
                        <img src={p.images[0]} alt={p.title} className="w-14 h-18 object-cover rounded-xs" />
                        <div className="flex-1 overflow-hidden text-xs">
                          <p className="text-[10px] uppercase text-[#B69A70] font-semibold truncate">{p.department}</p>
                          <h5 className="font-medium text-[#171513] truncate">{p.title}</h5>
                          <p className="text-[#702B3A] font-semibold mt-1">Rs. {p.price.toLocaleString()}</p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className={`w-2 h-2 rounded-full ${isLow ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                            <span className={`text-[10px] font-semibold ${isLow ? 'text-amber-700' : 'text-emerald-700'}`}>
                              {p.stockCount} Available in Karachi
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 4: INTERACTIVE PROFIT CALCULATOR (Section 23 requirement) */}
            {activeTab === 'calculator' && (
              <div className="p-5 bg-[#FAF8F5] border border-[#EAEAEA] rounded-sm space-y-6">
                <div className="border-b border-stone-200 pb-3">
                  <h4 className="text-sm uppercase tracking-wider font-semibold text-[#171513]">
                    Pakistan Fashion Unit Economics & Profit Calculator
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Calculate net margins for Pakistani luxury pret accounting for fabrics, Trax/Call Courier shipping, COD remittance fees, and marketing cost.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-700 mb-1 font-medium">Selling Price (PKR)</label>
                    <input
                      type="number"
                      value={calcSellingPrice}
                      onChange={(e) => setCalcSellingPrice(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xs bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 mb-1 font-medium">Product & Fabric Cost (PKR)</label>
                    <input
                      type="number"
                      value={calcProductCost}
                      onChange={(e) => setCalcProductCost(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xs bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 mb-1 font-medium">Customer Shipping Cost (PKR)</label>
                    <input
                      type="number"
                      value={calcShippingCost}
                      onChange={(e) => setCalcShippingCost(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xs bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 mb-1 font-medium">COD Collection Fee (%)</label>
                    <input
                      type="number"
                      value={calcCodPercentage}
                      onChange={(e) => setCalcCodPercentage(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xs bg-white font-mono"
                    />
                    <span className="text-[10px] text-stone-400 mt-0.5 block">Rs. {codFee.toLocaleString()} on this order</span>
                  </div>

                  <div>
                    <label className="block text-stone-700 mb-1 font-medium">Marketing Ad Spend per Order (PKR)</label>
                    <input
                      type="number"
                      value={calcMarketingCost}
                      onChange={(e) => setCalcMarketingCost(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xs bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 mb-1 font-medium">Packaging & Other Expenses (PKR)</label>
                    <input
                      type="number"
                      value={calcOtherExpenses}
                      onChange={(e) => setCalcOtherExpenses(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xs bg-white font-mono"
                    />
                  </div>
                </div>

                {/* Calculation Output Cards */}
                <div className="pt-4 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-white border border-[#EAEAEA] rounded-xs text-center space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block">
                      Cost Per Order (CPO)
                    </span>
                    <span className="text-xl font-mono font-bold text-stone-800">
                      Rs. {Math.round(totalCostPerOrder).toLocaleString()}
                    </span>
                  </div>

                  <div className="p-4 bg-white border border-[#EAEAEA] rounded-xs text-center space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block">
                      Net Profit (PKR)
                    </span>
                    <span className={`text-xl font-mono font-bold ${netProfit >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                      Rs. {Math.round(netProfit).toLocaleString()}
                    </span>
                  </div>

                  <div className="p-4 bg-white border border-[#EAEAEA] rounded-xs text-center space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block">
                      Net Profit Margin
                    </span>
                    <span className={`text-xl font-mono font-bold ${parseFloat(profitMarginPercent) >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {profitMarginPercent}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
