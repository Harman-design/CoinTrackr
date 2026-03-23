/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["'Space Grotesk'", "monospace"],
        syne: ["'Outfit'", "sans-serif"],
      },
      colors: {
        bullish:  "#00f0ff", // Cyber Cyan
        bearish:  "#ff00aa", // Cyber Magenta 
        neutral:  "#aa00ff", // Hologram Purple
        hype:     "#0088ff", // Tech Blue
        accent:   "#00f0ff", 
        base:     "#050914", // Deep Navy Void
      },
      boxShadow: {
        glass: "0 4px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
        neon:  "0 0 24px rgba(0,240,255,0.35)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.5s ease forwards",
        "pulse-slow":  "pulse 3s ease-in-out infinite",
        "glow":        "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeInUp: {
          "0%":   { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        glow: {
          "0%":   { boxShadow: "0 0 8px rgba(0,240,255,0.3)"  },
          "100%": { boxShadow: "0 0 24px rgba(0,240,255,0.8)" },
        },
      },
    },
  },
  plugins: [],
}
