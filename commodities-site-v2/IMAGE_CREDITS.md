# Image Credits

> Interim stock photography until the business supplies its own photos (MI-15).

## Licence

All images are from **[Unsplash](https://unsplash.com)** under the [Unsplash License](https://unsplash.com/license): free for commercial use, attribution not required (credited here as good practice). No "Unsplash+" (premium) images are used.

## Files

All images are in `src/assets/images/`. Vite fingerprints them at build time, so they're cached for a year.

- **Card images** (`categories/`, `services/`): 800×600 WebP, plus a 400×300 `*-400.webp` copy that phones download instead. A card finds its image by slug (`src/lib/images.ts`). If there's no file for a slug, the card shows its icon instead.
- **Home hero slideshow** (`hero/`): four photos (`yard`, `salvage`, `mill`, `coils`). Each is 1200×960 with an 800×640 `-sm.webp` copy for phones. The slide order and captions are set in `SLIDES` in `src/components/sections/Hero.tsx`.

| File(s) | Subject | Photographer | Source |
|---|---|---|---|
| `hero/yard*.webp` | Excavator working on a pile of scrap metal | yasin hemmati | [Unsplash](https://unsplash.com/photos/an-excavator-working-on-a-pile-of-scrap-metal-lp6CBQSr1Ek) |
| `hero/salvage*.webp` | Scrapyard with a crane and recovered industrial plant | Strange Happenings | [Unsplash](https://unsplash.com/photos/7a97DhwkY5c) |
| `hero/mill*.webp` | Molten metal in a steel foundry | Morteza Mohammadi | [Unsplash](https://unsplash.com/photos/P8jEvckndSE) |
| `hero/coils*.webp` | Rows of steel coils in a warehouse | Morteza Mohammadi | [Unsplash](https://unsplash.com/photos/-kWkoUkFyp0) |
| `categories/ferrous-metals*` | Pile of old metal parts | Karthik Srinivas | [Unsplash](https://unsplash.com/photos/a-pile-of-old-metal-parts-sitting-on-top-of-each-other-WlHycHUQIvY) |
| `categories/non-ferrous-metals*` | Coil of copper wire | Guille B | [Unsplash](https://unsplash.com/photos/a-coil-of-copper-wire-on-a-table-TqueZSSAloY) |
| `categories/plastics*` | Plastic bottles and cans for recycling | Nick Fewings | [Unsplash](https://unsplash.com/photos/discarded-plastic-bottles-and-aluminum-cans--2lJGRIY5P0) |
| `categories/paper-cardboard*` | Compressed cardboard bales on pallets | Roger Starnes Sr | [Unsplash](https://unsplash.com/photos/compressed-cardboard-bales-on-pallets-uaZ-EoR0qtM) |
| `categories/wood*` | Large stack of wooden pallets | Lucas van Oort | [Unsplash](https://unsplash.com/photos/a-large-stack-of-wooden-pallets-stacked-on-top-of-each-other-tWLgDQCKRYU) |
| `categories/weee*` | Pile of assorted electronic components | Nathan Cima | [Unsplash](https://unsplash.com/photos/a-pile-of-assorted-electronic-components-sitting-on-top-of-each-other-G09BIFdUAGU) |
| `categories/end-of-life-vehicles*` | Aerial view of crushed cars in a scrapyard | Daniel Miksha | [Unsplash](https://unsplash.com/photos/A0UcY_adDuA) |
| `categories/bulk-mixed-waste*` | Crane truck loading debris into a large bin | Alethia Briones | [Unsplash](https://unsplash.com/photos/crane-truck-loading-debris-into-a-large-bin-mKn6ZSztAT4) |
| `services/collection-haulage*` | Men loading scrap metal onto a truck | Zoshua Colah | [Unsplash](https://unsplash.com/photos/men-loading-scrap-metal-onto-a-truck-jlojbv0tG3c) |
| `services/site-clearances*` | Excavator at a demolition site with debris | Bernd Dittrich | [Unsplash](https://unsplash.com/photos/excavator-at-a-demolition-site-with-debris-hvFSLl7HF_M) |
| `services/commodity-trading*` | Compressed bales of mixed paper and cardboard | Pop & Zebra | [Unsplash](https://unsplash.com/photos/compressed-bales-of-mixed-paper-and-cardboard-waste-tneXjkII5FM) |
| `services/export-shipping*` | Shipping port with containers and cranes at dusk | Timelab | [Unsplash](https://unsplash.com/photos/shipping-port-with-containers-and-cranes-sWOvgOOFk1g) |
| `services/waste-brokerage*` | Aerial view of a shipping container yard | CHUTTERSNAP | [Unsplash](https://unsplash.com/photos/aerial-view-of-shipping-container-yard-9cCeS9Sg6nU) |
| `services/processing*` | Worker feeding material onto a conveyor belt | Ari Gardinier | [Unsplash](https://unsplash.com/photos/worker-feeding-blue-material-onto-conveyor-belt-WE8LyB7YrBM) |
| `services/elv-depollution*` | Dismantled engine cylinder heads and parts (cropped; the mechanic is not shown) | Zoshua Colah | [Unsplash](https://unsplash.com/photos/WuOdwlPKzAM) |
| `services/site-audits*` | Workers inspecting an industrial warehouse | Craftsman Concrete Floors | [Unsplash](https://unsplash.com/photos/workers-inspect-a-large-empty-industrial-warehouse-space-68E-dFpOF0g) |

## Selection notes

- Photos with a visible company name or brand logo are avoided, so the site doesn't imply a partnership that doesn't exist.
- The same photo is never used twice on one page. The End-of-Life Vehicles category and the ELV Depollution service both appear on the Home page, so they use different photos.

## Replacing with client photography

Keep the file name and dimensions, overwrite the file, and regenerate its `-400.webp` copy (400×300). No code changes are needed. To add a photo for a new category or service, save it as `categories/<slug>.webp` (or `services/<slug>.webp`) with its `-400` copy. Then remove or update the row in this table.
