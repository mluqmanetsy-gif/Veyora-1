export interface StoreContact {
  storeName: string;
  tagline: string;
  location: string;
  email: string;
  whatsappNumber: string;
  whatsappFormatted: string;
  whatsappLink: string;
  facebookLink: string;
  instagramLink: string;
  tiktokLink: string;
  businessHours: string;
}

export const STORE_CONTACT: StoreContact = {
  storeName: 'VEYORA',
  tagline: 'Elegance in Every Detail',
  location: 'Karachi, Pakistan',
  email: 'mluqmanetsy@gmail.com',
  whatsappNumber: '+923494968548',
  whatsappFormatted: '+92 349 4968548',
  whatsappLink: 'https://wa.me/923494968548',
  facebookLink: 'https://www.facebook.com/share/1HLbqfwqm3/',
  instagramLink: 'https://www.instagram.com/veyoraofficiall/',
  tiktokLink: 'https://www.tiktok.com/@veyoraofficiall',
  businessHours: 'Monday – Saturday: 10:00 AM – 8:00 PM PKT'
};

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Orders & Payment' | 'Shipping' | 'Returns & Exchange' | 'Fabrics & Sizing';
}

export const FAQS: FAQItem[] = [
  {
    category: 'Orders & Payment',
    question: 'How does Cash on Delivery (COD) work across Pakistan?',
    answer: 'Cash on Delivery is available nationwide across all cities, towns, and villages of Pakistan. You only pay the courier rider in Pakistani Rupees (PKR) when the parcel is delivered to your doorstep. No credit card or prepayment is required.'
  },
  {
    category: 'Orders & Payment',
    question: 'Why is a WhatsApp / mobile number mandatory at checkout?',
    answer: 'We require a valid Pakistani WhatsApp number to send your instant order confirmation, dispatch updates, and courier tracking details. Our order management team may also send a brief WhatsApp confirmation before packing.'
  },
  {
    category: 'Shipping',
    question: 'What are the delivery charges and shipping times?',
    answer: 'We offer FREE Delivery across Pakistan on all orders above Rs. 3,500. For orders under Rs. 3,500, a flat shipping fee of Rs. 200 applies. Karachi & Lahore orders arrive within 1-2 business days. Islamabad, Rawalpindi, Faisalabad, and other nationwide cities take 2-4 business days.'
  },
  {
    category: 'Shipping',
    question: 'Which courier services do you partner with?',
    answer: 'We partner with Pakistan’s most reliable logistics providers: Trax Logistics, Call Courier, and Leopards Courier. Every parcel has an official tracking number.'
  },
  {
    category: 'Returns & Exchange',
    question: 'What is your return and exchange policy?',
    answer: 'We provide a 7-day hassle-free exchange policy. If an item does not fit or you wish to exchange it for another article or size, contact our WhatsApp Concierge at +92 349 4968548 within 7 days of receiving the package. Items must be unworn with original tags attached.'
  },
  {
    category: 'Fabrics & Sizing',
    question: 'How do I know my correct size?',
    answer: 'Every product page includes an exact garment measurement chart in inches covering Bust, Waist, Hips, and Length. You can also use our VEYORA Smart Size Assistant or message our WhatsApp stylist for personalized sizing advice.'
  },
  {
    category: 'Fabrics & Sizing',
    question: 'Are all fabrics 100% genuine?',
    answer: 'Yes. All VEYORA pret and unstitched collections utilize 100% authentic long-staple cotton Pima lawn, pure micro-velvet, crinkle chiffon, and genuine handcrafted cow leather soles for our traditional khussas.'
  }
];

