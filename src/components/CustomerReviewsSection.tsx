import React, { useState } from 'react';
import { CUSTOMER_REVIEWS, Review } from '../data/products.ts';
import { Star, CheckCircle, MessageSquarePlus, Filter } from 'lucide-react';

export const CustomerReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(CUSTOMER_REVIEWS);
  const [sortBy, setSortBy] = useState<'recent' | 'highest'>('recent');
  const [showAddReview, setShowAddReview] = useState(false);

  // New review form
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('Lahore');
  const [productTitle, setProductTitle] = useState('Emerald Zari 3-Piece Stitched Luxury Lawn Suit');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      city: `${city} (Verified Order)`,
      productTitle,
      rating,
      date: 'Just now',
      comment: comment.trim(),
      verifiedPurchase: true
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setShowAddReview(false);
      setSubmitted(false);
      setAuthor('');
      setComment('');
    }, 2000);
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'highest') return b.rating - a.rating;
    return 0; // Default order
  });

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-[#EAEAEA] pb-6 mb-8 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#B69A70] font-semibold block mb-1">
              Real Experiences Across Pakistan
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#171513]">
              Customer Reviews
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-stone-600 bg-[#FAF8F5] px-3 py-1.5 rounded-xs border border-stone-200">
              <Filter className="w-3.5 h-3.5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rating</option>
              </select>
            </div>

            <button
              onClick={() => setShowAddReview(!showAddReview)}
              className="px-4 py-2 bg-[#702B3A] text-white text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-[#551D2A] transition-colors flex items-center gap-1.5"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Add Review Drawer / Form */}
        {showAddReview && (
          <form
            onSubmit={handleAddReview}
            className="mb-8 p-6 bg-[#FAF8F5] border border-stone-300 rounded-sm space-y-4 animate-fadeIn"
          >
            <h3 className="text-sm uppercase tracking-wider font-semibold text-[#171513]">
              Share Your VEYORA Experience
            </h3>

            {submitted ? (
              <p className="text-xs text-emerald-700 font-medium">
                Thank you! Your verified customer review has been added to the storefront.
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-stone-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Sana Javed"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-700 mb-1">City in Pakistan</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Islamabad"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-700 mb-1">Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xs bg-white"
                    >
                      <option value={5}>5 Stars - Exceptional</option>
                      <option value={4}>4 Stars - Great</option>
                      <option value={3}>3 Stars - Good</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-stone-700 mb-1">Review Comments</label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell other Pakistani shoppers about the fabric quality, stitching, and COD delivery experience..."
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xs bg-white"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddReview(false)}
                    className="px-4 py-2 border border-stone-300 text-xs uppercase tracking-wider rounded-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#702B3A] text-white text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-[#551D2A]"
                  >
                    Post Review
                  </button>
                </div>
              </>
            )}
          </form>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 border border-[#EAEAEA] rounded-sm bg-[#FAF8F5] flex flex-col justify-between space-y-3 shadow-xs"
            >
              <div className="space-y-2">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#B69A70]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? 'fill-current' : 'text-stone-300'
                      }`}
                    />
                  ))}
                  <span className="text-[10px] text-stone-400 ml-1.5">{rev.date}</span>
                </div>

                <p className="text-xs text-stone-700 italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200">
                <p className="text-xs font-semibold text-[#171513]">{rev.author}</p>
                <p className="text-[10px] text-stone-500">{rev.city}</p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium mt-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified Purchase</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
