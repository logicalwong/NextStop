/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF9F6', // Warm Alabaster
        surface: '#FFFFFF',    // Crisp White
        primary: '#0F6E7A',    // Victoria Harbour Teal
        accent: '#FF6B5B',     // Sunset Coral
        textMain: '#182226',   // Deep Slate
        textMuted: '#64747B',  // Harbour Grey
        passGrey: '#E6E4E0',   // Soft Pebble Grey
      }
    },
  },
  plugins: [],
}