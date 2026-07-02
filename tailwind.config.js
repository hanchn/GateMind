/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        app: "var(--app-bg)",
        surface: "var(--surface)",
        panel: "var(--panel)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
      },
      fontFamily: {
        sans: ['"Manrope"', '"Noto Sans SC"', "sans-serif"],
        display: ['"Cormorant Garamond"', "serif"],
      },
      boxShadow: {
        panel: "0 24px 80px rgba(0, 0, 0, 0.32)",
      },
      backgroundImage: {
        grid: "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
