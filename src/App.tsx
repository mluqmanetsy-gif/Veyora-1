/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { HeroBanner } from './components/HeroBanner.tsx';
import { ProductCarousel } from './components/ProductCarousel.tsx';
import { CategoryThumbnails } from './components/CategoryThumbnails.tsx';
import { ProductCard } from './components/ProductCard.tsx';
import { EditorialSection } from './components/EditorialSection.tsx';
import { CompleteTheLookSection } from './components/CompleteTheLookSection.tsx';
import { AIFashionStudio } from './components/AIFashionStudio.tsx';
import { BrandStory } from './components/BrandStory.tsx';
import { CustomerReviewsSection } from './components/CustomerReviewsSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { CheckoutModal } from './components/CheckoutModal.tsx';
import { OrderTrackingModal } from './components/OrderTrackingModal.tsx';
import { WishlistDrawer } from './components/WishlistDrawer.tsx';
import { SearchOverlay } from './components/SearchOverlay.tsx';
import { CustomerAccountModal } from './components/CustomerAccountModal.tsx';
import { AdminDashboardModal } from './components/AdminDashboardModal.tsx';
import { PolicyModal } from './components/PolicyModal.tsx';
import { DepartmentCollectionView } from './components/DepartmentCollectionView.tsx';
import { PRODUCTS, Product } from './data/products.ts';
import { ArrowRight, Sparkles } from 'lucide-react';

