import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { PRODUCTS } from '../data/products.ts';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    openProductDetail
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = wishlist
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#EAEAEA]">
        {/* Header */}
        <div className="p-5 border-b border-[#EAEAEA] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#702B3A] fill-current" />
            <h2 className="text-base font-serif font-semibold tracking-wide text-[#171513]">
              Your Wishlist ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 text-stone-500 hover:text-black rounded-full hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#EAEAEA]">
          {wishlistedProducts.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <Heart className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="text-sm text-stone-500 font-light">Your wishlist is currently empty.</p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-6 py-2 bg-[#702B3A] text-white text-xs uppercase tracking-wider font-medium rounded-xs"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            wishlistedProducts.map((prod) => (
              <div key={prod!.id} className="py-4 flex gap-4">
                <img
                  src={prod!.images[0]}
                  alt={prod!.title}
                  onClick={() => {
                    setIsWishlistOpen(false);
                    openProductDetail(prod!);
                  }}
                  className="w-20 h-24 object-cover rounded-xs border border-[#EAEAEA] flex-shrink-0 cursor-pointer"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h3
                        onClick={() => {
                          setIsWishlistOpen(false);
                          openProductDetail(prod!);
                        }}
                        className="text-xs font-medium text-[#171513] hover:text-[#702B3A] line-clamp-1 cursor-pointer"
                      >
                        {prod!.title}
                      </h3>
                      <button
                        onClick={() => toggleWishlist(prod!.id)}
                        className="text-stone-400 hover:text-rose-600 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      {prod!.department} • {prod!.subcategory}
                    </p>
                    <p className="text-xs font-semibold text-[#171513] mt-1">
                      Rs. {prod!.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        const defaultSize = prod!.sizes[0] || 'Standard';
                        addToCart(prod!, defaultSize, 1);
                        setIsWishlistOpen(false);
                      }}
                      className="w-full py-2 bg-[#702B3A] hover:bg-[#551D2A] text-white text-[11px] uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
