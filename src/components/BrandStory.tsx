import React from 'react';
import { Truck, RotateCcw, ShieldCheck, HeartHandshake } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Story */}
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#B69A70] font-semibold block">
            Our Heritage & Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#171513]">
            A World of Style, Curated for Her
          </h2>
          <div className="w-12 h-0.5 bg-[#702B3A] mx-auto" />
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light">
            Founded with an uncompromising devotion to Pakistani textile excellence, VEYORA bridges the rich heritage of handcrafted South Asian artistry with modern, clean silhouettes. We believe that true luxury lies in thoughtful proportion, authentic materials, and the confidence that comes with wearing a garment tailored to perfection.
          </p>
        </div>

        {/* 4 Shopping Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-[#EAEAEA]">
          <div className="p-6 bg-white border border-[#EAEAEA] rounded-sm text-center space-y-2.5 shadow-xs">
            <div className="w-12 h-12 bg-[#FAF8F5] text-[#702B3A] rounded-full flex items-center justify-center mx-auto border border-[#B69A70]/30">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171513]">
              Nationwide Cash on Delivery
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Order with complete peace of mind. Pay the delivery rider in cash at your doorstep anywhere in Pakistan.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#EAEAEA] rounded-sm text-center space-y-2.5 shadow-xs">
            <div className="w-12 h-12 bg-[#FAF8F5] text-[#702B3A] rounded-full flex items-center justify-center mx-auto border border-[#B69A70]/30">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171513]">
              7-Day Hassle-Free Exchange
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              If the fit or cut is not exact, exchange your unworn items within 7 days via our direct WhatsApp concierge.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#EAEAEA] rounded-sm text-center space-y-2.5 shadow-xs">
            <div className="w-12 h-12 bg-[#FAF8F5] text-[#702B3A] rounded-full flex items-center justify-center mx-auto border border-[#B69A70]/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171513]">
              100% Genuine Quality
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Pure combed Pima lawn, grade-A silk chiffon, and genuine handcrafted leather accessories. No synthetic shortcuts.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#EAEAEA] rounded-sm text-center space-y-2.5 shadow-xs">
            <div className="w-12 h-12 bg-[#FAF8F5] text-[#702B3A] rounded-full flex items-center justify-center mx-auto border border-[#B69A70]/30">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171513]">
              Ethical Artisanal Craft
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Empowering master zardozi embroiderers and leather cobblers across Punjab and Sindh with fair wages.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
