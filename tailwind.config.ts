import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  // Adding custom components
  plugins: [
    plugin(function ({ addComponents, addUtilities }) {
      addUtilities({
        "._shadow-border": {
          boxShadow: "0 0 0 1px black",
        },
      })
      addComponents({
        "._fc": {
          display: "flex",
          flexDirection: "column",
        },

        "._base-button": {
          padding: "1rem 2rem",
          border: "1px solid black",
          fontWeight: "600",
        },
      })
    }),
  ],
}
export default config
