import React, { useRef, useState, useEffect } from 'react';
import { PRODUCTS, Product } from '../data/products.ts';
import { useStore } from '../context/StoreContext.tsx';

export const ProductCarousel: React.FC = () => {
  const { openProductDetail } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // We choose a curated set of in-stock highlighted products across departments
  const carouselProducts = PRODUCTS.slice(0, 10);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 0.75; // smooth luxury glide speed

    const step = () => {
      if (!isHovered && scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;
        // Seamless loop back when halfway through doubled content
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  return (
    <section
      className="py-6 sm:py-8 bg-[#FAF8F5] border-b border-[#EAEAEA] overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      aria-label="Trending Pret & Luxury Showcase"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#702B3A]" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#702B3A]">
            Trending Across Pakistan
          </span>
        </div>
        <span className="text-[11px] text-[#595550] italic font-serif">
          Handcrafted Luxury & Daily Pret
        </span>
      </div>

      {/* Auto-scrolling row without navigation arrows or buttons */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing px-4"
        style={{ scrollBehavior: 'auto' }}
      >
        {/* Double array to create infinite looping stream without visible seams */}
        {[...carouselProducts, ...carouselProducts].map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            onClick={() => openProductDetail(product)}
            className="group flex-shrink-0 w-[180px] sm:w-[220px] md:w-[240px] bg-white border border-[#EAEAEA] rounded-sm p-3 transition-all duration-300 hover:shadow-md hover:border-[#B69A70]/50 cursor-pointer"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#FAF8F5] mb-2.5 rounded-xs">
              <img
                src={product.images[0]}
                alt={product.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              {product.compareAtPrice && (
                <span className="absolute top-2 left-2 bg-[#702B3A] text-white text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-xs">
                  Save Rs. {(product.compareAtPrice - product.price).toLocaleString()}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wider text-[#B69A70] font-medium truncate">
                {product.department} • {product.subcategory}
              </p>
              <h3 className="text-xs sm:text-sm font-medium text-[#171513] group-hover:text-[#702B3A] line-clamp-1 transition-colors">
                {product.title}
              </h3>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="text-xs sm:text-sm font-semibold text-[#171513]">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.compareAtPrice && (
                  <span className="text-[11px] text-[#595550] line-through font-light">
                    Rs. {product.compareAtPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
