import React from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { ArrowRight } from 'lucide-react';
import {
  editorialPakistaniLawn,
  editorialPakistaniKhussas,
  editorialPakistaniBags,
  editorialPakistaniKalidaar
} from '../data/products.ts';

export const EditorialSection: React.FC = () => {
  const { navigateToDepartment } = useStore();

  return (
    <section className="py-16 sm:py-24 bg-[#171513] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Editorial Imagery Collage */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xs border border-white/10 group">
                <img
                  src={editorialPakistaniLawn}
                  alt="Pakistani Luxury Lawn Pret Campaign"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest text-[#B69A70] font-medium">
                  Karachi Pret Studio
                </span>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-xs border border-white/10 group">
                <img
                  src={editorialPakistaniKhussas}
                  alt="Handcrafted Tilla Khussas"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest text-[#B69A70] font-medium">
                  Artisanal Khussa Craft
                </span>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6 pt-6 sm:pt-12">
              <div className="relative aspect-square overflow-hidden rounded-xs border border-white/10 group">
                <img
                  src={editorialPakistaniBags}
                  alt="Burgundy Leather Handbags"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest text-[#B69A70] font-medium">
                  The Burgundy Series
                </span>
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-xs border border-white/10 group">
                <img
                  src={editorialPakistaniKalidaar}
                  alt="Festive Chiffon Kalidaar"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest text-[#B69A70] font-medium">
                  Festive Kalidaar Weaves
                </span>
              </div>
            </div>
          </div>

          {/* Editorial Text Content */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-[#B69A70]/50 rounded-full">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69A70] font-semibold">
                Editorial Campaign
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light leading-tight">
              The Art of Everyday Elegance
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-stone-300 font-light leading-relaxed">
              <p>
                At VEYORA, elegance is neither accidental nor reserved solely for gala evenings. It is woven into the crisp warp of long-staple lawn, the silent rustle of pure mulberry silk, and the quiet dignity of handcrafted leather soles.
              </p>
              <p>
                From the bustling historic bazaars of Lahore to the contemporary avenues of Karachi and Islamabad, our seasonal collections redefine modern Pakistani luxury pret—accessible, enduring, and celebrated through every stitch.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigateToDepartment('Clothes')}
                className="px-8 py-3.5 bg-[#702B3A] hover:bg-[#551D2A] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all inline-flex items-center justify-center gap-2 rounded-xs shadow-lg cursor-pointer"
              >
                <span>Explore Pret Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateToDepartment('Accessories')}
                className="px-6 py-3.5 bg-transparent border border-[#B69A70]/60 hover:border-[#B69A70] text-[#B69A70] hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition-all inline-flex items-center justify-center rounded-xs cursor-pointer"
              >
                <span>View Accessories</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
