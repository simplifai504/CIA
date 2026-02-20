import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: { primary: '#6a994e' },
      screens: { '2k': '2560px' },
    },
  },
  plugins: [],
};
export default config;
