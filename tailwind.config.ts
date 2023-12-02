import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(15, 10, 40)",
        card: "#1F2132",
        almostWhite: "rgb(240, 240, 240)",
      },
    },
  },
  plugins: [],
} satisfies Config;
