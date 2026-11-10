import React from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../data/products.ts';
import { useStore } from '../context/StoreContext.tsx';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { wishlist, toggleWishlist, addToCart, openProductDetail } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'Standard';
    addToCart(product, defaultSize, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => openProductDetail(product)}
      className="group relative bg-white border border-[#EAEAEA] rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-[#B69A70]/60 cursor-pointer"
    >
      {/* Product Image Box */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#FAF8F5]">
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Secondary image hover swap if available */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.title} detail`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
          />
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer ${
            isWishlisted
              ? 'bg-[#702B3A] text-white shadow-md'
              : 'bg-white/85 text-[#171513] hover:bg-white hover:text-[#702B3A]'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isNewArrival && (
            <span className="bg-[#171513] text-white text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-xs">
              New
            </span>
          )}
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="bg-[#702B3A] text-white text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-xs">
              Sale
            </span>
          )}
          {!product.inStock && (
            <span className="bg-stone-600 text-white text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-xs">
              Sold Out
            </span>
          )}
        </div>

        {/* Quick Actions Overlay Bar */}
        <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between gap-2">
          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className="flex-1 py-2 bg-white hover:bg-[#702B3A] text-[#171513] hover:text-white text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm rounded-xs disabled:opacity-50"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{product.inStock ? 'Quick Add' : 'Out of Stock'}</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openProductDetail(product);
            }}
            className="p-2 bg-white/90 hover:bg-white text-[#171513] hover:text-[#702B3A] transition-colors rounded-xs"
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-grow justify-between space-y-2">
        <div>
          <div className="flex items-center justify-between text-[10px] text-[#595550] uppercase tracking-widest mb-1">
            <span>{product.subcategory}</span>
            <span className="flex items-center gap-1">
              <span
                className="w-2.5 h-2.5 rounded-full border border-stone-300"
                style={{ backgroundColor: product.color.hex }}
                title={product.color.name}
              />
              <span className="truncate max-w-[80px]">{product.color.name}</span>
            </span>
          </div>

          <h3 className="text-xs sm:text-sm font-medium text-[#171513] group-hover:text-[#702B3A] line-clamp-2 transition-colors leading-snug">
            {product.title}
          </h3>
        </div>

        <div className="pt-1 border-t border-[#EAEAEA]/80 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs sm:text-sm font-semibold text-[#171513]">
              Rs. {product.price.toLocaleString()}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-[11px] text-[#595550] line-through font-light">
                Rs. {product.compareAtPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Size Pills */}
          <div className="flex items-center gap-1 text-[10px] text-[#595550]">
            {product.sizes.slice(0, 3).map((s) => (
              <span key={s} className="bg-[#FAF8F5] px-1 py-0.5 rounded-xs border border-stone-200">
                {s}
              </span>
            ))}
            {product.sizes.length > 3 && (
              <span className="text-[9px] text-[#B69A70]">+{product.sizes.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
