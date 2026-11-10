import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  Truck,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  PhoneCall,
  User,
  Gift,
  Lock
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { DEPARTMENTS } from '../data/products.ts';
import { STORE_CONTACT } from '../data/policies.ts';

export const Navbar: React.FC = () => {
  const {
    cartItemCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsTrackingOpen,
    setIsSearchOpen,
    setIsAccountOpen,
    setIsAdminOpen,
    currentUser,
    navigateToDepartment,
    activeDepartment,
    setActiveDepartment,
    setActiveSubcategory
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const handleDepartmentClick = (deptName: string, subcategory?: string) => {
    setActiveMegaMenu(null);
    setMobileMenuOpen(false);
    navigateToDepartment(deptName, subcategory);
  };

  const handleHomeClick = () => {
    setActiveDepartment(null);
    setActiveSubcategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAEAEA] transition-all">
      {/* 1. Announcement Bar */}
      <div className="bg-[#171513] text-[#FAF8F5] text-[11px] md:text-xs py-2 px-4 tracking-wider uppercase">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-[#B69A70]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-medium">VEYORA Pret & Luxury Lawn</span>
          </div>

          <div className="mx-auto sm:mx-0 text-center font-light tracking-widest text-[#EAEAEA]">
            <span>Nationwide Cash on Delivery across Pakistan</span>
            <span className="mx-2 text-[#B69A70]">•</span>
            <span className="text-[#B69A70] font-medium">Free Shipping</span> over Rs. 3,500
          </div>

          <div className="hidden lg:flex items-center gap-3 text-xs text-[#EAEAEA]/80">
            <button
              onClick={() => setIsTrackingOpen(true)}
              className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-[#B69A70]" />
              <span>Track Order</span>
            </button>
            <span className="text-white/20">|</span>
            <a
              href={STORE_CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-[#B69A70]" />
              <span>WhatsApp: {STORE_CONTACT.whatsappFormatted}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile hamburger button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#171513] hover:text-[#702B3A] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 ml-1 text-[#171513] hover:text-[#702B3A]"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* VEYORA Brand Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <button
              onClick={handleHomeClick}
              className="group inline-flex flex-col items-center lg:items-start text-left cursor-pointer"
            >
              <span className="text-3xl sm:text-4xl tracking-[0.25em] font-serif font-semibold text-[#171513] group-hover:text-[#702B3A] transition-colors">
                VEYORA
              </span>
              <span className="text-[9px] tracking-[0.35em] uppercase text-[#B69A70] -mt-1 font-medium">
                Elegance in Every Detail
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links with Mega Menus */}
          <nav className="hidden lg:flex items-center space-x-7">
            <button
              onClick={handleHomeClick}
              className={`text-[13px] tracking-[0.16em] uppercase transition-colors font-medium cursor-pointer py-6 ${
                activeDepartment === null ? 'text-[#702B3A] font-semibold' : 'text-[#171513] hover:text-[#702B3A]'
              }`}
            >
              Home
            </button>

            {DEPARTMENTS.map((dept) => {
              const isCurrent = activeDepartment === dept.name;
              return (
                <div
                  key={dept.name}
                  className="relative group py-6"
                  onMouseEnter={() => setActiveMegaMenu(dept.name)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <button
                    onClick={() => handleDepartmentClick(dept.name)}
                    className={`inline-flex items-center gap-1 text-[13px] tracking-[0.16em] uppercase transition-colors font-medium cursor-pointer ${
                      isCurrent ? 'text-[#702B3A] font-semibold' : 'text-[#171513] hover:text-[#702B3A]'
                    }`}
                  >
                    {dept.name}
                    <ChevronDown className="w-3.5 h-3.5 text-[#B69A70] group-hover:rotate-180 transition-transform" />
                  </button>

                  {/* Mega Menu Dropdown */}
                  {activeMegaMenu === dept.name && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[620px] bg-white border border-[#EAEAEA] shadow-xl p-6 rounded-b-sm grid grid-cols-3 gap-6 animate-fadeIn">
                      <div className="col-span-2">
                        <div className="border-b border-[#EAEAEA] pb-2 mb-3">
                          <span className="text-xs uppercase tracking-widest text-[#B69A70] font-semibold">
                            {dept.name} Categories
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                          {dept.subcategories.map((sub) => (
                            <button
                              key={sub}
                              onClick={() => handleDepartmentClick(dept.name, sub)}
                              className="text-left text-xs tracking-wide text-[#595550] hover:text-[#702B3A] hover:translate-x-1 transition-all py-1 cursor-pointer"
                            >
                              {sub}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="border-l border-[#EAEAEA] pl-5 flex flex-col justify-between">
                        <div>
                          <div className="relative aspect-[4/5] rounded overflow-hidden mb-2 bg-[#FAF8F5]">
                            <img
                              src={dept.heroImage}
                              alt={dept.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2.5">
                              <span className="text-white text-xs font-serif font-semibold">
                                New in {dept.name}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDepartmentClick(dept.name)}
                          className="w-full py-2 bg-[#702B3A] text-white text-[11px] uppercase tracking-widest font-medium hover:bg-[#551D2A] transition-colors"
                        >
                          View All {dept.name}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* AI Studio Shortcut */}
            <a
              href="#ai-studio"
              className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.14em] uppercase text-[#702B3A] bg-[#702B3A]/5 hover:bg-[#702B3A]/10 px-3 py-1.5 rounded-full border border-[#702B3A]/20 transition-all font-medium"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B69A70]" />
              <span>AI Fashion Studio</span>
            </a>
          </nav>

          {/* Right utility icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex p-2 text-[#171513] hover:text-[#702B3A] transition-colors cursor-pointer"
              title="Search store"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Rewards Shortcut Button */}
            <button
              onClick={() => setIsAccountOpen(true)}
              className="hidden md:flex items-center gap-1 p-2 text-stone-700 hover:text-[#702B3A] transition-colors cursor-pointer"
              title="Rewards Club"
            >
              <Gift className="w-5 h-5 text-[#B69A70]" />
              {currentUser && (
                <span className="text-[11px] font-semibold text-[#702B3A] bg-[#702B3A]/10 px-1.5 py-0.5 rounded-xs">
                  {currentUser.rewardsPoints}p
                </span>
              )}
            </button>

            {/* Customer Account */}
            <button
              onClick={() => setIsAccountOpen(true)}
              className="p-2 text-[#171513] hover:text-[#702B3A] transition-colors cursor-pointer"
              title={currentUser ? currentUser.name : 'Sign In'}
            >
              <User className="w-5 h-5" />
            </button>

            {/* Track Order */}
            <button
              onClick={() => setIsTrackingOpen(true)}
              className="p-2 text-[#171513] hover:text-[#702B3A] transition-colors cursor-pointer relative"
              title="Track Order"
            >
              <Truck className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-[#171513] hover:text-[#702B3A] transition-colors cursor-pointer relative"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#702B3A] text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag / Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-[#171513] hover:text-[#702B3A] transition-colors cursor-pointer relative"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 w-4.5 h-4.5 bg-[#702B3A] text-white text-[10px] rounded-full flex items-center justify-center font-semibold">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex">
          <div className="w-[85%] max-w-sm bg-white h-full overflow-y-auto flex flex-col justify-between p-6 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#EAEAEA]">
                <div>
                  <span className="text-2xl font-serif font-bold tracking-widest text-[#171513]">
                    VEYORA
                  </span>
                  <p className="text-[10px] uppercase tracking-widest text-[#B69A70]">
                    Elegance in Every Detail
                  </p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-500 hover:text-black"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="py-4 space-y-3">
                <button
                  onClick={handleHomeClick}
                  className="w-full text-left py-2 text-sm uppercase tracking-widest font-medium text-[#171513] hover:text-[#702B3A]"
                >
                  Home
                </button>

                {DEPARTMENTS.map((dept) => (
                  <div key={dept.name} className="border-b border-[#EAEAEA]/60 pb-2">
                    <button
                      onClick={() => handleDepartmentClick(dept.name)}
                      className="w-full flex items-center justify-between py-2 text-sm uppercase tracking-widest font-medium text-[#171513] hover:text-[#702B3A]"
                    >
                      <span>{dept.name}</span>
                      <span className="text-xs text-[#B69A70]">View</span>
                    </button>
                    <div className="grid grid-cols-2 gap-1.5 pl-2 py-1">
                      {dept.subcategories.slice(0, 4).map((sub) => (
                        <button
                          key={sub}
                          onClick={() => handleDepartmentClick(dept.name, sub)}
                          className="text-left text-xs text-[#595550] hover:text-[#702B3A] py-1"
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAccountOpen(true);
                  }}
                  className="w-full flex items-center gap-2 py-2.5 text-sm uppercase tracking-widest font-medium text-[#702B3A]"
                >
                  <Gift className="w-4 h-4 text-[#B69A70]" />
                  <span>Rewards Club & Account</span>
                </button>

                <a
                  href="#ai-studio"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-3 px-3 mt-4 bg-[#702B3A]/5 border border-[#702B3A]/20 rounded text-sm text-[#702B3A] font-medium"
                >
                  <Sparkles className="w-4 h-4 text-[#B69A70]" />
                  <span>VEYORA AI Fashion Studio</span>
                </a>
              </div>
            </div>

            <div className="border-t border-[#EAEAEA] pt-4 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsTrackingOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#FAF8F5] border border-[#EAEAEA] text-xs uppercase tracking-widest font-medium text-[#171513]"
              >
                <Truck className="w-4 h-4 text-[#B69A70]" />
                <span>Track Your COD Order</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminOpen(true);
                }}
                className="w-full text-center text-[10px] uppercase text-stone-400 hover:text-stone-700 flex items-center justify-center gap-1"
              >
                <Lock className="w-3 h-3" />
                <span>Merchant Console</span>
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
