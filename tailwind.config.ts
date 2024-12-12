import type { Config } from "tailwindcss"

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
      boxShadow: {
        border:
          "0 5px 15px 0 rgba(0,0,0,0.08), 0 15px 35px -5px rgba(25,28,33,0.2), 0 0 0 1px rgba(255,255,255,0.07)",
      },
    },
  },
  // Adding custom components
  plugins: [],
}
export default config
