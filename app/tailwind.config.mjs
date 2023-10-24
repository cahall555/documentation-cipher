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
      pink: "#FFC9B9",
      gold: "#D68C45",
      darkgreen: "#2C6E49",
      lightgreen: "#4C956C",
      background: "#FEFEE3",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      serif: ["Merriweather", "serif"],
      kalam: ["Kalam", "cursive"],
      kanit: ["Kanit", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
