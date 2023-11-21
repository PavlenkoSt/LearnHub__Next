import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "var(--primary-bg)",
        secondary: "var(--secondary-bg)",
        "selected-dark": "var(--selected-dark-bg)",
        "selected-light": "var(--selected-light-bg)",
      },
      textColor: {
        primary: "var(--primary-text-color)",
        secondary: "var(--secondary-text-color)",
        active: "var(--primary-bg)",
      },
      borderColor: {
        primary: "var(--primary-bg)",
        "selected-dark": "var(--selected-dark-bg)",
        "selected-light": "var(--selected-light-bg)",
      },
      outlineColor: {
        "selected-dark": "var(--selected-dark-bg)",
        "selected-light": "var(--selected-light-bg)",
      },
    },
  },
  plugins: [],
};
export default config;
