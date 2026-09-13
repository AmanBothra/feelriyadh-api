/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1240px',
        '2xl': '1496px',
      },
    },
    extend: {
      colors: {
        primary: '#c29f7b',
        lightPrimary: '#f7f0ec',
        secondary: '#181d24',
        dark: '#191d23',
      },
      fontFamily: {
        jost: ['Jost', 'sans-serif'],
        readex: ['Readex Pro', 'sans-serif'],
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins: [require('tailwindcss-dir')(), require('@tailwindcss/aspect-ratio')],
};
