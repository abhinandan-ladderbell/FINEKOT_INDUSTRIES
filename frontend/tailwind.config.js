/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#141D26',
        steel: '#46565F',
        mist: '#9AA7B0',
        paper: '#F4F6F7',
        sun: '#F29E0D',
        sunDark: '#D9880A',
        panel: '#155181',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body: ['Barlow', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
