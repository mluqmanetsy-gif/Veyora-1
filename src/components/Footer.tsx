import React, { useState } from 'react';
import { DEPARTMENTS } from '../data/products.ts';
import { STORE_CONTACT } from '../data/policies.ts';
import { useStore } from '../context/StoreContext.tsx';
import { PhoneCall, Mail, MapPin, Truck, ShieldCheck, ArrowRight, Check, Lock, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateToDepartment, setIsTrackingOpen, setActivePolicyModal, setIsAdminOpen } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setNewsletterEmail('');
    }, 4000);
  };

  return (
    <footer className="bg-[#171513] text-[#FAF8F5] pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Newsletter Section */}
        <div className="max-w-3xl mx-auto text-center space-y-4 pb-12 border-b border-stone-800">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#B69A70] font-semibold block">
            Exclusive Previews & Festive Drops
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-light text-white">
            Join the VEYORA Circle
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 font-light max-w-md mx-auto">
            Receive private invitations to our luxury lawn launches, seasonal trunk shows, and styling consultations.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-2 pt-2">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 text-xs bg-stone-900 border border-stone-700 text-white rounded-xs focus:outline-none focus:border-[#B69A70]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#702B3A] hover:bg-[#551D2A] text-white text-xs font-semibold uppercase tracking-widest rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {subscribed ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Subscribed</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-xs">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-serif font-bold tracking-widest text-white">
                VEYORA
              </span>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#B69A70] font-medium">
                Elegance in Every Detail
              </p>
            </div>
            <p className="text-stone-400 leading-relaxed max-w-sm font-light">
              Pakistan’s premier modern luxury destination for women’s pret, handcrafted footwear, artisan bags, and essentials. Headquartered in Karachi, delivering nationwide with Cash on Delivery.
            </p>

            <div className="space-y-2 pt-2 text-stone-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B69A70]" />
                <span>Store Location: <strong>{STORE_CONTACT.location}</strong></span>
              </div>
              <a
                href={STORE_CONTACT.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#B69A70] transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#B69A70]" />
                <span>WhatsApp: {STORE_CONTACT.whatsappFormatted}</span>
              </a>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B69A70]" />
                <span>Contact Email: {STORE_CONTACT.email}</span>
              </div>
            </div>

            {/* Social Links (Section 21) */}
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-wider text-[#B69A70] font-semibold block mb-2">
                Follow VEYORA
              </span>
              <div className="flex gap-2">
                <a
                  href={STORE_CONTACT.facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-stone-900 hover:bg-[#702B3A] border border-stone-800 rounded-xs text-[11px] transition-colors inline-flex items-center gap-1"
                >
                  <span>Facebook</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
                <a
                  href={STORE_CONTACT.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-stone-900 hover:bg-[#702B3A] border border-stone-800 rounded-xs text-[11px] transition-colors inline-flex items-center gap-1"
                >
                  <span>Instagram</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
                <a
                  href={STORE_CONTACT.tiktokLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-stone-900 hover:bg-[#702B3A] border border-stone-800 rounded-xs text-[11px] transition-colors inline-flex items-center gap-1"
                >
                  <span>TikTok</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Shopping (Section 22) */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#B69A70]">
              Shopping
            </h4>
            <ul className="space-y-2 text-stone-400">
              {DEPARTMENTS.map((dept) => (
                <li key={dept.name}>
                  <button
                    onClick={() => navigateToDepartment(dept.name)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {dept.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigateToDepartment('Clothes', 'Stitched')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  New Arrivals
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support (Section 22) */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#B69A70]">
              Customer Support
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => setActivePolicyModal('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('faqs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsTrackingOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Truck className="w-3 h-3 text-[#B69A70]" />
                  <span>Order Tracking</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('shipping')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('returns')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Return & Exchange Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Brand & Payment Trust */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-[#B69A70] mb-3">
                Brand
              </h4>
              <ul className="space-y-2 text-stone-400">
                <li>
                  <button
                    onClick={() => setActivePolicyModal('about')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    About VEYORA
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicyModal('about')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Our Story
                  </button>
                </li>
              </ul>
            </div>

            <div className="p-3 bg-stone-900 border border-stone-800 rounded-xs space-y-2">
              <div className="flex items-center gap-2 text-white font-medium">
                <Truck className="w-4 h-4 text-[#B69A70]" />
                <span>Cash on Delivery (COD)</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-snug">
                Nationwide COD in PKR across Karachi, Lahore, Islamabad, and all cities. Pay when you receive your parcel.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Admin Link */}
        <div className="pt-8 border-t border-stone-800 text-center sm:flex sm:justify-between sm:items-center text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} VEYORA Luxury Retail (Pvt) Ltd. All Rights Reserved. Karachi, Pakistan.</p>
          <div className="mt-2 sm:mt-0 flex items-center justify-center gap-4">
            <span>Handcrafted with devotion in Pakistan</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="hover:text-stone-300 transition-colors flex items-center gap-1 cursor-pointer"
              title="Merchant Operations"
            >
              <Lock className="w-3 h-3 text-[#B69A70]" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
