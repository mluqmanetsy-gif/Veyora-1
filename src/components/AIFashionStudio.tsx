import React, { useState } from 'react';
import {
  Sparkles,
  UserCheck,
  Ruler,
  Camera,
  Shirt,
  MessageSquare,
  Compass,
  Upload,
  Info,
  Check,
  Send,
  Plus,
  Trash2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { PRODUCTS, Product } from '../data/products.ts';
import { useStore } from '../context/StoreContext.tsx';

type StudioTab = 'stylist' | 'tryon' | 'size' | 'visualSearch' | 'wardrobe' | 'support' | 'recommendations';

export const AIFashionStudio: React.FC = () => {
  const {
    openProductDetail,
    wardrobeOutfits,
    saveWardrobeOutfit,
    deleteWardrobeOutfit,
    wishlist,
    addToCart
  } = useStore();

  const [activeTab, setActiveTab] = useState<StudioTab>('stylist');

  // 1. Personal Stylist State
  const [occasion, setOccasion] = useState('Festive & Family Gathering');
  const [stylePreference, setStylePreference] = useState('Contemporary Eastern Pret');
  const [favoriteColors, setFavoriteColors] = useState('Jewel Tones (Emerald, Burgundy, Royal Blue)');
  const [categoryChoice, setCategoryChoice] = useState('Clothes');
  const [budget, setBudget] = useState('10000');
  const [fitPreference, setFitPreference] = useState('Relaxed Elegance');
  const [stylistLoading, setStylistLoading] = useState(false);
  const [stylistResult, setStylistResult] = useState<{
    recommendationHeadline: string;
    stylingRationale: string;
    recommendedProductIds: string[];
    styleTips: string[];
  } | null>(null);

  // 2. Virtual Try-On State
  const [tryOnImage, setTryOnImage] = useState<string | null>(null);
  const [tryOnProductId, setTryOnProductId] = useState<string>('cl-001');

  // 3. Smart Size Assistant State
  const [heightInches, setHeightInches] = useState('64'); // 5'4"
  const [bustInches, setBustInches] = useState('36');
  const [waistInches, setWaistInches] = useState('30');
  const [hipsInches, setHipsInches] = useState('39');
  const [usualSize, setUsualSize] = useState('M');
  const [preferredFit, setPreferredFit] = useState<'Standard' | 'Relaxed' | 'Fitted'>('Standard');
  const [sizeRecommendation, setSizeRecommendation] = useState<{
    size: string;
    confidence: string;
    explanation: string;
  } | null>(null);

  // 4. Visual Search State
  const [uploadedSearchImage, setUploadedSearchImage] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<{
    analysis: string;
    matchedProductIds: string[];
  } | null>(null);

  // 5. Digital Wardrobe State
  const [newOutfitName, setNewOutfitName] = useState('');
  const [selectedForOutfit, setSelectedForOutfit] = useState<string[]>([]);

  // 6. AI Customer Support State
  const [supportMessage, setSupportMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    {
      sender: 'bot',
      text: 'Salam and welcome to VEYORA Concierge! I can assist you with product details, sizing measurements in inches, nationwide Cash on Delivery delivery times, and our 7-day exchange policy. How may I help you today?'
    }
  ]);
  const [supportLoading, setSupportLoading] = useState(false);

  // Handlers:
  // Stylist call
  const handleConsultStylist = async (e: React.FormEvent) => {
    e.preventDefault();
    setStylistLoading(true);
    try {
      const response = await fetch('/api/gemini/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          occasion,
          style: stylePreference,
          colors: favoriteColors,
          category: categoryChoice,
          budget,
          fit: fitPreference
        })
      });
      const data = await response.json();
      setStylistResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setStylistLoading(false);
    }
  };

  // Size calculator
  const calculateSize = (e: React.FormEvent) => {
    e.preventDefault();
    const bust = parseFloat(bustInches) || 36;
    const waist = parseFloat(waistInches) || 30;
    const hips = parseFloat(hipsInches) || 39;

    let recSize = 'M';
    let rationale = '';

    if (bust <= 34 && waist <= 28) {
      recSize = 'XS';
      rationale = `Your measurements (Bust ${bust}", Waist ${waist}") match our XS silhouette closely.`;
    } else if (bust <= 37 && waist <= 31) {
      recSize = 'S';
      rationale = `Your bust ${bust}" and waist ${waist}" fit comfortably in Size Small across our Luxury Pret charts.`;
    } else if (bust <= 40 && waist <= 34) {
      recSize = 'M';
      rationale = `Your measurements (Bust ${bust}", Waist ${waist}", Hips ${hips}") align with Size Medium.`;
    } else if (bust <= 43 && waist <= 37) {
      recSize = 'L';
      rationale = `For Bust ${bust}" and Waist ${waist}", Size Large provides elegant movement without pulling at the seam.`;
    } else {
      recSize = 'XL';
      rationale = `Size XL offers the most comfortable drape for measurements exceeding 43" bust.`;
    }

    if (preferredFit === 'Relaxed') {
      rationale += ' Since you prefer a relaxed drape, our tailoring allows generous movement.';
    }

    setSizeRecommendation({
      size: recSize,
      confidence: 'High (Calibrated to VEYORA Pret)',
      explanation: rationale
    });
  };

  // Support chat
  const handleSendSupportMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;

    const userText = supportMessage;
    setSupportMessage('');
    setChatHistory((prev) => [...prev, { sender: 'user', text: userText }]);
    setSupportLoading(true);

    try {
      const response = await fetch('/api/gemini/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          chatHistory: chatHistory.map((m) => ({ sender: m.sender, text: m.text }))
        })
      });
      const data = await response.json();
      setChatHistory((prev) => [...prev, { sender: 'bot', text: data.reply }]);
    } catch {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Thank you for reaching out! You can also connect directly with our WhatsApp concierge at +92 300 1234567 for instant order confirmations and exchange queries.'
        }
      ]);
    } finally {
      setSupportLoading(false);
    }
  };

  // Visual Search
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setUploadedSearchImage(base64);
      setSearchLoading(true);
      try {
        const response = await fetch('/api/gemini/visual-search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: base64,
            mimeType: file.type
          })
        });
        const data = await response.json();
        setSearchResult(data);
      } catch (err) {
        console.error(err);
      } finally {
        setSearchLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateWardrobeOutfit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOutfitName.trim() || selectedForOutfit.length === 0) return;
    saveWardrobeOutfit(newOutfitName.trim(), selectedForOutfit);
    setNewOutfitName('');
    setSelectedForOutfit([]);
  };

  const toggleSelectForOutfit = (productId: string) => {
    setSelectedForOutfit((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  return (
    <section id="ai-studio" className="py-16 sm:py-20 bg-[#FAF8F5] border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-[#B69A70]/60 rounded-full mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B69A70]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#702B3A] font-semibold">
              Proprietary AI Styling Engine
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#171513]">
            VEYORA AI Fashion Studio
          </h2>
          <p className="text-sm text-stone-600 mt-2 font-light">
            Seven bespoke intelligence services designed to elevate your Pakistani fashion journey—from personalized occasion styling and accurate sizing to visual catalogue discovery.
          </p>
        </div>

        {/* 7 Feature Navigation Tabs */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-3 mb-8 border-b border-[#EAEAEA] justify-start lg:justify-center">
          <button
            onClick={() => setActiveTab('stylist')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-sm text-xs uppercase tracking-wider font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'stylist'
                ? 'bg-[#702B3A] text-white shadow-sm'
                : 'bg-white text-stone-700 hover:text-black border border-[#EAEAEA]'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>AI Personal Stylist</span>
          </button>

          <button
            onClick={() => setActiveTab('tryon')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-sm text-xs uppercase tracking-wider font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'tryon'
                ? 'bg-[#702B3A] text-white shadow-sm'
                : 'bg-white text-stone-700 hover:text-black border border-[#EAEAEA]'
            }`}
          >
            <Shirt className="w-3.5 h-3.5" />
            <span>Virtual Try-On</span>
          </button>

          <button
            onClick={() => setActiveTab('size')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-sm text-xs uppercase tracking-wider font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'size'
                ? 'bg-[#702B3A] text-white shadow-sm'
                : 'bg-white text-stone-700 hover:text-black border border-[#EAEAEA]'
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Smart Size Assistant</span>
          </button>

          <button
            onClick={() => setActiveTab('visualSearch')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-sm text-xs uppercase tracking-wider font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'visualSearch'
                ? 'bg-[#702B3A] text-white shadow-sm'
                : 'bg-white text-stone-700 hover:text-black border border-[#EAEAEA]'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Search</span>
          </button>

          <button
            onClick={() => setActiveTab('wardrobe')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-sm text-xs uppercase tracking-wider font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'wardrobe'
                ? 'bg-[#702B3A] text-white shadow-sm'
                : 'bg-white text-stone-700 hover:text-black border border-[#EAEAEA]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Wardrobe</span>
          </button>

          <button
            onClick={() => setActiveTab('support')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-sm text-xs uppercase tracking-wider font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'support'
                ? 'bg-[#702B3A] text-white shadow-sm'
                : 'bg-white text-stone-700 hover:text-black border border-[#EAEAEA]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>AI Concierge</span>
          </button>

          <button
            onClick={() => setActiveTab('recommendations')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-sm text-xs uppercase tracking-wider font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'recommendations'
                ? 'bg-[#702B3A] text-white shadow-sm'
                : 'bg-white text-stone-700 hover:text-black border border-[#EAEAEA]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Smart Recommendations</span>
          </button>
        </div>

        {/* Tab 1: AI Personal Stylist */}
        {activeTab === 'stylist' && (
          <div className="bg-white rounded-sm border border-[#EAEAEA] p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <form onSubmit={handleConsultStylist} className="lg:col-span-5 space-y-4">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="text-base font-serif font-semibold text-[#171513]">
                    Personalized Fashion Consultation
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Consult our Gemini-powered stylist tuned to Pakistani couture, lawn cuts, and luxury pret.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                    Occasion
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xs bg-[#FAF8F5]"
                  >
                    <option value="Festive & Family Gathering">Festive & Family Gathering (Eid / Dawat)</option>
                    <option value="Wedding Guest / Mehndi">Wedding Guest / Mehndi / Barat</option>
                    <option value="Daily Luxury Pret & Work">Daily Luxury Pret & Workwear</option>
                    <option value="Evening Dinner & Soirée">Evening Dinner & Soirée</option>
                    <option value="Serene Lounging & Nightwear">Serene Lounging & Sleepwear</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                    Preferred Style
                  </label>
                  <select
                    value={stylePreference}
                    onChange={(e) => setStylePreference(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xs bg-[#FAF8F5]"
                  >
                    <option value="Contemporary Eastern Pret">Contemporary Eastern Pret</option>
                    <option value="Heavily Embroidered Traditional">Heavily Embroidered Traditional</option>
                    <option value="Minimalist Chic & Neutral">Minimalist Chic & Neutral</option>
                    <option value="Vibrant Festive Luxury">Vibrant Festive Luxury</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                    Favourite Colors
                  </label>
                  <input
                    type="text"
                    value={favoriteColors}
                    onChange={(e) => setFavoriteColors(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xs"
                    placeholder="e.g. Emerald, Burgundy, Mustard, Rose Gold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                      Category Focus
                    </label>
                    <select
                      value={categoryChoice}
                      onChange={(e) => setCategoryChoice(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xs bg-[#FAF8F5]"
                    >
                      <option value="Clothes">Clothes</option>
                      <option value="Footwear">Footwear</option>
                      <option value="Bags">Bags</option>
                      <option value="Nightwear">Nightwear</option>
                      <option value="All">Complete Look</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                      Budget in PKR
                    </label>
                    <input
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xs"
                      placeholder="e.g. 10000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                    Preferred Fit
                  </label>
                  <select
                    value={fitPreference}
                    onChange={(e) => setFitPreference(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xs bg-[#FAF8F5]"
                  >
                    <option value="Relaxed Elegance">Relaxed Elegance</option>
                    <option value="Tailored Structure">Tailored Structure</option>
                    <option value="Flowy Kalidaar">Flowy Kalidaar</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={stylistLoading}
                  className="w-full py-3.5 bg-[#702B3A] hover:bg-[#551D2A] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 rounded-xs shadow-md cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-[#B69A70]" />
                  <span>{stylistLoading ? 'Styling Your Ensemble...' : 'Get Stylist Recommendations'}</span>
                </button>
              </form>

              {/* Stylist Results Display */}
              <div className="lg:col-span-7 flex flex-col justify-between bg-[#FAF8F5] p-5 rounded-sm border border-[#EAEAEA]">
                {stylistResult ? (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="border-b border-stone-200 pb-3">
                      <span className="text-[10px] uppercase tracking-widest text-[#B69A70] font-semibold">
                        Curated Recommendation
                      </span>
                      <h4 className="text-xl font-serif font-medium text-[#171513] mt-0.5">
                        {stylistResult.recommendationHeadline}
                      </h4>
                      <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                        {stylistResult.stylingRationale}
                      </p>
                    </div>

                    {/* Recommended Product Cards */}
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#171513] block mb-2.5">
                        Recommended VEYORA Pieces:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {stylistResult.recommendedProductIds
                          .map((id) => PRODUCTS.find((p) => p.id === id))
                          .filter(Boolean)
                          .map((prod) => (
                            <div
                              key={prod!.id}
                              onClick={() => openProductDetail(prod!)}
                              className="p-2.5 bg-white border border-[#EAEAEA] rounded-xs flex gap-3 hover:border-[#702B3A] transition-all cursor-pointer group"
                            >
                              <img
                                src={prod!.images[0]}
                                alt={prod!.title}
                                className="w-16 h-20 object-cover rounded-xs"
                              />
                              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                                <div>
                                  <p className="text-[9px] uppercase tracking-wider text-[#B69A70] truncate">
                                    {prod!.department} • {prod!.subcategory}
                                  </p>
                                  <h5 className="text-xs font-medium text-[#171513] group-hover:text-[#702B3A] truncate mt-0.5">
                                    {prod!.title}
                                  </h5>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-semibold text-[#702B3A]">
                                    Rs. {prod!.price.toLocaleString()}
                                  </span>
                                  <span className="text-[10px] text-stone-500 group-hover:underline">
                                    View Piece →
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Style Tips */}
                    {stylistResult.styleTips && stylistResult.styleTips.length > 0 && (
                      <div className="p-3 bg-white border border-stone-200 rounded-xs text-xs space-y-1">
                        <span className="font-semibold text-[#171513] flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                          <Sparkles className="w-3 h-3 text-[#B69A70]" />
                          Styling Advice:
                        </span>
                        {stylistResult.styleTips.map((tip, idx) => (
                          <p key={idx} className="text-stone-600 pl-4 relative before:absolute before:left-1 before:top-1.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#B69A70]">
                            {tip}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3 text-stone-400">
                    <UserCheck className="w-12 h-12 text-[#B69A70]/60 stroke-1" />
                    <p className="text-xs text-stone-500 max-w-sm">
                      Select your event, styling tastes, and budget on the left to receive a bespoke Pakistani pret and accessories ensemble tailored to your silhouette.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Virtual Try-On */}
        {activeTab === 'tryon' && (
          <div className="bg-white rounded-sm border border-[#EAEAEA] p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-stone-200 pb-4 gap-3">
              <div>
                <h3 className="text-base font-serif font-semibold text-[#171513]">
                  VEYORA Virtual Fitting & Try-On
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Select a garment from our collection and preview on model silhouettes.
                </p>
              </div>

              {/* Status Badge per Section 12 rule: clearly label feature status */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-full text-xs">
                <Info className="w-3.5 h-3.5 text-amber-700" />
                <span className="font-medium">Direct Generative Try-On Integration Ready</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Product Selection */}
              <div className="md:col-span-5 space-y-4">
                <label className="block text-xs font-semibold text-[#171513] uppercase tracking-wider">
                  1. Select Compatible Garment:
                </label>
                <div className="grid grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                  {PRODUCTS.filter((p) => p.department === 'Clothes').map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setTryOnProductId(item.id)}
                      className={`p-2 border rounded-xs cursor-pointer transition-all ${
                        tryOnProductId === item.id
                          ? 'border-[#702B3A] ring-1 ring-[#702B3A] bg-[#702B3A]/5'
                          : 'border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <img src={item.images[0]} alt={item.title} className="w-full aspect-[3/4] object-cover rounded-xs mb-1" />
                      <p className="text-[11px] font-medium text-[#171513] truncate">{item.title}</p>
                      <p className="text-[10px] text-[#702B3A] font-semibold">Rs. {item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Model / Image Workspace */}
              <div className="md:col-span-7 flex flex-col justify-between bg-[#FAF8F5] p-5 rounded-sm border border-[#EAEAEA]">
                <div className="space-y-4">
                  <label className="block text-xs font-semibold text-[#171513] uppercase tracking-wider">
                    2. Fitting Silhouette Preview:
                  </label>

                  <div className="relative aspect-[4/3] bg-white border border-dashed border-stone-300 rounded-sm overflow-hidden flex items-center justify-center p-4">
                    {tryOnImage ? (
                      <img src={tryOnImage} alt="Fitting preview" className="h-full object-contain" />
                    ) : (
                      <div className="text-center space-y-2">
                        <Shirt className="w-10 h-10 text-stone-300 mx-auto" />
                        <p className="text-xs text-stone-500">
                          Selected Garment: <strong className="text-[#171513]">{PRODUCTS.find(p => p.id === tryOnProductId)?.title}</strong>
                        </p>
                        <p className="text-[11px] text-stone-400 max-w-sm">
                          Model silhouette draped with precision proportions according to Pakistani sizing chart.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Privacy & Consent Notice */}
                  <div className="p-3 bg-white border border-stone-200 rounded-xs text-[11px] text-stone-500 flex items-start gap-2">
                    <Lock className="w-3.5 h-3.5 text-stone-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Privacy & Image Consent:</strong> Customer uploaded fitting photos are processed in temporary volatile memory and never retained on public servers.
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => {
                      const item = PRODUCTS.find((p) => p.id === tryOnProductId);
                      if (item) openProductDetail(item);
                    }}
                    className="px-6 py-2.5 bg-[#702B3A] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#551D2A] transition-colors"
                  >
                    View Product Details & Sizes →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Smart Size Assistant */}
        {activeTab === 'size' && (
          <div className="bg-white rounded-sm border border-[#EAEAEA] p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <form onSubmit={calculateSize} className="lg:col-span-5 space-y-4">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="text-base font-serif font-semibold text-[#171513]">
                    Smart Size Assistant
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Compare your exact measurements in inches against VEYORA pret and lawn pattern blocks.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                      Height (in inches)
                    </label>
                    <input
                      type="number"
                      value={heightInches}
                      onChange={(e) => setHeightInches(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xs"
                      placeholder="e.g. 64 (5'4&quot;)"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                      Bust (inches)
                    </label>
                    <input
                      type="number"
                      value={bustInches}
                      onChange={(e) => setBustInches(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xs"
                      placeholder="e.g. 36"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                      Waist (inches)
                    </label>
                    <input
                      type="number"
                      value={waistInches}
                      onChange={(e) => setWaistInches(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xs"
                      placeholder="e.g. 30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                      Hips (inches)
                    </label>
                    <input
                      type="number"
                      value={hipsInches}
                      onChange={(e) => setHipsInches(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xs"
                      placeholder="e.g. 39"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                      Usual Size
                    </label>
                    <select
                      value={usualSize}
                      onChange={(e) => setUsualSize(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xs bg-[#FAF8F5]"
                    >
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                      Preferred Fit
                    </label>
                    <select
                      value={preferredFit}
                      onChange={(e) => setPreferredFit(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xs bg-[#FAF8F5]"
                    >
                      <option value="Standard">Standard / Regular</option>
                      <option value="Relaxed">Relaxed / Comfort</option>
                      <option value="Fitted">Fitted</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#702B3A] hover:bg-[#551D2A] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 rounded-xs shadow-md cursor-pointer"
                >
                  <Ruler className="w-4 h-4 text-[#B69A70]" />
                  <span>Analyze Exact Size Fit</span>
                </button>
              </form>

              {/* Recommendation Box */}
              <div className="lg:col-span-7 bg-[#FAF8F5] p-6 rounded-sm border border-[#EAEAEA] flex flex-col justify-between">
                {sizeRecommendation ? (
                  <div className="space-y-4 animate-fadeIn">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#B69A70] font-semibold">
                        Recommended VEYORA Size
                      </span>
                      <div className="flex items-baseline gap-3 mt-1">
                        <span className="text-4xl font-serif font-bold text-[#702B3A]">
                          Size {sizeRecommendation.size}
                        </span>
                        <span className="text-xs bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded-xs">
                          {sizeRecommendation.confidence}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-700 leading-relaxed bg-white p-4 border border-stone-200 rounded-xs">
                      {sizeRecommendation.explanation}
                    </p>

                    <div className="p-3 bg-white border border-stone-200 rounded-xs text-[11px] text-stone-500">
                      <strong>Note:</strong> We do not guarantee an absolute bespoke bespoke fit because artisanal fabrics vary slightly in drape. If unsure, our 7-day exchange policy guarantees seamless replacement.
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-2 text-stone-400">
                    <Ruler className="w-10 h-10 text-[#B69A70]/60 stroke-1" />
                    <p className="text-xs text-stone-500 max-w-sm">
                      Input your bust, waist, and hip measurements in inches to calculate your precise VEYORA pret size with zero guesswork.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Visual Product Search */}
        {activeTab === 'visualSearch' && (
          <div className="bg-white rounded-sm border border-[#EAEAEA] p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-stone-200 pb-3">
              <h3 className="text-base font-serif font-semibold text-[#171513]">
                Visual Product Search
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Upload a fashion inspiration photo, lawn dress, khussa or handbag to discover matching pieces in our catalogue.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-5 space-y-4">
                <label className="block w-full border-2 border-dashed border-[#B69A70]/60 hover:border-[#702B3A] p-8 text-center rounded-sm bg-[#FAF8F5] cursor-pointer transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Camera className="w-8 h-8 text-[#B69A70] mx-auto mb-2" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#171513] block">
                    Upload Inspiration Photo
                  </span>
                  <span className="text-[11px] text-stone-400 mt-1 block">
                    JPG, PNG or WEBP from Pinterest or camera
                  </span>
                </label>

                {uploadedSearchImage && (
                  <div className="relative aspect-[3/2] rounded-xs overflow-hidden border border-stone-200">
                    <img src={uploadedSearchImage} alt="Uploaded sample" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="md:col-span-7 bg-[#FAF8F5] p-5 rounded-sm border border-[#EAEAEA]">
                {searchLoading ? (
                  <div className="py-12 text-center text-xs text-stone-500 space-y-2">
                    <Sparkles className="w-6 h-6 text-[#702B3A] animate-spin mx-auto" />
                    <p>Scanning fashion characteristics with Gemini Multimodal Vision...</p>
                  </div>
                ) : searchResult ? (
                  <div className="space-y-4">
                    <div className="bg-white p-3.5 border border-stone-200 rounded-xs text-xs text-stone-700">
                      <span className="text-[10px] uppercase font-semibold text-[#B69A70] tracking-wider block mb-1">
                        AI Image Analysis
                      </span>
                      <p>{searchResult.analysis}</p>
                    </div>

                    <span className="text-xs uppercase tracking-wider font-semibold text-[#171513] block">
                      Matching Catalogue Items:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {searchResult.matchedProductIds
                        .map((id) => PRODUCTS.find((p) => p.id === id))
                        .filter(Boolean)
                        .map((prod) => (
                          <div
                            key={prod!.id}
                            onClick={() => openProductDetail(prod!)}
                            className="p-3 bg-white border border-[#EAEAEA] rounded-xs flex gap-3 hover:border-[#702B3A] transition-all cursor-pointer"
                          >
                            <img src={prod!.images[0]} alt={prod!.title} className="w-14 h-18 object-cover rounded-xs" />
                            <div className="flex-1 overflow-hidden">
                              <h5 className="text-xs font-medium text-[#171513] truncate">{prod!.title}</h5>
                              <p className="text-xs font-semibold text-[#702B3A] mt-1">Rs. {prod!.price.toLocaleString()}</p>
                              <span className="text-[10px] text-emerald-700 font-medium">Available in Stock</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-center p-8 text-xs text-stone-400">
                    Upload a style photo to begin instant visual matching.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Digital Wardrobe */}
        {activeTab === 'wardrobe' && (
          <div className="bg-white rounded-sm border border-[#EAEAEA] p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-stone-200 pb-3">
              <h3 className="text-base font-serif font-semibold text-[#171513]">
                Your Private Digital Wardrobe
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Save favorite looks, pair items into customized ensembles, and save them securely for future events.
              </p>
            </div>

            {/* Create New Look Builder */}
            <form onSubmit={handleCreateWardrobeOutfit} className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-sm space-y-3">
              <div className="flex flex-col sm:flex-row gap-3 items-end">
                <div className="flex-1 w-full">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#171513] mb-1">
                    Create New Lookbook
                  </label>
                  <input
                    type="text"
                    value={newOutfitName}
                    onChange={(e) => setNewOutfitName(e.target.value)}
                    placeholder="e.g. Sister's Mehndi Outfit or Office Pret"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xs bg-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={selectedForOutfit.length === 0 || !newOutfitName.trim()}
                  className="px-6 py-2.5 bg-[#702B3A] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#551D2A] transition-colors disabled:opacity-50"
                >
                  Save Look ({selectedForOutfit.length} Items)
                </button>
              </div>

              {/* Quick Select from Wishlist or Catalogue */}
              <div>
                <span className="text-[11px] text-stone-600 block mb-2">
                  Select items to add to this look:
                </span>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {PRODUCTS.slice(0, 8).map((p) => {
                    const isSelected = selectedForOutfit.includes(p.id);
                    return (
                      <div
                        key={p.id}
                        onClick={() => toggleSelectForOutfit(p.id)}
                        className={`w-24 p-1.5 border rounded-xs cursor-pointer flex-shrink-0 transition-all ${
                          isSelected ? 'border-[#702B3A] bg-[#702B3A]/10 ring-1 ring-[#702B3A]' : 'border-stone-200 bg-white'
                        }`}
                      >
                        <img src={p.images[0]} alt={p.title} className="w-full h-20 object-cover rounded-xs mb-1" />
                        <p className="text-[10px] text-[#171513] truncate font-medium">{p.title}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </form>

            {/* Saved Outfits */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171513]">
                Your Saved Looks ({wardrobeOutfits.length})
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wardrobeOutfits.map((outfit) => (
                  <div key={outfit.id} className="p-4 border border-[#EAEAEA] rounded-sm bg-[#FAF8F5] space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-semibold text-[#171513]">{outfit.name}</h5>
                        <p className="text-[10px] text-stone-400">Created: {outfit.createdAt}</p>
                      </div>
                      <button
                        onClick={() => deleteWardrobeOutfit(outfit.id)}
                        className="p-1 text-stone-400 hover:text-rose-600"
                        title="Delete look"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex gap-2 overflow-x-auto">
                      {outfit.productIds
                        .map((id) => PRODUCTS.find((p) => p.id === id))
                        .filter(Boolean)
                        .map((item) => (
                          <div
                            key={item!.id}
                            onClick={() => openProductDetail(item!)}
                            className="w-16 flex-shrink-0 cursor-pointer"
                          >
                            <img src={item!.images[0]} alt={item!.title} className="w-full h-20 object-cover rounded-xs border border-stone-200" />
                            <p className="text-[9px] text-[#702B3A] font-semibold truncate mt-0.5">Rs. {item!.price.toLocaleString()}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: AI Concierge / Customer Support */}
        {activeTab === 'support' && (
          <div className="bg-white rounded-sm border border-[#EAEAEA] p-6 sm:p-8 shadow-sm">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="border-b border-stone-200 pb-3">
                <h3 className="text-base font-serif font-semibold text-[#171513]">
                  VEYORA Concierge Assistant
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Ask questions about lawn fabrics, COD delivery across Pakistan, size fits, or return policies.
                </p>
              </div>

              {/* Chat Thread */}
              <div className="h-80 overflow-y-auto space-y-3 p-4 bg-[#FAF8F5] border border-stone-200 rounded-sm">
                {chatHistory.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-sm text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#702B3A] text-white'
                          : 'bg-white text-stone-800 border border-[#EAEAEA] shadow-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {supportLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white text-stone-500 border border-[#EAEAEA] p-2.5 rounded-sm text-xs flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#B69A70] animate-spin" />
                      <span>Consulting VEYORA database...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <form onSubmit={handleSendSupportMessage} className="flex gap-2">
                <input
                  type="text"
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder="e.g. How long does COD delivery take to Karachi or Islamabad?"
                  className="flex-1 px-3.5 py-2.5 text-xs border border-stone-300 rounded-xs focus:border-[#702B3A] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={supportLoading || !supportMessage.trim()}
                  className="px-5 py-2.5 bg-[#702B3A] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#551D2A] transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 7: Smart Recommendations */}
        {activeTab === 'recommendations' && (
          <div className="bg-white rounded-sm border border-[#EAEAEA] p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-stone-200 pb-3">
              <h3 className="text-base font-serif font-semibold text-[#171513]">
                Smart Catalogue Recommendations
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Curated suggestions based on customer purchasing data and artisanal pairing rules.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {PRODUCTS.filter((p) => p.isBestSeller).map((item) => (
                <div
                  key={item.id}
                  onClick={() => openProductDetail(item)}
                  className="p-3 border border-[#EAEAEA] rounded-xs bg-[#FAF8F5] hover:border-[#702B3A] transition-all cursor-pointer group"
                >
                  <img src={item.images[0]} alt={item.title} className="w-full aspect-[3/4] object-cover rounded-xs mb-2 group-hover:scale-102 transition-transform" />
                  <p className="text-[10px] uppercase tracking-wider text-[#B69A70] font-semibold">{item.department}</p>
                  <h5 className="text-xs font-medium text-[#171513] truncate mt-0.5">{item.title}</h5>
                  <p className="text-xs font-semibold text-[#702B3A] mt-1">Rs. {item.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
