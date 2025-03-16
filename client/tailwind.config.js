/** @type {import('tailwindcss').Config} */

const { heroui } = require("@heroui/react");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    // "./node_modules/@heroui/theme/dist/components/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        vw: "100vw",
        "vw-1/2": "50vw",
        "vw-1/3": "33.33vw",
      },
      height: {
        vh: "100vh",
        "vh-1/2": "50vh",
        "vh-1/3": "33.33vh",
      },
    },
  },
  prettier: {
    tailwindConfig: {
      sortClasses: true,
      sortCategories: [
        "layout",
        "box",
        "typography",
        "background",
        "border",
        "effects",
        "interactivity",
      ],
    },
  },
  darkMode: "class",
  plugins: [require("tailwindcss-animated"), heroui()],
};
