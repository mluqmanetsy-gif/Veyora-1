import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { PRODUCTS } from '../data/products.ts';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    shippingFee,
    freeShippingThreshold,
    openCheckout,
    openProductDetail
  } = useStore();

  if (!isCartOpen) return null;

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  // Recommendations for items not already in cart
  const cartProductIds = cart.map((c) => c.product.id);
  const recommendedItems = PRODUCTS.filter((p) => !cartProductIds.includes(p.id)).slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#EAEAEA]">
        {/* Header */}
        <div className="p-5 border-b border-[#EAEAEA] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#702B3A]" />
            <h2 className="text-base font-serif font-semibold tracking-wide text-[#171513]">
              Your Shopping Bag ({cart.length})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-stone-500 hover:text-black rounded-full hover:bg-stone-200/50 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping banner */}
        <div className="p-3.5 bg-[#FAF8F5] border-b border-[#EAEAEA] text-xs">
          {amountNeededForFreeShipping > 0 ? (
            <div>
              <p className="text-stone-700 font-medium text-center">
                Add <span className="text-[#702B3A] font-semibold">Rs. {amountNeededForFreeShipping.toLocaleString()}</span> more for <span className="font-semibold text-emerald-700">FREE Delivery</span> across Pakistan!
              </p>
              <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-[#702B3A] h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : (
            <p className="text-emerald-700 font-semibold text-center flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B69A70]" />
              You have unlocked FREE Nationwide Delivery!
            </p>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#EAEAEA]">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 bg-[#FAF8F5] text-stone-300 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-sm text-stone-500 font-light">Your shopping bag is currently empty.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-[#702B3A] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#551D2A] transition-colors rounded-xs cursor-pointer"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.product.id}-${item.selectedSize}`} className="py-4 flex gap-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-20 h-24 object-cover rounded-xs border border-[#EAEAEA] flex-shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h3 className="text-xs font-medium text-[#171513] line-clamp-1">
                        {item.product.title}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                        className="text-stone-400 hover:text-rose-600 p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Size: <span className="text-[#171513] font-medium">{item.selectedSize}</span> • Colour: {item.product.color.name}
                    </p>
                    <p className="text-xs font-semibold text-[#171513] mt-1">
                      Rs. {item.product.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                    <div className="flex items-center border border-stone-200 rounded-xs">
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.selectedSize, item.quantity - 1)
                        }
                        className="px-2 py-0.5 text-xs text-stone-600 hover:text-black font-semibold"
                      >
                        -
                      </button>
                      <span className="px-2.5 text-xs font-semibold text-[#171513]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.selectedSize, item.quantity + 1)
                        }
                        className="px-2 py-0.5 text-xs text-stone-600 hover:text-black font-semibold"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs font-semibold text-[#702B3A]">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Quick Recommendations inside Cart */}
          {cart.length > 0 && recommendedItems.length > 0 && (
            <div className="pt-6 mt-4">
              <span className="text-[10px] uppercase tracking-widest text-[#B69A70] font-semibold block mb-3">
                Pair With Your Selection
              </span>
              <div className="space-y-2">
                {recommendedItems.map((rec) => (
                  <div
                    key={rec.id}
                    onClick={() => {
                      setIsCartOpen(false);
                      openProductDetail(rec);
                    }}
                    className="p-2 border border-[#EAEAEA] rounded-xs flex items-center gap-3 bg-[#FAF8F5] hover:border-[#702B3A] transition-colors cursor-pointer"
                  >
                    <img
                      src={rec.images[0]}
                      alt={rec.title}
                      className="w-12 h-14 object-cover rounded-xs"
                    />
                    <div className="flex-1 overflow-hidden">
                      <p className="text-[10px] uppercase text-[#B69A70] tracking-wider truncate">
                        {rec.department}
                      </p>
                      <h4 className="text-xs font-medium text-[#171513] truncate">{rec.title}</h4>
                      <p className="text-xs font-semibold text-[#702B3A]">
                        Rs. {rec.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#EAEAEA] bg-[#FAF8F5] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-medium text-[#171513]">Rs. {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Estimated Delivery (Pakistan)</span>
                <span className="font-medium text-[#171513]">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-semibold">FREE</span>
                  ) : (
                    `Rs. ${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#171513] pt-2 border-t border-stone-200">
                <span>Total Due on Delivery</span>
                <span className="text-base text-[#702B3A]">
                  Rs. {(cartTotal + shippingFee).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-stone-500 justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B69A70]" />
              <span>Cash on Delivery Verified • No Prepayment Required</span>
            </div>

            <button
              onClick={openCheckout}
              className="w-full py-4 bg-[#702B3A] hover:bg-[#551D2A] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer rounded-xs"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
