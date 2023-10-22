/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      darkblue: "#22223B",
      blue: "#4A4E69",
      purple: "#9A8C98",
      beige: "#C9ADA7",
      cream: "#F2E9E4",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      serif: ["Merriweather", "serif"],
      kalam: ["Kalam", "cursive"],
    },
    extend: {},
  },
  plugins: [],
};
