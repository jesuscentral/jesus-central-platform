import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bold: "#161615",
        "bold-dark": "#0F0F0E",
        "brand-black": "#0B0B0B",
        "brand-orange": "#eb3700",
        cream: "#EFF3EB",
        "strategy-gold": "#C89657",
        "strategy-green": "#746e06",
        "strategy-red": "#eb3700",
        "strategy-charcoal": "#161615",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
} satisfies Config;

export default config;
