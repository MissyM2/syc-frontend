/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        fontsansserif: ['Roberto', 'sans'],
        fontserif: ['Libre+Baskerville', 'serif'],
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        // sm: '2rem',
        // lg: '4rem',
        // xl: '5rem',
        // '2xl': '6rem',
      },
    },
  },
};

// colors:
//  background:  bg-blue-50
// inset background: bg-zinc-50
// text on light: text-zinc-800 (softer: text-zinc-500/80)
// input backgrounds:  bg-blue-100/30
// input borders: border-blue-500/50
// input focus:ring: ring-rose-400/50
