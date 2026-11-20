/**
 * Commodity categories (docs/WEBSITE_STRUCTURE.md §5, candidates from docs/PROJECT_REQUIREMENTS.md §8).
 *
 * Draft content rules:
 * - Grade names and descriptions are general industry definitions.
 * - Anything about how THIS business operates (accepted items, conditions, processes) is marked
 *   '[TBC]' until the business confirms it (MI-05).
 */
import electricalCard from '../assets/images/commodities/electrical-waste.webp';
import electricalWide from '../assets/images/commodities/electrical-waste-wide.webp';
import ferrousCard from '../assets/images/commodities/ferrous-metals.webp';
import ferrousWide from '../assets/images/commodities/ferrous-metals-wide.webp';
import nonFerrousCard from '../assets/images/commodities/non-ferrous-metals.webp';
import nonFerrousWide from '../assets/images/commodities/non-ferrous-metals-wide.webp';
import paperCard from '../assets/images/commodities/paper-cardboard.webp';
import paperWide from '../assets/images/commodities/paper-cardboard-wide.webp';
import plasticsCard from '../assets/images/commodities/plastics.webp';
import plasticsWide from '../assets/images/commodities/plastics-wide.webp';
import woodCard from '../assets/images/commodities/wood.webp';
import woodWide from '../assets/images/commodities/wood-wide.webp';

