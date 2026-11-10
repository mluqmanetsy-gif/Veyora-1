# VEYORA Shopify theme conversion (work in progress)

This folder is a Shopify Online Store 2.0 theme scaffold based on the approved VEYORA AI Studio visual direction.

## Safety
- All work is on the `shopify-theme-conversion` branch.
- The AI Studio React app on `main` is not overwritten.
- No Shopify store, products, customers, orders, or live theme have been modified.
- Do not publish this theme until it has been uploaded as an unpublished theme and reviewed.

## Included so far
- Liquid theme layout and global header/footer section groups.
- VEYORA palette: ink, burgundy, champagne gold, soft cream.
- Cormorant Garamond + Jost typography.
- Editable hero, six department circles, featured collection, editorial statement.
- Shopify-native collection, product, cart, search, standard page, and 404 templates.
- Editable Shopify navigation menu setting and accessible mobile menu toggle.
- JSON syntax checked for all section-group, config, and template JSON files (this is not a substitute for Shopify Theme Check).
- Featured collections and product cards use Shopify Liquid objects rather than the React demo product array.

## Still required before a store-ready upload
1. Migrate the approved campaign/category/editorial image assets into Shopify theme assets or configure them in the theme editor.
2. Configure the six department blocks to point to the store's real Shopify collections and confirm collection handles.
3. Review all legal/policy pages and contact details against the store's actual approved policies.
4. Replace/omit demo-only review, rating, best-seller and AI features unless connected to genuine Shopify/app data.
5. Configure and test Cash on Delivery in Shopify checkout settings; this theme does not create orders itself.
6. Validate with Shopify Theme Check and test mobile, product variants, cart, search, collection pagination, and checkout.
7. Upload as an unpublished theme for merchant review.

## Important integration note
The source React project contains a hard-coded sample product catalogue, seeded sample customer/order records, and browser-local cart state. Those must not be presented as live store data. This Shopify theme uses Shopify's real product, collection, cart and checkout objects for the core shopping flow.
