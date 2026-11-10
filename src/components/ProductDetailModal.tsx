import React, { useState } from 'react';
import {
  X,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ZoomIn,
  Sparkles,
  HelpCircle,
  Share2
} from 'lucide-react';
import { Product, PRODUCTS } from '../data/products.ts';
import { useStore } from '../context/StoreContext.tsx';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose
}) => {
  const { addToCart, wishlist, toggleWishlist, openCheckout, openProductDetail } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'sizeGuide' | 'shipping'>('details');
  const [isZoomed, setIsZoomed] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  if (!product) return null;

  // Set default size if not selected
  const currentSize = selectedSize || product.sizes[0] || 'Standard';
  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product, currentSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, currentSize, quantity);
    onClose();
    openCheckout();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Find related products
  const similarProducts = PRODUCTS.filter(
    (p) => p.department === product.department && p.id !== product.id
  ).slice(0, 3);

  // Complete the look products
  const completeLookProducts = (product.completeLookIds || [])
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-white rounded-sm shadow-2xl overflow-hidden my-auto border border-[#EAEAEA]">
        {/* Top Close Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-[#EAEAEA]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B69A70] font-semibold">
            VEYORA Boutique • {product.department}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-1.5 text-stone-500 hover:text-[#702B3A] transition-colors"
              title="Share link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copySuccess && (
              <span className="text-xs text-emerald-600 font-medium">Copied!</span>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-[#171513] hover:text-[#702B3A] rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Close product view"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Image Gallery */}
            <div className="lg:col-span-7 space-y-4">
              <div
                className="relative aspect-[4/5] bg-[#FAF8F5] overflow-hidden rounded-sm border border-[#EAEAEA] cursor-zoom-in"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.title}
                  className={`w-full h-full object-cover object-center transition-transform duration-300 ${
                    isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100'
                  }`}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(!isZoomed);
                  }}
                  className="absolute bottom-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-md text-stone-700 hover:text-[#702B3A]"
                  title="Toggle Zoom"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnails row */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-24 flex-shrink-0 rounded-xs overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#702B3A] ring-1 ring-[#702B3A]'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Purchase Actions */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                {/* Department & Subcategory */}
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#B69A70] mb-2 font-medium">
                  <span>{product.subcategory}</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    {product.inStock ? `${product.stockCount} Pieces Available` : 'Sold Out'}
                  </span>
                </div>

                {/* Product Title */}
                <h1 className="text-2xl sm:text-3xl font-serif font-light text-[#171513] leading-snug">
                  {product.title}
                </h1>

                {/* Price in PKR */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl font-semibold text-[#171513]">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  {product.compareAtPrice && product.compareAtPrice > product.price && (
                    <>
                      <span className="text-base text-stone-400 line-through font-light">
                        Rs. {product.compareAtPrice.toLocaleString()}
                      </span>
                      <span className="bg-[#702B3A]/10 text-[#702B3A] text-xs font-semibold px-2 py-0.5 rounded-xs">
                        Save Rs. {(product.compareAtPrice - product.price).toLocaleString()}
                      </span>
                    </>
                  )}
                </div>

                {/* Colour Swatch */}
                <div className="mt-6 pt-5 border-t border-[#EAEAEA]">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-medium text-[#171513] uppercase tracking-wider">
                      Colour: <span className="font-normal text-stone-600">{product.color.name}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full border-2 border-[#702B3A] p-0.5 shadow-sm"
                      title={product.color.name}
                    >
                      <div
                        className="w-full h-full rounded-full"
                        style={{ backgroundColor: product.color.hex }}
                      />
                    </div>
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-medium text-[#171513] uppercase tracking-wider">
                      Select Size
                    </span>
                    <button
                      onClick={() => setActiveTab('sizeGuide')}
                      className="text-[#702B3A] hover:underline flex items-center gap-1 text-xs"
                    >
                      <HelpCircle className="w-3 h-3" />
                      <span>Size Guide</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => {
                      const isSelected = size === currentSize;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 text-xs font-medium uppercase tracking-wider border transition-all cursor-pointer rounded-xs ${
                            isSelected
                              ? 'border-[#702B3A] bg-[#702B3A] text-white shadow-sm'
                              : 'border-[#EAEAEA] bg-white text-[#171513] hover:border-stone-400'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mt-5 flex items-center gap-4">
                  <span className="text-xs uppercase tracking-wider text-[#171513] font-medium">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-[#EAEAEA] rounded-xs bg-[#FAF8F5]">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-1.5 text-stone-600 hover:text-black font-semibold text-sm"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-xs font-semibold text-[#171513]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                      className="px-3 py-1.5 text-stone-600 hover:text-black font-semibold text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart & Buy Now Buttons */}
                <div className="mt-6 space-y-2.5">
                  {product.inStock ? (
                    <>
                      <div className="flex gap-2">
                        <button
                          onClick={handleAddToCart}
                          className="flex-1 py-3.5 bg-[#702B3A] hover:bg-[#551D2A] text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer rounded-xs"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Bag</span>
                        </button>

                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className={`p-3.5 border transition-colors rounded-xs cursor-pointer ${
                            isWishlisted
                              ? 'border-[#702B3A] bg-[#702B3A]/10 text-[#702B3A]'
                              : 'border-[#EAEAEA] text-[#171513] hover:text-[#702B3A]'
                          }`}
                          title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                      </div>

                      <button
                        onClick={handleBuyNow}
                        className="w-full py-3.5 bg-[#171513] hover:bg-black text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer rounded-xs"
                      >
                        <span>Buy Now (Cash on Delivery)</span>
                      </button>
                    </>
                  ) : (
                    /* Back-in-Stock Alert Section (Section 19) */
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xs space-y-2 text-xs">
                      <p className="font-semibold text-amber-900">
                        This article is currently sold out in boutique inventory.
                      </p>
                      <p className="text-amber-800 text-[11px]">
                        Leave your WhatsApp number to be alerted as soon as our master artisans complete the next batch.
                      </p>
                      <div className="flex gap-2 pt-1">
                        <input
                          type="tel"
                          placeholder="0300 1234567"
                          className="flex-1 px-3 py-2 bg-white border border-amber-300 rounded-xs text-xs font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => alert("Thank you! You will receive an instant WhatsApp alert as soon as this article is restocked.")}
                          className="px-4 py-2 bg-[#702B3A] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#551D2A]"
                        >
                          Notify Me
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-5 border-t border-[#EAEAEA] grid grid-cols-3 gap-2 text-center text-[10px] text-stone-600">
                  <div className="flex flex-col items-center gap-1 p-2 bg-[#FAF8F5] rounded-xs">
                    <Truck className="w-4 h-4 text-[#B69A70]" />
                    <span>Nationwide COD</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 bg-[#FAF8F5] rounded-xs">
                    <RotateCcw className="w-4 h-4 text-[#B69A70]" />
                    <span>7-Day Exchange</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 bg-[#FAF8F5] rounded-xs">
                    <ShieldCheck className="w-4 h-4 text-[#B69A70]" />
                    <span>100% Genuine</span>
                  </div>
                </div>
              </div>

              {/* Informational Tabs */}
              <div className="border-t border-[#EAEAEA] pt-4">
                <div className="flex border-b border-[#EAEAEA] text-xs">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`py-2 px-3 border-b-2 font-medium tracking-wider uppercase transition-colors ${
                      activeTab === 'details'
                        ? 'border-[#702B3A] text-[#702B3A]'
                        : 'border-transparent text-stone-500 hover:text-black'
                    }`}
                  >
                    Details
                  </button>
                  <button
                    onClick={() => setActiveTab('fabric')}
                    className={`py-2 px-3 border-b-2 font-medium tracking-wider uppercase transition-colors ${
                      activeTab === 'fabric'
                        ? 'border-[#702B3A] text-[#702B3A]'
                        : 'border-transparent text-stone-500 hover:text-black'
                    }`}
                  >
                    Fabric & Care
                  </button>
                  <button
                    onClick={() => setActiveTab('sizeGuide')}
                    className={`py-2 px-3 border-b-2 font-medium tracking-wider uppercase transition-colors ${
                      activeTab === 'sizeGuide'
                        ? 'border-[#702B3A] text-[#702B3A]'
                        : 'border-transparent text-stone-500 hover:text-black'
                    }`}
                  >
                    Size Chart
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`py-2 px-3 border-b-2 font-medium tracking-wider uppercase transition-colors ${
                      activeTab === 'shipping'
                        ? 'border-[#702B3A] text-[#702B3A]'
                        : 'border-transparent text-stone-500 hover:text-black'
                    }`}
                  >
                    Delivery
                  </button>
                </div>

                <div className="py-3 text-xs leading-relaxed text-stone-600">
                  {activeTab === 'details' && (
                    <p>{product.description}</p>
                  )}

                  {activeTab === 'fabric' && (
                    <div className="space-y-2">
                      <p>
                        <strong className="text-[#171513]">Fabric:</strong> {product.fabric}
                      </p>
                      <div>
                        <strong className="text-[#171513]">Care Instructions:</strong>
                        <ul className="list-disc list-inside mt-1 space-y-0.5">
                          {product.care.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'sizeGuide' && (
                    <div>
                      {product.measurements && product.measurements.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-[11px]">
                            <thead>
                              <tr className="border-b border-[#EAEAEA] text-[#171513] font-semibold bg-[#FAF8F5]">
                                <th className="py-1.5 px-2">Size</th>
                                <th className="py-1.5 px-2">Bust (in)</th>
                                <th className="py-1.5 px-2">Waist (in)</th>
                                <th className="py-1.5 px-2">Hips (in)</th>
                                <th className="py-1.5 px-2">Length (in)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {product.measurements.map((m) => (
                                <tr key={m.size} className="border-b border-[#EAEAEA]">
                                  <td className="py-1 px-2 font-medium text-[#171513]">{m.size}</td>
                                  <td className="py-1 px-2">{m.bust || '—'}</td>
                                  <td className="py-1 px-2">{m.waist || '—'}</td>
                                  <td className="py-1 px-2">{m.hips || '—'}</td>
                                  <td className="py-1 px-2">{m.length || '—'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <p className="text-[10px] text-stone-400 mt-2">
                            *All measurements are in inches. Garment fits standard Pakistani luxury sizing.
                          </p>
                        </div>
                      ) : (
                        <div className="p-3 bg-[#FAF8F5] rounded-xs text-stone-600">
                          <p className="font-medium text-[#171513]">Standard Sizing Guide</p>
                          <p className="mt-1">
                            For footwear, please select your customary European shoe size (36-41).
                            For accessories, sizes are universal one-size. Contact our WhatsApp concierge at +92 300 1234567 for exact tailored advice.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'shipping' && (
                    <div className="space-y-1.5">
                      <p>• <strong>Payment Method:</strong> Cash on Delivery (COD) across Pakistan.</p>
                      <p>• <strong>Delivery Time:</strong> 1-2 working days in Karachi & Lahore; 2-4 working days in other cities.</p>
                      <p>• <strong>Shipping Fee:</strong> Rs. 200 flat rate; <strong>FREE</strong> for orders over Rs. 3,500.</p>
                      <p>• <strong>Exchange:</strong> 7 days hassle-free exchange on unworn pret with tags attached.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Complete the Look Cross-Sell in Modal */}
          {completeLookProducts.length > 0 && (
            <div className="mt-10 pt-8 border-t border-[#EAEAEA]">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-[#B69A70]" />
                <h3 className="text-sm font-semibold tracking-widest uppercase text-[#171513]">
                  Complete The Look with VEYORA
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {completeLookProducts.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => openProductDetail(item)}
                    className="p-3 border border-[#EAEAEA] rounded-xs flex items-center gap-3 hover:border-[#702B3A] transition-colors cursor-pointer bg-[#FAF8F5]"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-14 h-16 object-cover rounded-xs"
                    />
                    <div className="overflow-hidden">
                      <p className="text-[10px] uppercase text-[#B69A70] tracking-wider truncate">
                        {item.department}
                      </p>
                      <h4 className="text-xs font-medium text-[#171513] truncate">{item.title}</h4>
                      <p className="text-xs font-semibold text-[#702B3A]">
                        Rs. {item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