const StorefrontContent: React.FC = () => {
  const {
    activeDepartment,
    navigateToDepartment,
    selectedProduct,
    setSelectedProduct
  } = useStore();

  // Filter products for homepage sections
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);
  const clothesItems = PRODUCTS.filter((p) => p.department === 'Clothes');
  const innerwearItems = PRODUCTS.filter((p) => p.department === 'Innerwear');
  const nightwearItems = PRODUCTS.filter((p) => p.department === 'Nightwear');
  const footwearItems = PRODUCTS.filter((p) => p.department === 'Footwear');
  const bagsItems = PRODUCTS.filter((p) => p.department === 'Bags');
  const accessoriesItems = PRODUCTS.filter((p) => p.department === 'Accessories');

  return (
    <div className="min-h-screen bg-white text-[#171513] font-['Jost',sans-serif]">
      {/* 1. Announcement Bar & 2. Sticky Header */}
      <Navbar />

      {/* If a department is selected, render the dedicated collection page */}
      {activeDepartment ? (
        <DepartmentCollectionView />
      ) : (
        /* HOMEPAGE STRUCTURE (Section 7) */
        <main>
          {/* 3. Premium Six-Slide Automatic Hero Banner */}
          <HeroBanner />

          {/* 4. Automatic Product Carousel below Hero */}
          <ProductCarousel />

          {/* 5. Six Circular Department Categories */}
          <CategoryThumbnails />

          {/* 6. New Arrivals Section */}
          <section className="py-14 sm:py-20 bg-white border-b border-[#EAEAEA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#EAEAEA] pb-4 mb-8 gap-3">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.3em] text-[#B69A70] font-semibold block mb-1">
                    Just Landed in Pakistan
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif text-[#171513]">
                    New Arrivals
                  </h2>
                </div>
                <button
                  onClick={() => navigateToDepartment('Clothes')}
                  className="text-xs uppercase tracking-widest font-semibold text-[#702B3A] hover:text-[#551D2A] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Explore Seasonal Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {newArrivals.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>

          {/* 7. Editorial Fashion Campaign: "The Art of Everyday Elegance." */}
          <EditorialSection />

          {/* 8. Best Sellers Section */}
          <section className="py-14 sm:py-20 bg-[#FAF8F5] border-b border-[#EAEAEA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#EAEAEA] pb-4 mb-8 gap-3">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.3em] text-[#B69A70] font-semibold block mb-1">
                    Most Loved by Our Clients
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif text-[#171513]">
                    Best Sellers
                  </h2>
                </div>
                <span className="text-xs text-stone-500 italic">
                  Ranked by verified COD deliveries
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {bestSellers.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>

          {/* 9. Clothes Product Section */}
          <section className="py-14 sm:py-20 bg-white border-b border-[#EAEAEA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between border-b border-[#EAEAEA] pb-4 mb-8">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.3em] text-[#B69A70] font-semibold block mb-1">
                    Department 01
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif text-[#171513]">
                    Clothes & Pret
                  </h2>
                </div>
                <button
                  onClick={() => navigateToDepartment('Clothes')}
                  className="text-xs uppercase tracking-widest font-semibold text-[#702B3A] hover:text-[#551D2A] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View All Clothes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {clothesItems.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>

          {/* 10. Innerwear Product Section */}
          <section className="py-14 sm:py-20 bg-[#FAF8F5] border-b border-[#EAEAEA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between border-b border-[#EAEAEA] pb-4 mb-8">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.3em] text-[#B69A70] font-semibold block mb-1">
                    Department 02
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif text-[#171513]">
                    Innerwear & Shapewear
                  </h2>
                </div>
                <button
                  onClick={() => navigateToDepartment('Innerwear')}
                  className="text-xs uppercase tracking-widest font-semibold text-[#702B3A] hover:text-[#551D2A] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View All Innerwear</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {innerwearItems.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>

          {/* 11. Nightwear Product Section */}
          <section className="py-14 sm:py-20 bg-white border-b border-[#EAEAEA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between border-b border-[#EAEAEA] pb-4 mb-8">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.3em] text-[#B69A70] font-semibold block mb-1">
                    Department 03
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif text-[#171513]">
                    Nightwear & Sleepwear
                  </h2>
                </div>
                <button
                  onClick={() => navigateToDepartment('Nightwear')}
                  className="text-xs uppercase tracking-widest font-semibold text-[#702B3A] hover:text-[#551D2A] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View All Nightwear</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {nightwearItems.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>

          {/* 12. Footwear Product Section */}
          <section className="py-14 sm:py-20 bg-[#FAF8F5] border-b border-[#EAEAEA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between border-b border-[#EAEAEA] pb-4 mb-8">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.3em] text-[#B69A70] font-semibold block mb-1">
                    Department 04
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif text-[#171513]">
                    Footwear & Handcrafted Khussas
                  </h2>
                </div>
                <button
                  onClick={() => navigateToDepartment('Footwear')}
                  className="text-xs uppercase tracking-widest font-semibold text-[#702B3A] hover:text-[#551D2A] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View All Footwear</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {footwearItems.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>

          {/* 13. Bags Product Section */}
          <section className="py-14 sm:py-20 bg-white border-b border-[#EAEAEA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between border-b border-[#EAEAEA] pb-4 mb-8">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.3em] text-[#B69A70] font-semibold block mb-1">
                    Department 05
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif text-[#171513]">
                    Bags & Evening Potlis
                  </h2>
                </div>
                <button
                  onClick={() => navigateToDepartment('Bags')}
                  className="text-xs uppercase tracking-widest font-semibold text-[#702B3A] hover:text-[#551D2A] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View All Bags</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {bagsItems.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>

          {/* 14. Accessories Product Section */}
          <section className="py-14 sm:py-20 bg-[#FAF8F5] border-b border-[#EAEAEA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between border-b border-[#EAEAEA] pb-4 mb-8">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.3em] text-[#B69A70] font-semibold block mb-1">
                    Department 06
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif text-[#171513]">
                    Silk Scarves & Accessories
                  </h2>
                </div>
                <button
                  onClick={() => navigateToDepartment('Accessories')}
                  className="text-xs uppercase tracking-widest font-semibold text-[#702B3A] hover:text-[#551D2A] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View All Accessories</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {accessoriesItems.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>

          {/* 15. Complete the Look */}
          <CompleteTheLookSection />

          {/* 16. VEYORA AI Fashion Studio */}
          <AIFashionStudio />

          {/* 17. Brand Story & 18. Shopping Benefits */}
          <BrandStory />

          {/* 19. Customer Reviews */}
          <CustomerReviewsSection />
        </main>
      )}

      {/* 20. Newsletter & 21. Premium Footer */}
      <Footer />

      {/* Global Interactive Drawers and Modals */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackingModal />
      <WishlistDrawer />
      <SearchOverlay />
      <CustomerAccountModal />
      <AdminDashboardModal />
      <PolicyModal />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StorefrontContent />
    </StoreProvider>
  );
}
