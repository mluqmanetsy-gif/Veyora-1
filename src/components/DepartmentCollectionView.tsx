import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { PRODUCTS, DEPARTMENTS, Product } from '../data/products.ts';
import { ProductCard } from './ProductCard.tsx';
import { SlidersHorizontal, X, ArrowLeft } from 'lucide-react';

export const DepartmentCollectionView: React.FC = () => {
  const {
    activeDepartment,
    setActiveDepartment,
    activeSubcategory,
    setActiveSubcategory
  } = useStore();

  const [sortBy, setSortBy] = useState<'newest' | 'priceLow' | 'priceHigh' | 'bestSelling'>('newest');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(activeSubcategory);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync subcategory if changed from context
  React.useEffect(() => {
    setSelectedSubcategory(activeSubcategory);
  }, [activeSubcategory]);

  const currentDept = DEPARTMENTS.find((d) => d.name === activeDepartment);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (activeDepartment && p.department !== activeDepartment) return false;
      if (selectedSubcategory && p.subcategory !== selectedSubcategory) return false;
      if (selectedColor && p.color.name !== selectedColor) return false;
      if (inStockOnly && !p.inStock) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'priceLow') return a.price - b.price;
      if (sortBy === 'priceHigh') return b.price - a.price;
      if (sortBy === 'bestSelling') return (b.reviewCount || 0) - (a.reviewCount || 0);
      return 0; // Default newest
    });
  }, [activeDepartment, selectedSubcategory, selectedColor, inStockOnly, sortBy]);

  // Extract available colors in this department
  const availableColors = useMemo(() => {
    const list = PRODUCTS.filter((p) => !activeDepartment || p.department === activeDepartment);
    const colorsMap = new Map<string, string>();
    list.forEach((p) => colorsMap.set(p.color.name, p.color.hex));
    return Array.from(colorsMap.entries()).map(([name, hex]) => ({ name, hex }));
  }, [activeDepartment]);

  const clearAllFilters = () => {
    setSelectedSubcategory(null);
    setActiveSubcategory(null);
    setSelectedColor(null);
    setInStockOnly(false);
  };

  const hasActiveFilters = Boolean(selectedSubcategory || selectedColor || inStockOnly);

  return (
    <div className="bg-white min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back button & Breadcrumb */}
        <div className="flex items-center justify-between text-xs text-stone-500">
          <button
            onClick={() => {
              setActiveDepartment(null);
              setActiveSubcategory(null);
            }}
            className="flex items-center gap-1.5 hover:text-[#702B3A] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>
          <span>Home / {activeDepartment} {selectedSubcategory ? `/ ${selectedSubcategory}` : ''}</span>
        </div>

        {/* Collection Header Banner */}
        {currentDept && (
          <div className="relative h-48 sm:h-64 rounded-sm overflow-hidden bg-[#171513] border border-[#EAEAEA]">
            <img
              src={currentDept.heroImage}
              alt={currentDept.name}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent flex flex-col justify-center p-6 sm:p-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A70] font-semibold">
                VEYORA Storefront
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif font-light text-white mt-1">
                {currentDept.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#EAEAEA] font-light mt-2 max-w-lg">
                Explore our full Pakistani luxury collection in {currentDept.name}. Nationwide Cash on Delivery with free delivery over Rs. 3,500.
              </p>
            </div>
          </div>
        )}

        {/* Filter & Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#EAEAEA] text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] border border-stone-300 rounded-xs font-medium"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            <span className="text-stone-600">
              Showing <strong className="text-[#171513]">{filteredProducts.length}</strong> items
            </span>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-[#702B3A] hover:underline flex items-center gap-1 font-medium ml-2"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear Filters</span>
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-stone-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 bg-[#FAF8F5] border border-stone-300 rounded-xs focus:border-[#702B3A] focus:outline-none cursor-pointer text-xs"
            >
              <option value="newest">Newest Additions</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="bestSelling">Best Selling</option>
            </select>
          </div>
        </div>

        {/* Main Grid with Desktop Sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden md:block md:col-span-3 space-y-6 bg-[#FAF8F5] p-5 rounded-sm border border-[#EAEAEA]">
            {/* Subcategories */}
            {currentDept && (
              <div>
                <h3 className="text-xs uppercase tracking-widest font-semibold text-[#171513] mb-3">
                  Subcategory
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setSelectedSubcategory(null);
                      setActiveSubcategory(null);
                    }}
                    className={`block w-full text-left text-xs py-1 transition-colors ${
                      !selectedSubcategory ? 'text-[#702B3A] font-semibold' : 'text-stone-600 hover:text-black'
                    }`}
                  >
                    All {currentDept.name}
                  </button>
                  {currentDept.subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => {
                        setSelectedSubcategory(sub);
                        setActiveSubcategory(sub);
                      }}
                      className={`block w-full text-left text-xs py-1 transition-colors ${
                        selectedSubcategory === sub ? 'text-[#702B3A] font-semibold' : 'text-stone-600 hover:text-black'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            <div className="border-t border-stone-200 pt-4">
              <h3 className="text-xs uppercase tracking-widest font-semibold text-[#171513] mb-3">
                Colour
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((c) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(isSelected ? null : c.name)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded-xs border transition-all ${
                        isSelected
                          ? 'border-[#702B3A] bg-[#702B3A] text-white'
                          : 'border-stone-300 bg-white text-stone-700 hover:border-black'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-stone-300"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div className="border-t border-stone-200 pt-4">
              <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-[#702B3A]"
                />
                <span>In Stock Items Only</span>
              </label>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="md:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center space-y-3 bg-[#FAF8F5] rounded-sm border border-[#EAEAEA] p-8">
                <p className="text-sm text-stone-600">No products match your selected filters in this collection.</p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2 bg-[#702B3A] text-white text-xs uppercase tracking-wider font-semibold rounded-xs"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
