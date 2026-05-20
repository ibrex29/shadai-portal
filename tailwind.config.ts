/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Config } from "tailwindcss";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import rtl from "tailwindcss-rtl";
import flowbitePlugin from "flowbite/plugin";

const addVariablesForColors = ({ addBase, theme }: any) => {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
};

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#c9a14b",
        accent: "#8e6a25",
        secondaryAccent: "#18b63d",
      },
    },
  },
  plugins: [addVariablesForColors, rtl as any, flowbitePlugin],
} satisfies Config;