export const commodities = [
  {
    slug: 'ferrous-metals',
    name: 'Ferrous Metals',
    summary:
      'Iron and steel scrap, from heavy structural steel and rebar to light iron and cast iron.',
    image: ferrousCard, // 800×600 card
    imageWide: ferrousWide, // 1600×700 page header
    imageAlt: 'A pile of old steel and iron parts ready for recycling',
    overview: [
      'Ferrous metals contain iron, which makes them magnetic. Steel is one of the most recycled materials in the world, and graded ferrous scrap is a key raw material for steelworks and foundries.',
      'Scrap is graded by thickness, size and cleanliness. Well-sorted loads are processed faster and are worth more.',
      '[TBC] How the business handles ferrous metals: collection, processing and outlets (MI-05).',
    ],
    grades: [
      {
        name: 'Heavy Melting Scrap',
        code: 'HMS 1 & 2',
        description:
          'Thick steel such as beams, plate and structural sections, cut to size for melting.',
      },
      {
        name: 'Old Arisings',
        code: 'OA',
        description: 'Mixed iron and steel scrap from demolition and general sources.',
      },
      {
        name: 'Light Iron',
        description: 'Thin-gauge steel such as sheet, shelving and appliance casings.',
      },
      {
        name: 'Cast Iron',
        description: 'Brittle, high-carbon iron from engine blocks, radiators and machine bases.',
      },
      {
        name: 'Rebar',
        description: 'Steel reinforcing bar from construction and demolition sites.',
      },
      { name: 'Steel Turnings', description: 'Steel shavings and swarf produced by machining.' },
    ],
    accepted: [
      '[TBC] Clean, sorted steel and iron',
      '[TBC] Structural steel and plate',
      '[TBC] Cast iron items',
    ],
    notAccepted: [
      '[TBC] Sealed or pressurised containers',
      '[TBC] Items contaminated with oil or chemicals',
    ],
    relatedServices: ['collection-logistics', 'processing', 'export'],
  },
  {
    slug: 'non-ferrous-metals',
    name: 'Non-Ferrous Metals',
    summary:
      'Copper, brass, aluminium, stainless steel, lead and cable, graded by alloy and purity.',
    image: nonFerrousCard,
    imageWide: nonFerrousWide,
    imageAlt: 'A coil of shiny copper wire',
    overview: [
      'Non-ferrous metals contain little or no iron. They resist corrosion, are not magnetic and are usually worth more per tonne than ferrous scrap, so careful sorting makes a real difference to value.',
      'Value depends on the alloy, how clean the metal is, and whether it is mixed with insulation, solder, paint or attached steel.',
      '[TBC] How the business handles non-ferrous metals (MI-05).',
    ],
    grades: [
      {
        name: 'Copper',
        description: 'Clean copper wire, pipe and tube. Bare, bright wire is the highest grade.',
      },
      { name: 'Brass', description: 'Copper-zinc alloy from taps, valves, fittings and turnings.' },
      {
        name: 'Aluminium',
        description:
          'Extrusions, sheet, castings and alloy wheels, graded by type and cleanliness.',
      },
      {
        name: 'Stainless Steel',
        description: 'Corrosion-resistant steel from catering equipment, sinks and tanks.',
      },
      {
        name: 'Lead',
        description: 'Sheet, pipe and flashing lead from roofing and older plumbing.',
      },
      {
        name: 'Insulated Cable',
        description: 'Copper or aluminium cable with insulation, graded by recoverable metal.',
      },
    ],
    accepted: [
      '[TBC] Copper, brass and aluminium, kept separate',
      '[TBC] Stainless steel',
      '[TBC] Insulated cable',
    ],
    notAccepted: [
      '[TBC] Mixed loads with non-metal waste',
      '[TBC] Items with unknown or hazardous contents',
    ],
    relatedServices: ['collection-logistics', 'commodity-trading', 'export'],
  },
  {
    slug: 'plastics',
    name: 'Plastics',
    summary:
      'Post-industrial and post-consumer plastics sorted by polymer, including PET, HDPE, PP and film.',
    image: plasticsCard,
    imageWide: plasticsWide,
    imageAlt: 'Discarded plastic bottles collected for recycling',
    overview: [
      'Plastics are traded by polymer type. Clean, single-polymer material, especially when baled, is the easiest to recycle and has the most value.',
      'Mixed or contaminated plastic usually needs further sorting before it can be reprocessed.',
      '[TBC] How the business handles plastics (MI-05).',
    ],
    grades: [
      { name: 'PET', code: 'Code 1', description: 'Drinks bottles, food trays and strapping.' },
      { name: 'HDPE', code: 'Code 2', description: 'Milk bottles, drums, crates and pipe.' },
      { name: 'PP', code: 'Code 5', description: 'Tubs, caps, crates and woven sacks.' },
      {
        name: 'LDPE Film',
        code: 'Code 4',
        description: 'Stretch wrap, shrink film and bags from warehouses and retail.',
      },
      {
        name: 'Mixed Rigid Plastics',
        description: 'Mixed hard plastics that need sorting before reprocessing.',
      },
    ],
    accepted: ['[TBC] Clean, baled plastics sorted by polymer', '[TBC] Commercial stretch film'],
    notAccepted: ['[TBC] Plastics contaminated with food or chemicals'],
    relatedServices: ['collection-logistics', 'commodity-trading'],
  },
  {
    slug: 'paper-cardboard',
    name: 'Paper & Cardboard',
    summary:
      'Cardboard and paper grades including OCC, mixed paper, office paper and shredded paper.',
    image: paperCard,
    imageWide: paperWide,
    imageAlt: 'Compressed bales of cardboard stacked on pallets',
    overview: [
      'Paper and cardboard are graded by fibre type and cleanliness. Dry, baled, well-sorted material goes back to paper mills as a raw material.',
      '[TBC] How the business handles paper and cardboard (MI-05).',
    ],
    grades: [
      {
        name: 'Old Corrugated Cardboard',
        code: 'OCC',
        description: 'Used boxes and transit packaging, including double-wall board.',
      },
      {
        name: 'Mixed Paper',
        description: 'A mix of paper grades such as office paper, mail and brochures.',
      },
      { name: 'Office Paper', description: 'Sorted white office paper, a higher-value grade.' },
      {
        name: 'Shredded Paper',
        description: 'Paper from confidential shredding, usually bagged or baled.',
      },
    ],
    accepted: ['[TBC] Dry, baled cardboard', '[TBC] Sorted office paper'],
    notAccepted: ['[TBC] Wet or food-contaminated paper and card'],
    relatedServices: ['collection-logistics', 'commodity-trading'],
  },
  {
    slug: 'wood',
    name: 'Wood',
    summary: 'Waste wood graded A to C for recycling, panel-board manufacture and biomass fuel.',
    image: woodCard,
    imageWide: woodWide,
    imageAlt: 'A large stack of wooden pallets',
    overview: [
      'In the UK, waste wood is commonly graded A to C by how clean it is. The grade decides whether it is recycled into new products or used as biomass fuel.',
      'Hazardous wood, such as wood treated with creosote, is handled separately.',
      '[TBC] How the business handles wood (MI-05).',
    ],
    grades: [
      {
        name: 'Grade A',
        description: 'Clean, untreated wood such as pallets, packaging and offcuts.',
      },
      {
        name: 'Grade B',
        description: 'Industrial wood including construction and demolition timber.',
      },
      {
        name: 'Grade C',
        description:
          'Mixed wood including chipboard, MDF and plywood, usually used as biomass fuel.',
      },
    ],
    accepted: ['[TBC] Pallets and packaging timber', '[TBC] Construction and demolition wood'],
    notAccepted: ['[TBC] Wood treated with creosote or other hazardous preservatives'],
    relatedServices: ['collection-logistics', 'site-clearances'],
  },
  {
    slug: 'electrical-waste',
    name: 'Electrical Waste',
    summary:
      'Commercial electrical and electronic waste (WEEE), from IT equipment to appliances and cabling.',
    image: electricalCard,
    imageWide: electricalWide,
    imageAlt: 'A pile of old circuit boards and electronic components',
    overview: [
      'Electrical and electronic waste (WEEE) contains valuable metals as well as hazardous parts. It must be treated by suitably permitted facilities.',
      'Businesses have a legal duty of care to make sure their electrical waste goes to an authorised operator with the right paperwork.',
      '[TBC] How the business handles electrical waste and its permits (MI-05, MI-08).',
    ],
    grades: [
      {
        name: 'IT Equipment',
        description: 'Computers, servers, networking and telecoms equipment.',
      },
      {
        name: 'Large Appliances',
        description: 'Large electrical items such as commercial catering equipment.',
      },
      { name: 'Small Appliances', description: 'Small electrical items, tools and devices.' },
      {
        name: 'Cabling',
        description: 'Electrical and data cabling from installations and strip-outs.',
      },
    ],
    accepted: ['[TBC] Commercial IT and office equipment', '[TBC] Cabling'],
    notAccepted: ['[TBC] Data-bearing devices without an agreed data policy'],
    relatedServices: ['collection-logistics', 'site-clearances'],
  },
];

export function getCommodity(slug) {
  return commodities.find((c) => c.slug === slug);
}
