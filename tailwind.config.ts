import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        boldness: "var(--boldness)",
        freedom: "var(--freedom)",
        "strategy-gold": "var(--strategy-gold)",
        "strategy-green": "var(--strategy-green)",
        "strategy-red": "var(--strategy-red)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
} satisfies Config;

export default config;
