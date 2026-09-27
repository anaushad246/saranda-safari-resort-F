/**
 * Central Cloudinary Asset Registry for Saranda Safari Resort
 * Cloud Name: dgnonfsob
 * Automatic format (AVIF/WebP) and automatic quality compression enabled.
 */

export const CLOUD_NAME = 'dgnonfsob';
export const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

/**
 * Returns an optimized Cloudinary delivery URL
 * @param {string} filename - Local filename (e.g. 'resort-hero.webp' or '/resort-hero.webp')
 * @param {number|null} [width=null] - Optional width limit for responsive sizing
 * @returns {string} Fully qualified Cloudinary URL
 */
export function cld(filename, width = null) {
  if (!filename) return '';
  const clean = filename.replace(/^\//, '');
  const transforms = ['f_auto', 'q_auto'];
  if (width) transforms.push(`w_${width}`);
  return `${CLOUDINARY_BASE}/${transforms.join(',')}/${clean}`;
}

export const IMAGES = {
  // Brand
  logo: cld('logo.webp'),

  // Hero & Place
  resortHero: cld('resort-hero.webp', 1600),
  placeMorningMist: cld('placemorningmist.webp', 1200),
  placeWildlife: cld('placewildlife.webp', 1200),
  placeWhyVisit: cld('placewhyvisit.webp', 1000),

  // Discovery Section (HomePage)
  leopardCaves: cld('1picture1trektoLeopardscave.webp', 800),
  waterfallsDiscovery: cld('2picture2explorewaterfalls.webp', 800),
  sunsetDiscovery: cld('3Picture3KiriburuSunsetPoint.webp', 800),

  // Accommodation / Stays
  riverwood: cld('RIVERWOODCOTTAGE.webp', 800),
  cherryBlossom: cld('CHERRYBLOSSOM.webp', 800),
  autumnAbode: cld('AUTUMNABODE.webp', 800),
  springAbode: cld('SpringAbode.webp', 800),
  gulmohar: cld('GulmoharCottage.webp', 800),
  amberwood: cld('AMBERWOOD.webp', 800),
  campingA: cld('CampingA.webp', 800),

  // Packages & Tariffs
  pkgCottage: cld('package-cottage.webp', 800),
  pkgCamping: cld('package-camping.webp', 800),
  pkgBonfire: cld('package-bonfire.webp', 800),
  dining: cld('dining.webp', 800),
  onenight: cld('onenight.webp', 800),
  womanretreat: cld('womanretreat.webp', 800),
  homeStay: cld('homeStay.webp', 800),
  hourlyStay: cld('hourlyStay.webp', 800),
  eveningUnderStar: cld('eveningUnderStar.webp', 800),
  eveningpause: cld('eveningpause.webp', 800),
  schoolExcursion: cld('schoolExcursion.webp', 800),
  wedding: cld('wedding.webp', 800),
  newYear: cld('newYear.webp', 800),

  // Experiences
  expSunrise: cld('sunriseByYourWindow.webp', 800),
  expWings: cld('AmorningWithWings.webp', 800),
  expCamping: cld('camping.webp', 800),
  expTea: cld('TeaWrapped.webp', 800),
  expLawns: cld('lawns.webp', 800),
  expBonfire: cld('bonfire.webp', 800),
  expSpring: cld('spring.webp', 800),
  expAngling: cld('angling.webp', 800),
  expFruitOrchard: cld('fruitOrchard.webp', 800),
  expSummerDays: cld('summerDays.webp', 800),
  expMusic: cld('musicalEvenings.webp', 800),
  expCycling: cld('cyclingForest.webp', 800),
  expStars: cld('closerToStars.webp', 800),

  // Sightseeing
  sightseeingHero: cld('sightseeing-hero.webp', 1200),
  jhikraWaterfall: cld('Jhikrawaterfall.webp', 800),
  pacheriWaterfall: cld('Pacheri.webp', 800),
  kiriburuSunset: cld('KiriburuSunsetPoint.webp', 800),
  pundulRiver: cld('sightseeing-pundul.webp', 800),
  mirgsinghaTemple: cld('sightseeing-mirgsingha.webp', 800),
  jateshwarTemple: cld('sightseeing-jateshwar.webp', 800)
};

export default IMAGES;
