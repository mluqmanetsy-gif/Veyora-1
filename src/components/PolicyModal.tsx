import React from 'react';
import {
  X,
  ShieldCheck,
  Truck,
  RotateCcw,
  HelpCircle,
  PhoneCall,
  Mail,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { STORE_CONTACT, FAQS, POLICY_CONTENTS } from '../data/policies.ts';

export const PolicyModal: React.FC = () => {
  const { activePolicyModal, setActivePolicyModal } = useStore();

  if (!activePolicyModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-sm shadow-2xl overflow-hidden my-auto border border-[#EAEAEA]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FAF8F5] border-b border-[#EAEAEA]">
          <div className="flex items-center gap-2">
            {activePolicyModal === 'shipping' && <Truck className="w-5 h-5 text-[#702B3A]" />}
            {activePolicyModal === 'returns' && <RotateCcw className="w-5 h-5 text-[#702B3A]" />}
            {activePolicyModal === 'faqs' && <HelpCircle className="w-5 h-5 text-[#702B3A]" />}
            {activePolicyModal === 'contact' && <PhoneCall className="w-5 h-5 text-[#702B3A]" />}
            {(activePolicyModal === 'privacy' || activePolicyModal === 'terms') && (
              <ShieldCheck className="w-5 h-5 text-[#702B3A]" />
            )}
            <h2 className="text-base font-serif font-semibold tracking-wide text-[#171513]">
              {activePolicyModal === 'shipping' && 'Nationwide Shipping & Delivery Policy'}
              {activePolicyModal === 'returns' && '7-Day Return & Exchange Policy'}
              {activePolicyModal === 'privacy' && 'Privacy Policy'}
              {activePolicyModal === 'terms' && 'Terms & Conditions of Service'}
              {activePolicyModal === 'faqs' && 'Frequently Asked Questions (FAQs)'}
              {activePolicyModal === 'contact' && 'Contact VEYORA Concierge'}
              {activePolicyModal === 'about' && 'About VEYORA — Our Heritage'}
            </h2>
          </div>
          <button
            onClick={() => setActivePolicyModal(null)}
            className="p-1.5 text-stone-500 hover:text-black rounded-full hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[78vh] overflow-y-auto text-xs sm:text-sm leading-relaxed text-stone-700 space-y-4">
          {/* Shipping Policy */}
          {activePolicyModal === 'shipping' && (
            <div className="space-y-4 whitespace-pre-line">
              {POLICY_CONTENTS.shipping.content}
            </div>
          )}

          {/* Returns & Exchange */}
          {activePolicyModal === 'returns' && (
            <div className="space-y-4 whitespace-pre-line">
              {POLICY_CONTENTS.returns.content}
            </div>
          )}

          {/* Privacy Policy */}
          {activePolicyModal === 'privacy' && (
            <div className="space-y-4 whitespace-pre-line">
              {POLICY_CONTENTS.privacy.content}
            </div>
          )}

          {/* Terms & Conditions */}
          {activePolicyModal === 'terms' && (
            <div className="space-y-4 whitespace-pre-line">
              {POLICY_CONTENTS.terms.content}
            </div>
          )}

          {/* About VEYORA */}
          {activePolicyModal === 'about' && (
            <div className="space-y-4 whitespace-pre-line">
              {POLICY_CONTENTS.about.content}
            </div>
          )}

          {/* FAQs */}
          {activePolicyModal === 'faqs' && (
            <div className="space-y-4">
              <p className="text-xs text-stone-500 mb-4">
                Got questions regarding Pakistani delivery, Cash on Delivery payments, or pret sizing? Find verified answers below.
              </p>
              <div className="space-y-3">
                {FAQS.map((faq, i) => (
                  <div key={i} className="p-4 border border-[#EAEAEA] rounded-xs bg-[#FAF8F5] space-y-1.5">
                    <span className="text-[10px] uppercase font-semibold text-[#B69A70] tracking-wider block">
                      {faq.category}
                    </span>
                    <h4 className="font-semibold text-[#171513] text-sm">{faq.question}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Us (Section 21 exact details) */}
          {activePolicyModal === 'contact' && (
            <div className="space-y-6">
              <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-xs space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-[#B69A70] font-semibold block">
                  Official Store Headquarters
                </span>
                <div className="space-y-2 text-xs">
                  <p className="flex items-center gap-2 text-stone-800">
                    <MapPin className="w-4 h-4 text-[#702B3A] flex-shrink-0" />
                    <strong>Location:</strong> {STORE_CONTACT.location}
                  </p>
                  <p className="flex items-center gap-2 text-stone-800">
                    <Mail className="w-4 h-4 text-[#702B3A] flex-shrink-0" />
                    <strong>Contact Email:</strong>{' '}
                    <a href={`mailto:${STORE_CONTACT.email}`} className="text-[#702B3A] hover:underline">
                      {STORE_CONTACT.email}
                    </a>
                  </p>
                  <p className="flex items-center gap-2 text-stone-800">
                    <PhoneCall className="w-4 h-4 text-[#702B3A] flex-shrink-0" />
                    <strong>WhatsApp Support:</strong>{' '}
                    <a href={STORE_CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold hover:underline">
                      {STORE_CONTACT.whatsappFormatted}
                    </a>
                  </p>
                </div>
              </div>

              {/* Verified Social Channels */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#171513] block">
                  Official Social Channels
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <a
                    href={STORE_CONTACT.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-[#EAEAEA] rounded-xs bg-[#FAF8F5] hover:border-[#702B3A] transition-colors flex items-center justify-between"
                  >
                    <span className="font-medium text-[#171513]">Facebook</span>
                    <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                  </a>

                  <a
                    href={STORE_CONTACT.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-[#EAEAEA] rounded-xs bg-[#FAF8F5] hover:border-[#702B3A] transition-colors flex items-center justify-between"
                  >
                    <span className="font-medium text-[#171513]">Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                  </a>

                  <a
                    href={STORE_CONTACT.tiktokLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-[#EAEAEA] rounded-xs bg-[#FAF8F5] hover:border-[#702B3A] transition-colors flex items-center justify-between"
                  >
                    <span className="font-medium text-[#171513]">TikTok</span>
                    <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                  </a>
                </div>
              </div>

              {/* Direct WhatsApp Concierge CTA */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xs flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-emerald-950">Immediate Order & Styling Assistance</h4>
                  <p className="text-[11px] text-emerald-800">Available Monday – Saturday, 10 AM to 8 PM PKT.</p>
                </div>
                <a
                  href={STORE_CONTACT.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
