// Local assets + public files (fast, same-origin)

export const portraitUrl =
  'https://amani-creative-canvas.lovable.app/__l5e/assets-v1/1666c5fa-cc2b-4384-95f2-e6e60ed60071/aidi-portrait.png';

export const avatarUrl =
  'https://amani-creative-canvas.lovable.app/__l5e/assets-v1/8ff2a038-5029-4f62-9a75-01744f9b77da/aidi-avatar.png';

/** Product card images — prefer local / public for speed */
export const projectPreviews = {
  bob: 'https://build-bob-research-application.vercel.app/bob-logo.png',
  genie: 'https://gini-magic-maker.lovable.app/og-image.png',
  stokeyange: 'https://stoke-yange.vercel.app/icon-512.png',
  /** Your designed Urugendo product mockup */
  urugendo: '/2.png',
} as const;

/**
 * Adventures (local where possible for fast load)
 * - water / moon: imported from src/assets in portfolio.tsx
 * - mountains: public/Sabyanyo - Rwanda.jpg
 */
export const adventureImages = {
  mountains: '/Sabyanyo%20-%20Rwanda.jpg',
  gorilla:
    'https://commons.wikimedia.org/wiki/Special:FilePath/A%20mountain%20gorilla%20from%20Susa%20Group%20in%20Karisimbi%20thicket%20of%20Volcanoes%20National%20Park%20in%20Rwanda.%20Emmanuel%20Kwizera.jpg?width=800',
  airplane: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=75&fit=crop',
  running: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&q=75',
  music: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=75&fit=crop',
} as const;
