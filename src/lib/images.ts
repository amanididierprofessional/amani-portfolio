// Live project previews and adventure photography

export const portraitUrl =
  'https://amani-creative-canvas.lovable.app/__l5e/assets-v1/1666c5fa-cc2b-4384-95f2-e6e60ed60071/aidi-portrait.png';

export const avatarUrl =
  'https://amani-creative-canvas.lovable.app/__l5e/assets-v1/8ff2a038-5029-4f62-9a75-01744f9b77da/aidi-avatar.png';

/** Real product visuals */
export const projectPreviews = {
  bob: 'https://build-bob-research-application.vercel.app/bob-logo.png',
  genie: 'https://gini-magic-maker.lovable.app/og-image.png',
  stokeyange: 'https://stoke-yange.vercel.app/icon-512.png',
  /** Urugendo live app (used as inset on green product-style card) */
  urugendo: 'https://urugendo-v0.vercel.app/icon-512.png',
  urugendoScreen:
    'https://image.thum.io/get/width/390/crop/844/noanimate/https://urugendo-v0.vercel.app/',
} as const;

/**
 * Adventures
 * - water: restored via src/assets/lake-kivu.jpg (original MY HAPPY PLACE)
 * - mountains: distinct highland peaks
 * - gorilla: inset overlay only (kept)
 */
export const adventureImages = {
  // lake-kivu is wired in portfolio via import; this URL is fallback
  water:
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80',
  moon: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&q=78&fit=crop',
  mountains: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
  gorilla:
    'https://commons.wikimedia.org/wiki/Special:FilePath/A%20mountain%20gorilla%20from%20Susa%20Group%20in%20Karisimbi%20thicket%20of%20Volcanoes%20National%20Park%20in%20Rwanda.%20Emmanuel%20Kwizera.jpg?width=800',
  airplane: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&q=80&fit=crop',
  running: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&q=80',
  music: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1400&q=80&fit=crop',
} as const;
