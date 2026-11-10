import React, { useState, useEffect, useRef } from 'react';
import { HERO_SLIDES, HeroSlide } from '../data/products.ts';
import { useStore } from '../context/StoreContext.tsx';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { navigateToDepartment } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = HERO_SLIDES.length;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5500); // 5.5 seconds per slide
    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const activeSlide: HeroSlide = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative w-full h-[580px] sm:h-[640px] lg:h-[720px] bg-[#171513] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Featured Fashion Campaigns"
    >
      {/* Slide Images */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.heading}
              className={`w-full h-full object-cover object-center transform transition-transform duration-7000 ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />
            {/* Elegant multi-layer overlay for unmatched text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />
          </div>
        );
      })}

      {/* Slide Content Box */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-6 sm:px-10 lg:px-12 flex items-center">
        <div className="max-w-xl sm:max-w-2xl text-left space-y-4 sm:space-y-6">
          {/* Category Tag / Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#171513]/80 border border-[#B69A70]/60 backdrop-blur-md rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#B69A70] animate-pulse" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#FAF8F5] font-medium">
              {activeSlide.badge}
            </span>
          </div>

          {/* Heading in Cormorant Garamond */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-white leading-[1.12] tracking-tight">
            {activeSlide.heading}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-[#EAEAEA] font-light leading-relaxed max-w-lg">
            {activeSlide.description}
          </p>

          {/* Critical CTA Button: Deep Burgundy #702B3A, White Text, High Contrast */}
          <div className="pt-2 sm:pt-4">
            <button
              onClick={() => navigateToDepartment(activeSlide.department)}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#702B3A] hover:bg-[#551D2A] text-white text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase rounded-sm shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B69A70] focus:ring-offset-2 focus:ring-offset-[#171513]"
            >
              <span>{activeSlide.ctaText}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Controls & Progress Bar Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-30">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          {/* Elegant Slide Indicators */}
          <div className="flex items-center gap-2 sm:gap-3">
            {HERO_SLIDES.map((slide, idx) => {
              const isCurrent = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`group py-2 cursor-pointer transition-all ${
                    isCurrent ? 'w-10 sm:w-14' : 'w-5 sm:w-6 hover:w-8'
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${slide.department}`}
                >
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${
                      isCurrent
                        ? 'bg-[#B69A70] shadow-sm'
                        : 'bg-white/40 group-hover:bg-white/70'
                    }`}
                  />
                  <span className="sr-only">{slide.department}</span>
                </button>
              );
            })}
          </div>

          {/* Slide navigation buttons & auto-play state */}
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10">
            <button
              onClick={handlePrev}
              className="p-1.5 sm:p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1.5 sm:p-2 text-[#B69A70] hover:text-white rounded-full hover:bg-white/10 transition-colors"
              aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
              title={isPaused ? 'Play' : 'Pause'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 sm:p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
