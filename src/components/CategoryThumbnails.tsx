import React from 'react';
import { DEPARTMENTS } from '../data/products.ts';
import { useStore } from '../context/StoreContext.tsx';

export const CategoryThumbnails: React.FC = () => {
  const { navigateToDepartment, activeDepartment } = useStore();

  return (
    <section className="py-10 sm:py-14 bg-white border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#B69A70] font-semibold block mb-1">
            Explore Curated Departments
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#171513]">
            Shop by Department
          </h2>
          <div className="w-12 h-0.5 bg-[#702B3A] mx-auto mt-3" />
        </div>

        {/* Six Genuinely Circular Thumbnails */}
        {/* Desktop: 6 circles in one horizontal row | Mobile: horizontal swipeable row */}
        <div className="flex md:grid md:grid-cols-6 gap-5 sm:gap-6 lg:gap-8 overflow-x-auto no-scrollbar pb-3 sm:pb-0 px-2 justify-start md:justify-center items-start">
          {DEPARTMENTS.map((dept) => {
            const isSelected = activeDepartment === dept.name;
            return (
              <button
                key={dept.name}
                onClick={() => navigateToDepartment(dept.name)}
                className="group flex flex-col items-center flex-shrink-0 w-28 sm:w-32 md:w-auto cursor-pointer focus:outline-none"
              >
                {/* Genuine circle with aspect-square, rounded-full, double border */}
                <div
                  className={`relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full p-1 transition-all duration-300 ${
                    isSelected
                      ? 'ring-2 ring-[#702B3A] ring-offset-2'
                      : 'border border-[#EAEAEA] group-hover:ring-2 group-hover:ring-[#B69A70] group-hover:ring-offset-2'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#FAF8F5]">
                    <img
                      src={dept.heroImage}
                      alt={dept.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                  </div>
                </div>

                {/* Category Label Below Circle */}
                <div className="mt-3 text-center">
                  <span
                    className={`text-xs sm:text-sm font-medium tracking-wide block transition-colors ${
                      isSelected
                        ? 'text-[#702B3A] font-semibold'
                        : 'text-[#171513] group-hover:text-[#702B3A]'
                    }`}
                  >
                    {dept.name}
                  </span>
                  <span className="text-[10px] text-[#595550] block font-light tracking-wider">
                    {dept.subcategories.length} Collections
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
