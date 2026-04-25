import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          0: "#000000",
          1: "#0A0A0C",
          2: "#141418",
        },
        fg: {
          0: "#FAFAFA",
          1: "#A1A1AA",
          2: "#52525B",
        },
        accent: {
          DEFAULT: "#BDEE63",
          glow: "rgba(189, 238, 99, 0.28)",
        },
        line: "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 80px 0 var(--accent-glow)",
        "glow-sm": "0 0 24px 0 var(--accent-glow)",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        marquee: "marquee 50s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
