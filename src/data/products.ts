export interface Product {
  id: string;
  title: string;
  slug: string;
  department: 'Clothes' | 'Innerwear' | 'Nightwear' | 'Footwear' | 'Bags' | 'Accessories';
  subcategory: string;
  price: number; // in PKR
  compareAtPrice?: number;
  images: string[];
  color: {
    name: string;
    hex: string;
  };
  sizes: string[];
  description: string;
  fabric: string;
  care: string[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  measurements?: {
    size: string;
    bust?: number; // in inches
    waist?: number;
    hips?: number;
    length?: number;
  }[];
  completeLookIds?: string[];
}

// Pakistani Brand Visual Assets
export const heroPakistaniClothes = '/src/assets/images/hero_pakistani_clothes_1794307354321.jpg';
export const heroPakistaniFootwear = '/src/assets/images/hero_pakistani_footwear_1794307355920.jpg';
export const heroPakistaniBags = '/src/assets/images/hero_pakistani_bags_1794307356888.jpg';
export const heroLuxuryInnerwear = '/src/assets/images/hero_luxury_innerwear_1794307356804.jpg';
export const heroPakistaniNightwear = '/src/assets/images/hero_pakistani_nightwear_1794307379331.jpg';
export const heroPakistaniAccessories = '/src/assets/images/hero_pakistani_accessories_1794307379655.jpg';

export const catPakistaniClothes = '/src/assets/images/cat_pakistani_clothes_1794307402592.jpg';
export const catPakistaniFootwear = '/src/assets/images/cat_pakistani_footwear_1794307402024.jpg';
export const catPakistaniBags = '/src/assets/images/cat_pakistani_bags_1794307402870.jpg';
export const catPakistaniNightwear = '/src/assets/images/cat_pakistani_nightwear_1794307403150.jpg';
export const catPakistaniInnerwear = '/src/assets/images/cat_pakistani_innerwear_1794307425111.jpg';
export const catPakistaniAccessories = '/src/assets/images/cat_pakistani_accessories_1794307426227.jpg';

export const editorialPakistaniLawn = '/src/assets/images/editorial_pakistani_lawn_1794307449738.jpg';
export const editorialPakistaniKhussas = '/src/assets/images/editorial_pakistani_khussas_1794307450238.jpg';
export const editorialPakistaniBags = '/src/assets/images/editorial_pakistani_bags_1794307451322.jpg';
export const editorialPakistaniKalidaar = '/src/assets/images/editorial_pakistani_kalidaar_1794307451350.jpg';

export const DEPARTMENTS = [
  {
    name: 'Clothes',
    slug: 'clothes',
    heroImage: catPakistaniClothes,
    subcategories: [
      'Unstitched',
      'Stitched',
      '2 Piece Suits',
      '3 Piece Suits',
      'Co-ord Sets',
      'Tops',
      'Shirts',
      'Kurtis',
      'Trousers & Pants',
      'Jeans',
      'Dresses',
      'Skirts'
    ]
  },
  {
    name: 'Innerwear',
    slug: 'innerwear',
    heroImage: catPakistaniInnerwear,
    subcategories: [
      'Bras',
      'Panties',
      'Bra & Panty Sets',
      'Shapewear',
      'Camisoles',
      'Innerwear Essentials'
    ]
  },
  {
    name: 'Nightwear',
    slug: 'nightwear',
    heroImage: catPakistaniNightwear,
    subcategories: [
      'Night Suits',
      'Pajama Sets',
      'Sleepwear',
      'Night Dresses',
      'Robes',
      'Lounge Sets',
      'Shorts Sets'
    ]
  },
  {
    name: 'Footwear',
    slug: 'footwear',
    heroImage: catPakistaniFootwear,
    subcategories: [
      'Flats',
      'Sandals',
      'Heels',
      'Sneakers',
      'Khussas',
      'Slides',
      'Boots'
    ]
  },
  {
    name: 'Bags',
    slug: 'bags',
    heroImage: catPakistaniBags,
    subcategories: [
      'Handbags',
      'Shoulder Bags',
      'Crossbody Bags',
      'Tote Bags',
      'Clutches',
      'Backpacks',
      'Wallets'
    ]
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    heroImage: catPakistaniAccessories,
    subcategories: [
      'Sunglasses',
      'Belts',
      'Scarves',
      'Hair Accessories',
      'Caps & Hats',
      'Fashion Accessories'
    ]
  }
] as const;

export const PRODUCTS: Product[] = [
  // CLOTHES
  {
    id: 'cl-001',
    title: 'Emerald Zari 3-Piece Stitched Luxury Lawn Suit',
    slug: 'emerald-zari-3-piece-stitched-luxury-lawn-suit',
    department: 'Clothes',
    subcategory: '3 Piece Suits',
    price: 9850,
    compareAtPrice: 12500,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Emerald Green', hex: '#0F5257' },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Impeccably tailored 3-piece festive lawn suit featuring delicate gold zari neckline embroidery, organza cut-work sleeves, matching cigarette pants, and a digitally printed pure silk dupatta.',
    fabric: 'Premium 100% Cotton Pima Lawn with Pure Silk Dupatta',
    care: ['Dry clean only', 'Do not bleach', 'Warm iron on reverse side'],
    isNewArrival: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 14,
    rating: 4.9,
    reviewCount: 38,
    tags: ['Festive', 'Embroidered', 'Lawn', 'Eid Collection', '3-Piece'],
    measurements: [
      { size: 'XS', bust: 34, waist: 28, hips: 37, length: 42 },
      { size: 'S', bust: 36, waist: 30, hips: 39, length: 43 },
      { size: 'M', bust: 39, waist: 33, hips: 42, length: 44 },
      { size: 'L', bust: 42, waist: 36, hips: 45, length: 44 },
      { size: 'XL', bust: 45, waist: 39, hips: 48, length: 45 }
    ],
    completeLookIds: ['fw-001', 'bg-001', 'ac-001']
  },
  {
    id: 'cl-002',
    title: 'Deep Burgundy Hand-Embroidered Velvet Kurti',
    slug: 'deep-burgundy-hand-embroidered-velvet-kurti',
    department: 'Clothes',
    subcategory: 'Kurtis',
    price: 8450,
    compareAtPrice: 10500,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Deep Burgundy', hex: '#702B3A' },
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Rich micro-velvet silhouette adorned with signature tilla and pearl embellishment along the mandarin collar and scalloped cuffs. Perfect for winter evenings and festive gatherings.',
    fabric: 'Pure Micro-Velvet (Grade A)',
    care: ['Specialist dry clean only', 'Steam iron only'],
    isNewArrival: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 9,
    rating: 5.0,
    reviewCount: 24,
    tags: ['Velvet', 'Luxury Pret', 'Burgundy', 'Party Wear'],
    measurements: [
      { size: 'S', bust: 37, waist: 31, hips: 40, length: 41 },
      { size: 'M', bust: 40, waist: 34, hips: 43, length: 42 },
      { size: 'L', bust: 43, waist: 37, hips: 46, length: 42 }
    ],
    completeLookIds: ['fw-002', 'bg-002', 'ac-003']
  },
  {
    id: 'cl-003',
    title: 'Turquoise Breeze 2-Piece Raw Silk Co-ord Set',
    slug: 'turquoise-breeze-2-piece-raw-silk-co-ord-set',
    department: 'Clothes',
    subcategory: 'Co-ord Sets',
    price: 7650,
    compareAtPrice: 8900,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Turquoise', hex: '#26A69A' },
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'A contemporary relaxed-fit button-down tunic paired with matching wide-leg trousers in breathable raw silk blend. Features subtle mother-of-pearl buttons and relaxed drop shoulders.',
    fabric: 'Korean Raw Silk Blend',
    care: ['Gentle machine wash cold', 'Hang dry in shade', 'Medium iron'],
    isNewArrival: true,
    isBestSeller: false,
    inStock: true,
    stockCount: 18,
    rating: 4.8,
    reviewCount: 19,
    tags: ['Co-ord', 'Modern', 'Pret', 'Daywear'],
    measurements: [
      { size: 'XS', bust: 36, waist: 27, hips: 38, length: 32 },
      { size: 'S', bust: 38, waist: 29, hips: 40, length: 33 },
      { size: 'M', bust: 41, waist: 32, hips: 43, length: 34 },
      { size: 'L', bust: 44, waist: 35, hips: 46, length: 34 }
    ],
    completeLookIds: ['bg-003', 'fw-003', 'ac-002']
  },
  {
    id: 'cl-004',
    title: 'Ruby Red Royal Kalidaar Chiffon Gown',
    slug: 'ruby-red-royal-kalidaar-chiffon-gown',
    department: 'Clothes',
    subcategory: 'Dresses',
    price: 15450,
    compareAtPrice: 18500,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Ruby Red', hex: '#9B111E' },
    sizes: ['S', 'M', 'L'],
    description: 'Breathtaking 16-kali flowy floor-length kalidaar crafted from crinkle chiffon with gotta patti highlights, paired with raw silk churidar and hand-block printed organza dupatta.',
    fabric: 'Pure Crinkle Chiffon with Silk Lining',
    care: ['Dry clean only', 'Keep wrapped in muslin'],
    isNewArrival: false,
    isBestSeller: true,
    inStock: true,
    stockCount: 6,
    rating: 5.0,
    reviewCount: 42,
    tags: ['Festive', 'Bridal Guest', 'Chiffon', 'Kalidaar'],
    measurements: [
      { size: 'S', bust: 36, waist: 29, hips: 40, length: 54 },
      { size: 'M', bust: 39, waist: 32, hips: 43, length: 55 },
      { size: 'L', bust: 42, waist: 35, hips: 46, length: 55 }
    ],
    completeLookIds: ['fw-001', 'bg-004', 'ac-005']
  },
  {
    id: 'cl-005',
    title: 'Royal Blue Jacquard 3-Piece Unstitched Lawn',
    slug: 'royal-blue-jacquard-3-piece-unstitched-lawn',
    department: 'Clothes',
    subcategory: 'Unstitched',
    price: 5950,
    compareAtPrice: 7200,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Royal Blue', hex: '#1D4ED8' },
    sizes: ['Unstitched (3M Shirt + 2.5M Trouser + 2.5M Dupatta)'],
    description: 'Self-textured gold jacquard lawn shirt with embroidered organza front motif and daman border. Includes dyed cambric cotton trouser and jacquard net dupatta.',
    fabric: 'Jacquard Weave Cotton Lawn',
    care: ['Gentle hand wash', 'Dry in shade'],
    isNewArrival: true,
    isBestSeller: false,
    inStock: true,
    stockCount: 22,
    rating: 4.7,
    reviewCount: 15,
    tags: ['Unstitched', 'Jacquard', 'Lawn', 'Summer Edit'],
    completeLookIds: ['bg-001', 'fw-003']
  },
  {
    id: 'cl-006',
    title: 'Mustard Marigold Minimalist Kurti & Culottes',
    slug: 'mustard-marigold-minimalist-kurti-culottes',
    department: 'Clothes',
    subcategory: '2 Piece Suits',
    price: 6850,
    compareAtPrice: 7990,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Mustard Yellow', hex: '#D97706' },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Crisp handloom slub cotton straight kurti with thread-work button detailing down the placket, matched with breathable cropped culottes.',
    fabric: '100% Breathable Slub Cotton',
    care: ['Machine wash gentle', 'Line dry', 'Warm iron'],
    isNewArrival: false,
    isBestSeller: true,
    inStock: true,
    stockCount: 16,
    rating: 4.8,
    reviewCount: 31,
    tags: ['Daily Wear', 'Cotton', 'Summer', 'Pret'],
    measurements: [
      { size: 'XS', bust: 35, waist: 28, hips: 38, length: 40 },
      { size: 'S', bust: 37, waist: 30, hips: 40, length: 41 },
      { size: 'M', bust: 40, waist: 33, hips: 43, length: 42 },
      { size: 'L', bust: 43, waist: 36, hips: 46, length: 42 }
    ],
    completeLookIds: ['bg-005', 'fw-004']
  },

  // INNERWEAR
  {
    id: 'iw-001',
    title: 'Signature Seamless Wirefree T-Shirt Bra',
    slug: 'signature-seamless-wirefree-t-shirt-bra',
    department: 'Innerwear',
    subcategory: 'Bras',
    price: 2450,
    compareAtPrice: 2950,
    images: [
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Nude Almond', hex: '#D7B99A' },
    sizes: ['32B', '34B', '36B', '38B', '34C', '36C', '38C'],
    description: 'Zero-pressure, ultra-soft seamless t-shirt bra designed specifically for invisible comfort under thin lawn shirts and western blouses. Features memory foam contoured cups.',
    fabric: '85% Micro-Polyamide, 15% Elastane',
    care: ['Hand wash cold only', 'Do not tumble dry', 'Lay flat to dry'],
    isNewArrival: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 35,
    rating: 4.9,
    reviewCount: 64,
    tags: ['Everyday Comfort', 'Seamless', 'Invisible Under Lawn', 'Wirefree']
  },
  {
    id: 'iw-002',
    title: 'High-Waist Firm Control Tummy Sculpting Shapewear',
    slug: 'high-waist-firm-control-tummy-sculpting-shapewear',
    department: 'Innerwear',
    subcategory: 'Shapewear',
    price: 3850,
    compareAtPrice: 4500,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Champagne Beige', hex: '#E2D3BE' },
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    description: 'Targeted core smoothing shaper shorts with non-roll silicone band. Smooths the tummy, hips, and lower back flawlessly under fitted gowns, sarees, and formal pret.',
    fabric: 'PowerMesh Sculpt Technology (78% Nylon, 22% Spandex)',
    care: ['Gentle hand wash with mild detergent', 'Air dry in shade'],
    isNewArrival: false,
    isBestSeller: true,
    inStock: true,
    stockCount: 20,
    rating: 4.9,
    reviewCount: 51,
    tags: ['Shapewear', 'Sculpt', 'Formal Prep', 'Smooth Silhouette']
  },
  {
    id: 'iw-003',
    title: 'Burgundy Rose Eyelash Lace Bralette & Panty Set',
    slug: 'burgundy-rose-eyelash-lace-bralette-panty-set',
    department: 'Innerwear',
    subcategory: 'Bra & Panty Sets',
    price: 3950,
    compareAtPrice: 4800,
    images: [
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Deep Burgundy', hex: '#702B3A' },
    sizes: ['S', 'M', 'L'],
    description: 'Romantic scalloped eyelash floral lace bralette with matching cheeky briefs. Crafted with breathable cotton gusset and adjustable satin back straps.',
    fabric: 'Soft Stretch French Floral Lace with 100% Cotton Lining',
    care: ['Hand wash in cool water', 'Do not wring'],
    isNewArrival: true,
    isBestSeller: false,
    inStock: true,
    stockCount: 15,
    rating: 5.0,
    reviewCount: 28,
    tags: ['Luxury Lingerie', 'Lace', 'Burgundy', 'Bridal Troussier']
  },
  {
    id: 'iw-004',
    title: 'Pure Organic Cotton Seamless Breathable Camisole',
    slug: 'pure-organic-cotton-seamless-breathable-camisole',
    department: 'Innerwear',
    subcategory: 'Camisoles',
    price: 1850,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Crisp White', hex: '#FFFFFF' },
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Essential summer layering slip crafted from long-staple organic cotton. Moisture-wicking and ultra-soft, keeping you cool under Pakistani summer temperatures.',
    fabric: '95% Organic Combed Cotton, 5% Lycra',
    care: ['Machine wash warm', 'Tumble dry low'],
    isNewArrival: false,
    isBestSeller: true,
    inStock: true,
    stockCount: 40,
    rating: 4.8,
    reviewCount: 47,
    tags: ['Summer Essential', 'Organic Cotton', 'Slip', 'Lawn Layering']
  },

  // NIGHTWEAR
  {
    id: 'nw-001',
    title: 'Mulberry Silk Contrast Piping Classic Pajama Set',
    slug: 'mulberry-silk-contrast-piping-classic-pajama-set',
    department: 'Nightwear',
    subcategory: 'Pajama Sets',
    price: 6950,
    compareAtPrice: 8500,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Midnight Navy & Champagne', hex: '#1E293B' },
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Timeless luxury sleepwear featuring a notched collar button-down top with delicate champagne gold piping, paired with relaxed straight-leg pants with an elasticated drawstring waist.',
    fabric: 'Ultra-Luxe Heavyweight Satin Silk',
    care: ['Gentle cycle cold wash', 'Use silk friendly detergent', 'Iron low'],
    isNewArrival: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 12,
    rating: 4.9,
    reviewCount: 33,
    tags: ['Luxury Sleepwear', 'Satin Silk', 'Bridal Troussier', 'Classic']
  },
  {
    id: 'nw-002',
    title: 'Emerald Green Satin Kimono Lounging Robe',
    slug: 'emerald-green-satin-kimono-lounging-robe',
    department: 'Nightwear',
    subcategory: 'Robes',
    price: 4950,
    compareAtPrice: 6200,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Emerald Jewel', hex: '#0F5257' },
    sizes: ['One Size (Fits S to XL)'],
    description: 'Flowing floor-length satin robe with romantic scalloped lace at sleeve hems and a detachable matching tie belt. Perfect for serene morning teas and evening unwindings.',
    fabric: 'Premium High-Density Poly Satin with French Lace',
    care: ['Machine wash delicate', 'Hang to dry'],
    isNewArrival: true,
    isBestSeller: false,
    inStock: true,
    stockCount: 17,
    rating: 4.8,
    reviewCount: 22,
    tags: ['Robe', 'Emerald', 'Bridal', 'Lounge']
  },
  {
    id: 'nw-003',
    title: 'Blush Pink Modal Cotton Ribbed Sleep Lounge Set',
    slug: 'blush-pink-modal-cotton-ribbed-sleep-lounge-set',
    department: 'Nightwear',
    subcategory: 'Lounge Sets',
    price: 4650,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Blush Rose', hex: '#E7B4B6' },
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Cloud-soft ribbed modal sleep set including a cropped tank with lettuce hem and matching wide-leg lounge trousers. Butter-soft against sensitive skin.',
    fabric: '93% Lenzing Modal, 7% Spandex',
    care: ['Cold machine wash', 'Do not tumble dry'],
    isNewArrival: false,
    isBestSeller: true,
    inStock: true,
    stockCount: 25,
    rating: 5.0,
    reviewCount: 39,
    tags: ['Modal Cotton', 'Ribbed', 'Lounge', 'Super Soft']
  },

  // FOOTWEAR
  {
    id: 'fw-001',
    title: 'Champagne Gold Hand-Embroidered Tilla Khussa',
    slug: 'champagne-gold-hand-embroidered-tilla-khussa',
    department: 'Footwear',
    subcategory: 'Khussas',
    price: 4950,
    compareAtPrice: 6200,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Champagne Gold', hex: '#B69A70' },
    sizes: ['36', '37', '38', '39', '40', '41'],
    description: 'Authentic handcrafted Pakistani khussa in pure cow leather sole, heavily encrusted with golden tilla thread work, dabka and tiny faux pearls. Padded double-cushioned insole for all-day bite-free festive comfort.',
    fabric: 'Genuine Leather Sole with Raw Silk Upper',
    care: ['Wipe clean with a dry cloth', 'Store in cloth dust bag'],
    isNewArrival: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 19,
    rating: 5.0,
    reviewCount: 57,
    tags: ['Festive', 'Khussa', 'Handcrafted', 'Leather', 'Gold'],
    completeLookIds: ['cl-001', 'bg-001']
  },
  {
    id: 'fw-002',
    title: 'Deep Burgundy Velvet Block-Heel Strappy Sandals',
    slug: 'deep-burgundy-velvet-block-heel-strappy-sandals',
    department: 'Footwear',
    subcategory: 'Heels',
    price: 5850,
    compareAtPrice: 7200,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Deep Burgundy', hex: '#702B3A' },
    sizes: ['36', '37', '38', '39', '40'],
    description: 'Sophisticated 2.5-inch block heel crafted in plush wine velvet with delicate criss-cross ankle straps and a polished gold buckle. Sturdy and graceful for wedding dinners.',
    fabric: 'Velvet Upper with Synthetic Grip Outsole',
    care: ['Brush gently with soft bristle brush'],
    isNewArrival: true,
    isBestSeller: false,
    inStock: true,
    stockCount: 11,
    rating: 4.8,
    reviewCount: 18,
    tags: ['Heels', 'Velvet', 'Burgundy', 'Wedding']
  },
  {
    id: 'fw-003',
    title: 'Minimalist Metallic Rose Gold Slip-On Flats',
    slug: 'minimalist-metallic-rose-gold-slip-on-flats',
    department: 'Footwear',
    subcategory: 'Flats',
    price: 3650,
    images: [
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Rose Gold', hex: '#B76E79' },
    sizes: ['36', '37', '38', '39', '40', '41'],
    description: 'Everyday understated elegance. Pointed-toe flat mules in metallic shimmer finish with supportive arch cushion for office and college wear.',
    fabric: 'Cruelty-Free Vegan Leather',
    care: ['Clean with damp cloth'],
    isNewArrival: false,
    isBestSeller: true,
    inStock: true,
    stockCount: 28,
    rating: 4.7,
    reviewCount: 34,
    tags: ['Flats', 'Daily Comfort', 'Pointed Toe', 'Mules']
  },
  {
    id: 'fw-004',
    title: 'Artisanal Kolhapuri Leather Chappals with Pearls',
    slug: 'artisanal-kolhapuri-leather-chappals-with-pearls',
    department: 'Footwear',
    subcategory: 'Sandals',
    price: 3950,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Tan & Ivory', hex: '#C28859' },
    sizes: ['36', '37', '38', '39', '40', '41'],
    description: 'Classic handcrafted leather Kolhapuri sandals elevated with genuine river pearl braiding along the toe ring and soft woven vamp.',
    fabric: 'Vegetable Tanned Natural Leather',
    care: ['Condition with leather oil twice a year'],
    isNewArrival: false,
    isBestSeller: false,
    inStock: true,
    stockCount: 15,
    rating: 4.9,
    reviewCount: 26,
    tags: ['Kolhapuri', 'Traditional', 'Summer Sandals']
  },

  // BAGS
  {
    id: 'bg-001',
    title: 'The Sovereign Structured Burgundy Leather Tote',
    slug: 'the-sovereign-structured-burgundy-leather-tote',
    department: 'Bags',
    subcategory: 'Tote Bags',
    price: 9450,
    compareAtPrice: 11950,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Deep Burgundy', hex: '#702B3A' },
    sizes: ['Standard (36cm x 28cm x 14cm)'],
    description: 'Masterfully structured daily work tote in pebbled grain faux leather with VEYORA gold-embossed crest, dedicated padded tablet compartment, and detachable shoulder strap.',
    fabric: 'Ultra-Durable Premium Microfiber Vegan Leather with Jacquard Lining',
    care: ['Store with filler to retain shape', 'Wipe clean with soft microfiber'],
    isNewArrival: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 8,
    rating: 5.0,
    reviewCount: 46,
    tags: ['Tote Bag', 'Burgundy', 'Workwear', 'Gold Hardware'],
    completeLookIds: ['cl-001', 'fw-002']
  },
  {
    id: 'bg-002',
    title: 'Quilted Noir Chain Crossbody Camera Bag',
    slug: 'quilted-noir-chain-crossbody-camera-bag',
    department: 'Bags',
    subcategory: 'Crossbody Bags',
    price: 5850,
    compareAtPrice: 6990,
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Noir Black', hex: '#171513' },
    sizes: ['Compact (21cm x 15cm x 7cm)'],
    description: 'Supple diamond quilted leather crossbody with heavy antique gold chain strap, twist-lock front compartment, and interior card slots.',
    fabric: 'Smooth Vegan Leather with Brushed Brass Hardware',
    care: ['Keep away from direct heat and water'],
    isNewArrival: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 14,
    rating: 4.9,
    reviewCount: 39,
    tags: ['Crossbody', 'Quilted', 'Evening Bag', 'Black']
  },
  {
    id: 'bg-003',
    title: 'Minimalist Crescent Leather Shoulder Bag',
    slug: 'minimalist-crescent-leather-shoulder-bag',
    department: 'Bags',
    subcategory: 'Shoulder Bags',
    price: 5250,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Champagne Cream', hex: '#F0EAD6' },
    sizes: ['Medium (27cm x 18cm x 6cm)'],
    description: '90s-inspired sculpted half-moon silhouette that sits comfortably under the arm. Features magnetic flap closure and gold zipper pocket.',
    fabric: 'Smooth Matte Calfskin Finish Vegan Leather',
    care: ['Store in dust bag'],
    isNewArrival: false,
    isBestSeller: false,
    inStock: true,
    stockCount: 16,
    rating: 4.8,
    reviewCount: 21,
    tags: ['Shoulder Bag', 'Minimalist', 'Neutral', 'Trend']
  },
  {
    id: 'bg-004',
    title: 'Festive Raw Silk Zardozi Potli Clutch',
    slug: 'festive-raw-silk-zardozi-potli-clutch',
    department: 'Bags',
    subcategory: 'Clutches',
    price: 4250,
    compareAtPrice: 5500,
    images: [
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Antique Gold & Ruby', hex: '#B69A70' },
    sizes: ['Potli (22cm x 20cm)'],
    description: 'Enchanting drawstring evening potli bag hand-embellished with intricate zardozi, kora, and pearl tassels on champagne raw silk.',
    fabric: 'Pure Raw Silk with Satin Lining & Beaded Handle',
    care: ['Spot clean only', 'Store wrapped in muslin'],
    isNewArrival: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 10,
    rating: 5.0,
    reviewCount: 31,
    tags: ['Potli', 'Clutch', 'Festive', 'Wedding Season']
  },
  {
    id: 'bg-005',
    title: 'Woven Straw & Leather Trim Summer Market Tote',
    slug: 'woven-straw-leather-trim-summer-market-tote',
    department: 'Bags',
    subcategory: 'Handbags',
    price: 4850,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Honey Tan & Natural Straw', hex: '#D2A679' },
    sizes: ['Large (38cm x 30cm x 15cm)'],
    description: 'Hand-woven natural palm straw basket tote accented with saddle tan leather handles and a secure canvas drawstring pouch.',
    fabric: 'Natural Palm Leaf & Full Grain Faux Leather',
    care: ['Keep dry', 'Dust with dry cloth'],
    isNewArrival: false,
    isBestSeller: false,
    inStock: true,
    stockCount: 12,
    rating: 4.7,
    reviewCount: 14,
    tags: ['Summer Tote', 'Woven Straw', 'Vacation', 'Casual']
  },

  // ACCESSORIES
  {
    id: 'ac-001',
    title: 'Mughal Heritage Pure Silk Printed Shawl',
    slug: 'mughal-heritage-pure-silk-printed-shawl',
    department: 'Accessories',
    subcategory: 'Scarves',
    price: 4450,
    compareAtPrice: 5500,
    images: [
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Jewel Multicolour', hex: '#702B3A' },
    sizes: ['Full Shawl (100cm x 200cm)'],
    description: 'Opulent digital print on twill silk inspired by Lahore fort frescoes and Mughal botanical miniature paintings. Finished with rolled hand-stitched borders.',
    fabric: '100% Habotai Twill Silk',
    care: ['Dry clean or delicate hand wash with wool detergent'],
    isNewArrival: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 18,
    rating: 5.0,
    reviewCount: 41,
    tags: ['Silk Scarf', 'Mughal Print', 'Luxury Shawl', 'Heritage'],
    completeLookIds: ['cl-001', 'bg-001']
  },
  {
    id: 'ac-002',
    title: 'Oversized Cat-Eye Acetate Sunglasses',
    slug: 'oversized-cat-eye-acetate-sunglasses',
    department: 'Accessories',
    subcategory: 'Sunglasses',
    price: 3450,
    compareAtPrice: 4200,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Tortoiseshell & Gold', hex: '#583D28' },
    sizes: ['One Size (UV400 Protected)'],
    description: 'Chic bold cat-eye frame featuring warm tortoiseshell Italian acetate, scratch-resistant brown gradient lenses, and subtle gold temple tips.',
    fabric: 'Hand-Polished Bio-Acetate with UV400 Polarized Lenses',
    care: ['Clean with included microfiber cloth only', 'Keep in hard case'],
    isNewArrival: false,
    isBestSeller: true,
    inStock: true,
    stockCount: 24,
    rating: 4.8,
    reviewCount: 37,
    tags: ['Sunglasses', 'UV Protection', 'Statement', 'Summer']
  },
  {
    id: 'ac-003',
    title: 'Reversible Leather Waist Belt with Sculpted Gold Buckle',
    slug: 'reversible-leather-waist-belt-sculpted-gold-buckle',
    department: 'Accessories',
    subcategory: 'Belts',
    price: 2650,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Burgundy & Noir Black (Reversible)', hex: '#702B3A' },
    sizes: ['S (28-32 in)', 'M (32-36 in)', 'L (36-40 in)'],
    description: 'Versatile dual-sided waist cincher: deep burgundy on one side and sleek noir black on the other. Features an organic organic-curved hammered gold buckle.',
    fabric: 'Split Grain Italian Vegan Leather',
    care: ['Store hanging or loosely rolled'],
    isNewArrival: true,
    isBestSeller: false,
    inStock: true,
    stockCount: 22,
    rating: 4.9,
    reviewCount: 19,
    tags: ['Belt', 'Reversible', 'Gold Hardware', 'Waist Cincher']
  },
  {
    id: 'ac-004',
    title: 'Handcrafted Pearl & Crystal Hair Claw Clip Duo',
    slug: 'handcrafted-pearl-crystal-hair-claw-clip-duo',
    department: 'Accessories',
    subcategory: 'Hair Accessories',
    price: 1950,
    images: [
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Opalescent Pearl', hex: '#FDFBF7' },
    sizes: ['Set of 2 (Large 11cm + Medium 8cm)'],
    description: 'Sturdy cellulose acetate claw clips encrusted with freshwater-style faux pearls and sparkling pavé crystals. Strong spring grip for thick hair.',
    fabric: 'Eco-friendly Cellulose Acetate & Pearl Inlay',
    care: ['Keep away from hair sprays and perfumes'],
    isNewArrival: false,
    isBestSeller: true,
    inStock: true,
    stockCount: 30,
    rating: 4.8,
    reviewCount: 27,
    tags: ['Hair Clip', 'Pearls', 'Bridal Prep', 'Gift']
  },
  {
    id: 'ac-005',
    title: 'Gotta Patti Embellished Chiffon Dupatta',
    slug: 'gotta-patti-embellished-chiffon-dupatta',
    department: 'Accessories',
    subcategory: 'Fashion Accessories',
    price: 3650,
    compareAtPrice: 4500,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
    ],
    color: { name: 'Mustard Gold', hex: '#D97706' },
    sizes: ['2.5 Meters (Standard Dupatta)'],
    description: 'Festive crinkle chiffon dupatta edged with four-sided traditional golden gotta patti border and scattered kiran fringe tassels.',
    fabric: 'Pure Crinkle Chiffon',
    care: ['Dry clean only'],
    isNewArrival: true,
    isBestSeller: false,
    inStock: true,
    stockCount: 14,
    rating: 5.0,
    reviewCount: 16,
    tags: ['Dupatta', 'Gotta Patti', 'Festive', 'Traditional']
  }
];

// Complete the look outfit sets
export interface CompleteLookSet {
  id: string;
  name: string;
  tagline: string;
  department: string;
  productIds: string[];
  bannerImage: string;
}

export const COMPLETE_LOOK_SETS: CompleteLookSet[] = [
  {
    id: 'look-01',
    name: 'The Regal Sovereign Ensemble',
    tagline: 'Emerald Luxury Pret with Handcrafted Khussas & Burgundy Tote',
    department: 'Clothes',
    productIds: ['cl-001', 'fw-001', 'bg-001', 'ac-001'],
    bannerImage: heroPakistaniClothes
  },
  {
    id: 'look-02',
    name: 'Burgundy Velvet Soirée',
    tagline: 'Hand-Embroidered Velvet Kurti, Block Heels & Potli Clutch',
    department: 'Clothes',
    productIds: ['cl-002', 'fw-002', 'bg-004', 'ac-003'],
    bannerImage: editorialPakistaniKalidaar
  },
  {
    id: 'look-03',
    name: 'Contemporary Raw Silk Daylight',
    tagline: 'Turquoise Co-ord, Minimalist Mules & Crescent Shoulder Bag',
    department: 'Clothes',
    productIds: ['cl-003', 'fw-003', 'bg-003', 'ac-002'],
    bannerImage: editorialPakistaniLawn
  }
];

// Customer reviews
export interface Review {
  id: string;
  author: string;
  city: string;
  productTitle: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    author: 'Ayesha Malik',
    city: 'Lahore (DHA)',
    productTitle: 'Emerald Zari 3-Piece Stitched Luxury Lawn Suit',
    rating: 5,
    date: '3 days ago',
    comment: 'The stitching and fabric quality exceeded my expectations. The zari work is so refined and not scratchy at all. Delivered via COD in 2 days right to my doorstep!',
    verifiedPurchase: true
  },
  {
    id: 'rev-02',
    author: 'Zainab Siddiqui',
    city: 'Karachi (Clifton)',
    productTitle: 'The Sovereign Structured Burgundy Leather Tote',
    rating: 5,
    date: '1 week ago',
    comment: 'The deep burgundy shade is simply breathtaking. Sturdy gold hardware, holds my 13-inch laptop easily. VEYORA packaging was pure luxury.',
    verifiedPurchase: true
  },
  {
    id: 'rev-03',
    author: 'Fatima Noor',
    city: 'Islamabad (F-7)',
    productTitle: 'Champagne Gold Hand-Embroidered Tilla Khussa',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Most comfortable khussas I own! The double padded sole means zero shoe bites. Wore them to my sister’s mehndi and danced all night.',
    verifiedPurchase: true
  },
  {
    id: 'rev-04',
    author: 'Hiba Tariq',
    city: 'Faisalabad',
    productTitle: 'Mulberry Silk Contrast Piping Classic Pajama Set',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Obsessed with this night suit. Butter smooth silk satin and fits true to size. Getting the emerald kimono robe next!',
    verifiedPurchase: true
  }
];

export interface HeroSlide {
  id: number;
  department: 'Clothes' | 'Footwear' | 'Bags' | 'Innerwear' | 'Nightwear' | 'Accessories';
  heading: string;
  description: string;
  ctaText: string;
  collectionSlug: string;
  image: string;
  badge: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    department: 'Clothes',
    heading: 'Discover Your Signature Style',
    description: 'From elegant Eastern wear to contemporary everyday outfits, find a look that feels uniquely yours.',
    ctaText: 'SHOP CLOTHES',
    collectionSlug: 'clothes',
    image: heroPakistaniClothes,
    badge: 'Festive Luxury Pret'
  },
  {
    id: 2,
    department: 'Footwear',
    heading: 'Step Into Elegance',
    description: 'Explore beautiful footwear designed to complete every outfit and every occasion.',
    ctaText: 'EXPLORE FOOTWEAR',
    collectionSlug: 'footwear',
    image: heroPakistaniFootwear,
    badge: 'Artisanal Khussas & Heels'
  },
  {
    id: 3,
    department: 'Bags',
    heading: 'Carry Your Style',
    description: 'Discover handbags and everyday essentials that bring elegance to every moment.',
    ctaText: 'SHOP BAGS',
    collectionSlug: 'bags',
    image: heroPakistaniBags,
    badge: 'Signature Leather & Potlis'
  },
  {
    id: 4,
    department: 'Innerwear',
    heading: 'Comfort Meets Confidence',
    description: 'Explore thoughtfully selected everyday essentials designed for comfort and confidence.',
    ctaText: 'EXPLORE INNERWEAR',
    collectionSlug: 'innerwear',
    image: heroLuxuryInnerwear,
    badge: 'Seamless Essentials'
  },
  {
    id: 5,
    department: 'Nightwear',
    heading: 'Relax In Your Own Style',
    description: 'Discover comfortable nightwear and loungewear for your moments of relaxation.',
    ctaText: 'SHOP NIGHTWEAR',
    collectionSlug: 'nightwear',
    image: heroPakistaniNightwear,
    badge: 'Mulberry Silk & Modals'
  },
  {
    id: 6,
    department: 'Accessories',
    heading: 'The Details Make the Look',
    description: 'Complete your style with beautiful accessories for every occasion.',
    ctaText: 'SHOP ACCESSORIES',
    collectionSlug: 'accessories',
    image: heroPakistaniAccessories,
    badge: 'Silk Shawls & Jewels'
  }
];

export const PAKISTAN_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Wah Cantt',
  'Mardan',
  'Muzaffarabad',
  'Mirpur (AJK)',
  'Gilgit'
];

export const PAKISTAN_PROVINCES = [
  'Punjab',
  'Sindh',
  'Khyber Pakhtunkhwa',
  'Balochistan',
  'Islamabad Capital Territory',
  'Azad Jammu & Kashmir',
  'Gilgit-Baltistan'
];
