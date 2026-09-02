import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Muted sage green — the single interactive color, used for both
        // links and primary CTAs (Warm Trust direction deliberately does
        // not split these into two brand colors).
        brand: {
          50: "#F1F5F0",
          100: "#DFE8DC",
          200: "#C1D3BC",
          300: "#9DB897",
          400: "#729B6B",
          500: "#527A4C",
          600: "#3F5D46",
          700: "#2E4735",
          800: "#253A2B",
          900: "#1D2E22",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
