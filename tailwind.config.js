/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-page': "url('/homePage.png')",
      },
      colors: {
        'deep-forest-green': '#1B4332',
        'moss-green': '#4C6A47',
      },
    },
  },
  plugins: [],
};
