import React, { useState } from 'react';
import { COMPLETE_LOOK_SETS, PRODUCTS, Product } from '../data/products.ts';
import { useStore } from '../context/StoreContext.tsx';
import { Sparkles, Check, ShoppingBag } from 'lucide-react';

export const CompleteTheLookSection: React.FC = () => {
  const { addToCart, openProductDetail, setIsCartOpen } = useStore();
  const [activeSetIndex, setActiveSetIndex] = useState(0);

  const activeSet = COMPLETE_LOOK_SETS[activeSetIndex];
  const items = activeSet.productIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  // Track which items in the look are selected by default (all selected initially)
  const [selectedIds, setSelectedIds] = useState<string[]>(activeSet.productIds);

  const toggleItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSetChange = (idx: number) => {
    setActiveSetIndex(idx);
    setSelectedIds(COMPLETE_LOOK_SETS[idx].productIds);
  };

  const selectedItems = items.filter((item) => selectedIds.includes(item.id));
  const setTotal = selectedItems.reduce((sum, item) => sum + item.price, 0);

  const handleAddAllToCart = () => {
    selectedItems.forEach((item) => {
      const defaultSize = item.sizes[0] || 'Standard';
      addToCart(item, defaultSize, 1);
    });
    setIsCartOpen(true);
  };

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#B69A70] font-semibold block mb-1">
            Editorial Ensemble
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#171513]">
            Complete the Look
          </h2>
          <div className="w-12 h-0.5 bg-[#702B3A] mx-auto mt-3" />
        </div>

        {/* Set Selector Tabs */}
        <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
          {COMPLETE_LOOK_SETS.map((set, idx) => (
            <button
              key={set.id}
              onClick={() => handleSetChange(idx)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-xs transition-all cursor-pointer whitespace-nowrap ${
                activeSetIndex === idx
                  ? 'bg-[#702B3A] text-white shadow-sm'
                  : 'bg-[#FAF8F5] text-stone-600 hover:text-black border border-[#EAEAEA]'
              }`}
            >
              {set.name}
            </button>
          ))}
        </div>

        {/* Look Display Card */}
        <div className="bg-[#FAF8F5] border border-[#EAEAEA] rounded-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Editorial Mood Photo */}
            <div className="lg:col-span-5 relative aspect-[4/5] rounded-xs overflow-hidden border border-[#EAEAEA] shadow-md">
              <img
                src={activeSet.bannerImage}
                alt={activeSet.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="text-[10px] uppercase tracking-widest text-[#B69A70] font-semibold">
                  Curated Head-to-Toe Styling
                </span>
                <h3 className="text-2xl font-serif text-white font-light">
                  {activeSet.name}
                </h3>
                <p className="text-xs text-[#EAEAEA] mt-1 font-light">
                  {activeSet.tagline}
                </p>
              </div>
            </div>

            {/* Right: Selectable Items and Add-All Control */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#171513] block mb-3">
                  Select Items to Bundle:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {items.map((item) => {
                    const isChecked = selectedIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`p-3 bg-white border rounded-xs flex items-center gap-3 transition-all cursor-pointer ${
                          isChecked
                            ? 'border-[#702B3A] ring-1 ring-[#702B3A]'
                            : 'border-[#EAEAEA] opacity-60'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-xs border flex items-center justify-center flex-shrink-0 transition-colors ${
                            isChecked
                              ? 'bg-[#702B3A] border-[#702B3A] text-white'
                              : 'border-stone-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>

                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-14 h-18 object-cover rounded-xs border border-stone-100 flex-shrink-0"
                        />

                        <div className="flex-1 overflow-hidden">
                          <p className="text-[9px] uppercase tracking-wider text-[#B69A70] truncate">
                            {item.department} • {item.subcategory}
                          </p>
                          <h4 className="text-xs font-medium text-[#171513] truncate mt-0.5">
                            {item.title}
                          </h4>
                          <p className="text-xs font-semibold text-[#702B3A] mt-1">
                            Rs. {item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bundle Action */}
              <div className="pt-4 border-t border-[#EAEAEA] flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xs border">
                <div>
                  <span className="text-xs text-stone-500 block">
                    Selected Items ({selectedItems.length} of {items.length}):
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-[#171513]">
                      Rs. {setTotal.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold">
                      (Cash on Delivery Eligible)
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleAddAllToCart}
                  disabled={selectedItems.length === 0}
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#702B3A] hover:bg-[#551D2A] text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 rounded-xs shadow-md cursor-pointer disabled:opacity-50"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add {selectedItems.length} Items to Bag</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
