import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mgi: {
          pink: "#ff4d8d",
          purple: "#7c3aed",
          blue: "#3b82f6",
          lime: "#84cc16",
          yellow: "#fbbf24"
        }
      }
    }
  },
  plugins: []
}
export default config