export const POLICY_CONTENTS = {
  shipping: {
    title: 'Nationwide Shipping & Delivery Policy',
    content: `
### Shipping Destinations
VEYORA delivers to all major cities, secondary towns, and remote areas across Pakistan, including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Sialkot, Gujranwala, Hyderabad, Abbottabad, and surrounding districts.

### Delivery Charges
- **Free Delivery:** On all orders with a subtotal of **Rs. 3,500 or more**.
- **Standard Flat Rate:** **Rs. 200** flat shipping fee on orders below Rs. 3,500.
- No hidden charges or extra Cash on Delivery surcharge.

### Estimated Delivery Timelines
- **Karachi (Headquarters):** 1 – 2 business days.
- **Lahore & Islamabad/Rawalpindi:** 2 – 3 business days.
- **Other Cities & Regional Towns:** 2 – 4 business days.
*Please note that during major festive launches (Eid, Ramadan) and nationwide weather disruptions, shipments may experience a 24-48 hour delay.*

### Order Dispatch & Tracking
Orders are processed and handed over to our courier partners (Trax / Call Courier / Leopards) within 24 hours of WhatsApp verification. You will receive an automated tracking link via WhatsApp upon dispatch.
    `
  },
  returns: {
    title: '7-Day Return & Exchange Policy',
    content: `
### Hassle-Free 7-Day Exchange
We want you to adore every VEYORA piece you wear. If the size does not fit or you prefer another style, you can exchange any unworn article within **7 days** of delivery.

### Exchange Eligibility Criteria
1. The garment or accessory must be in original unworn, unwashed, and undamaged condition.
2. All original VEYORA tags, brand seals, and fabric labels must remain intact.
3. For footwear (Khussas, Heels, Flats), please try on clean indoor surfaces so leather soles remain pristine.
4. Due to hygiene standards, innerwear and shapewear can only be exchanged if factory-sealed in unopened packaging.

### How to Initiate an Exchange
1. Message our WhatsApp Concierge at **+92 349 4968548** or email **mluqmanetsy@gmail.com** with your Order ID (e.g., #VY-89241).
2. Specify the item you wish to exchange and your desired replacement size or article.
3. We will book a reverse pickup through our courier partner or advise you on the nearest return drop-off hub.
4. Once received and inspected, your replacement article will be dispatched immediately with zero extra service fees.
    `
  },
  privacy: {
    title: 'Privacy & Customer Protection Policy',
    content: `
### Commitment to Privacy
VEYORA (Karachi, Pakistan) values your personal privacy. We never sell, lease, or distribute customer details, contact numbers, or delivery records to third parties.

### Information Collected
- **Customer Full Name & Delivery Address:** Used exclusively to fulfill your Cash on Delivery parcel.
- **WhatsApp / Mobile Number:** Required strictly for order verification, delivery status alerts, and courier coordination.
- **Email Address (Optional):** Used for digital invoice delivery.
- **Uploaded Photos (AI Studio / Visual Search):** Processed ephemerally in server volatile memory during your session and never stored permanently.

### Consent & Marketing Controls
Entering your phone number gives consent exclusively for order delivery coordination. Marketing updates and collection drops are strictly opt-in and can be revoked at any time by replying "STOP" on WhatsApp.
    `
  },
  terms: {
    title: 'Terms & Conditions of Service',
    content: `
### Cash on Delivery Agreement
By submitting an order on VEYORA with Cash on Delivery, you agree to receive the parcel and remit the total amount in Pakistani Rupees (PKR) to the courier representative.

### Order Verification
To safeguard against fraudulent orders and incorrect addresses, VEYORA reserves the right to conduct a brief phone call or WhatsApp message verification prior to dispatch.

### Pricing & Inventory Accuracy
All product prices are quoted in Pakistani Rupees (PKR) inclusive of local taxes. We strive for 100% inventory accuracy; however, in the rare event an artisanal pret piece sells out simultaneously in our boutique, our team will promptly contact you for an alternative or immediate cancellation.
    `
  },
  about: {
    title: 'About VEYORA — Elegance in Every Detail',
    content: `
### The VEYORA Story
Headquartered in the vibrant coastal metropolis of **Karachi, Pakistan**, VEYORA was born from a singular conviction: that modern Pakistani women deserve couture-level refinement, authentic breathable natural textiles, and thoughtful tailoring without inaccessible designer markups.

From festive 3-piece luxury lawn suits and regal velvet kalidaars to handcrafted tilla-embroidered leather khussas, structured leather bags, seamless innerwear, and pure silk nightwear, VEYORA curates elegance for every hour of your life.

Every piece is crafted in ethical partnership with master artisans and textile weavers across Sindh and Punjab, preserving our rich heritage while embracing contemporary silhouettes.
    `
  }
};
