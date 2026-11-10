import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { PRODUCTS, Product, DEPARTMENTS } from '../data/products.ts';
import { useStore } from '../context/StoreContext.tsx';

export const SearchOverlay: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    openProductDetail,
    navigateToDepartment
  } = useStore();

  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Lawn 3-Piece',
    'Khussa',
    'Burgundy Tote',
    'Silk Pajama',
    'Velvet Kurti'
  ]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return PRODUCTS.filter((p) => {
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchDept = p.department.toLowerCase().includes(q);
      const matchSub = p.subcategory.toLowerCase().includes(q);
      const matchColor = p.color.name.toLowerCase().includes(q);
      const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
      const matchFabric = p.fabric.toLowerCase().includes(q);
      return matchTitle || matchDept || matchSub || matchColor || matchTags || matchFabric;
    });
  }, [searchQuery]);

  if (!isSearchOpen) return null;

  const handleSelectProduct = (product: Product) => {
    // Add to recent searches if not present
    if (searchQuery.trim() && !recentSearches.includes(searchQuery.trim())) {
      setRecentSearches((prev) => [searchQuery.trim(), ...prev.slice(0, 4)]);
    }
    setIsSearchOpen(false);
    openProductDetail(product);
  };

  const handleRecentClick = (term: string) => {
    setSearchQuery(term);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-center pt-8 sm:pt-16 px-4 animate-fadeIn">
      <div className="w-full max-w-3xl bg-white rounded-sm shadow-2xl overflow-hidden h-fit max-h-[85vh] flex flex-col border border-[#EAEAEA]">
        {/* Search Bar Input */}
        <div className="p-4 sm:p-5 border-b border-[#EAEAEA] flex items-center gap-3 bg-[#FAF8F5]">
          <Search className="w-5 h-5 text-[#702B3A] flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Pakistani pret, lawn suits, velvet kurtis, khussas, leather bags..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#171513] placeholder-stone-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-stone-400 hover:text-black p-1 text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-stone-500 hover:text-black rounded-full hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Body Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-6">
          {searchQuery.trim() === '' ? (
            /* Initial state: Trending Tags & Recent Searches */
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B69A70] font-semibold block mb-2.5">
                  Popular Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleRecentClick(term)}
                      className="px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#702B3A] hover:text-white border border-[#EAEAEA] rounded-xs text-xs text-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Tag className="w-3 h-3 text-[#B69A70]" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B69A70] font-semibold block mb-2.5">
                  Browse by Department
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {DEPARTMENTS.map((d) => (
                    <button
                      key={d.name}
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigateToDepartment(d.name);
                      }}
                      className="p-3 text-left bg-[#FAF8F5] hover:border-[#702B3A] border border-[#EAEAEA] rounded-xs transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-[#171513] block">{d.name}</span>
                      <span className="text-[10px] text-stone-400 block mt-0.5">Explore Collection →</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            /* Results list */
            <div>
              <div className="flex items-center justify-between mb-3 text-xs text-stone-500 border-b border-stone-100 pb-2">
                <span>{searchResults.length} Products Found for "{searchQuery}"</span>
                <span className="text-[11px] text-[#B69A70]">All available for Cash on Delivery</span>
              </div>
              <div className="divide-y divide-stone-100">
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectProduct(item)}
                    className="py-3 flex items-center gap-4 hover:bg-[#FAF8F5] p-2 rounded-xs transition-colors cursor-pointer group"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-14 h-18 object-cover rounded-xs border border-stone-200 flex-shrink-0"
                    />
                    <div className="flex-1 overflow-hidden">
                      <p className="text-[10px] uppercase tracking-wider text-[#B69A70] font-medium">
                        {item.department} • {item.subcategory}
                      </p>
                      <h4 className="text-xs sm:text-sm font-medium text-[#171513] group-hover:text-[#702B3A] transition-colors truncate">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-semibold text-[#171513]">
                          Rs. {item.price.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-stone-500">
                          Colour: {item.color.name}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#702B3A] group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* No results suggestions */
            <div className="py-12 text-center space-y-3">
              <p className="text-sm text-stone-600 font-light">
                No matching products found for "<span className="font-semibold text-stone-800">{searchQuery}</span>".
              </p>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                Try searching for lawn, pret, khussa, velvet kurti, silk pajama, tote bag, or browse our 6 main departments below.
              </p>
              <div className="pt-2 flex justify-center gap-2">
                <button
                  onClick={() => setSearchQuery('Lawn')}
                  className="px-3 py-1.5 bg-[#FAF8F5] text-xs text-stone-700 rounded-xs border border-stone-200"
                >
                  Search "Lawn"
                </button>
                <button
                  onClick={() => setSearchQuery('Khussa')}
                  className="px-3 py-1.5 bg-[#FAF8F5] text-xs text-stone-700 rounded-xs border border-stone-200"
                >
                  Search "Khussa"
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
