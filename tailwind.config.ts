import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
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
        "selected-dark": "var(--selected-dark-bg)",
      },
      borderColor: {
        primary: "var(--primary-bg)",
        "selected-dark": "var(--selected-dark-bg)",
        "selected-light": "var(--selected-light-bg)",
        light: "var(--border-light-color)",
      },
      outlineColor: {
        "selected-dark": "var(--selected-dark-bg)",
        "selected-light": "var(--selected-light-bg)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
