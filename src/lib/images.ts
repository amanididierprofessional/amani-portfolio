// Live project previews and distinct, high-quality adventure photography.
// The preview service captures each project's real public landing page so the
// portfolio shows the product UI instead of a generic app icon.

export const portraitUrl =
  'https://amani-creative-canvas.lovable.app/__l5e/assets-v1/1666c5fa-cc2b-4384-95f2-e6e60ed60071/aidi-portrait.png';

export const avatarUrl =
  'https://amani-creative-canvas.lovable.app/__l5e/assets-v1/8ff2a038-5029-4f62-9a75-01744f9b77da/aidi-avatar.png';

const liveScreenshot = (url: string) =>
  `https://image.thum.io/get/width/1200/crop/800/noanimate/${url}`;

/** Real product previews captured from the live apps. */
export const projectPreviews = {
  /** Bob's friendly research companion landing page */
  bob: liveScreenshot('https://build-bob-research-application.vercel.app/'),
  /** Genie — Learn AI the fun way */
  genie: liveScreenshot('https://gini-magic-maker.lovable.app/'),
  /** Stoke Yange app icon remains the clean brand mark */
  stokeyange: 'https://stoke-yange.vercel.app/icon-512.png',
  /** Urugendo splash screen, shown inside the phone frame */
  urugendoIcon: liveScreenshot('https://urugendo-v0.vercel.app/splash'),
} as const;

/** Distinct, high-quality photos for every Adventures tab. */
export const adventureImages = {
  water: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1600&q=85&fit=crop',
  moon: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&q=85&fit=crop',
  mountains: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=85&fit=crop',
  airplane: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=85&fit=crop',
  running: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1600&q=85&fit=crop',
  music: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1600&q=85&fit=crop',
} as const;
