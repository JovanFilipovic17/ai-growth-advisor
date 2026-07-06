import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
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
        surface: {
          panel: "rgba(15, 23, 42, 0.82)",
          raised: "rgba(30, 41, 59, 0.72)",
        },
        edge: {
          DEFAULT: "rgba(148, 163, 184, 0.16)",
          strong: "rgba(148, 163, 184, 0.28)",
        },
      },
      boxShadow: {
        panel:
          "0 20px 45px -24px rgba(2, 6, 23, 0.85), inset 0 1px 0 rgba(148, 163, 184, 0.07)",
        btn: "0 8px 20px -8px rgba(59, 130, 246, 0.55)",
      },
    },
  },
  plugins: [],
};

export default config;
