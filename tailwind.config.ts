import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bold: "var(--boldness)",
        "bold-dark": "var(--bold-dark)",
        "brand-black": "var(--brand-black)",
        "brand-orange": "var(--brand-orange)",
        cream: "var(--cream)",
        "strategy-gold": "var(--strategy-gold)",
        "strategy-green": "var(--strategy-green)",
        "strategy-red": "var(--strategy-red)",
        "strategy-charcoal": "var(--strategy-charcoal)",
        freedom: "var(--freedom)",
        herstel: "var(--herstel)",
        toerusting: "var(--toerusting)",
        zending: "var(--zending)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
} satisfies Config;

export default config;
