import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep indigo — primary interactive color (buttons, links, active states).
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        // Warm coral — used sparingly for primary hero CTAs and key highlights.
        accent: {
          50: "#fff1ee",
          100: "#ffe1da",
          200: "#ffc4b6",
          300: "#ff9d85",
          400: "#ff7a57",
          500: "#fa5a2e",
          600: "#e0431a",
          700: "#b93414",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
