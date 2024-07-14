const {
  createGlobPatternsForDependencies,
} = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,modules,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    themes: true,
    extend: {
      colors: {
        primary: '#006688',
      },
    },
  },
  plugins: [require('daisyui')],
  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          primary: '#38bdf8',

          secondary: '#fb923c',

          accent: '#2563eb',

          neutral: '#0ea5e9',

          'base-100': '#ffffff',

          info: '#1e40af',

          success: '#15803d',

          warning: '#fef08a',

          error: '#ef4444',
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'mytheme',
  },
};
