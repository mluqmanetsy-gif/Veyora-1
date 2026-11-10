# VEYORA Shopify theme conversion (work in progress)

## Safety
- All conversion work is on `shopify-theme-conversion`.
- The React app on `main` is not overwritten.
- No Shopify store, products, customers, orders, or live theme have been modified.
- Do not publish until uploaded as an unpublished theme and reviewed.

## Included
- Shopify Online Store 2.0 Liquid layout and JSON section groups/templates.
- VEYORA palette: ink, burgundy, champagne gold and soft cream; Cormorant Garamond + Jost.
- Editable six-slide campaign hero with image pickers, navigation dots, previous/next and autoplay.
- Six editable department circles with image overrides and Shopify collection selectors.
- New Arrivals featured collection using real Shopify collection products.
- Image-led editable editorial section.
- Complete the Look section powered by a selected Shopify collection.
- Shopify-native collection, product, cart, search, standard page and 404 templates.
- Editable Shopify navigation menu and accessible mobile menu toggle.
- Product cards use Shopify product/collection objects, not the React demo product array.

## Product and cart behavior
- Product page renders Shopify product media, title, description, live variant pricing, availability and add-to-cart form.
- Cart uses Shopify cart items, quantity updates, remove links, live subtotal and Shopify checkout route.
- Product and cart layouts have responsive mobile styling.
- Selected-variant price now updates when the shopper changes the variant; mobile navigation closes after a link is selected.
- The first campaign slide uses the page H1 and subsequent slides use H2 headings.
- These changes are code-reviewed and schema-JSON validated; Shopify Theme Check and an actual store preview are still pending.

## Storefront page improvements
- Collection template includes native Shopify sorting, product count, product cards, pagination, and empty state.
- Search template uses Shopify search, escaped query display, product cards, pagination, and empty state.
- Footer includes contact/social details and conditional links to configured Shopify policies.
- All 11 JSON configuration/template files and all 11 Liquid section schemas were parsed successfully; basic Liquid block-balance checks passed. This is not a substitute for Shopify Theme Check or a live preview.

## Remaining before store-ready
1. Migrate/choose approved campaign and department images in Shopify theme settings. Original source image binaries have not yet been migrated.
2. Assign the six department blocks to the store's real Shopify collections.
3. Select the actual New Arrivals and Complete the Look collections.
4. Review policy pages, footer details and contact information.
5. Configure/test Cash on Delivery in Shopify checkout settings; theme code does not create payment methods.
6. Run Shopify Theme Check and test product variants, cart, search, collection pagination, mobile and checkout.
7. Upload as an unpublished theme for merchant review.

## Source integrity
The AI Studio React source includes sample catalogue entries, demo customer/order records and browser-local cart state. These are not treated as live Shopify data. Do not show demo ratings, reviews, best-seller claims, tracking or AI responses as genuine store data.
