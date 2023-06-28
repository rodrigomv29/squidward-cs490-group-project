/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      fifty: '50%',
      16: '4rem',
    },
  },
  screens: {
    mobile: '200px',

    tablet: '640px',
    // => @media (min-width: 640px) { ... }

    laptop: '1024px',
    // => @media (min-width: 1024px) { ... }

    desktop: '1280px',
    // => @media (min-width: 1280px) { ... }
  },
  plugins: [],
}
