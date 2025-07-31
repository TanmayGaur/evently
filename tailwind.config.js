/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#7C3AED", // Primary brand color
          pink: "#EC4899", // Accent for gradient
          dark: "#0F0F1A", // Background dark
          gray: "#A1A1AA", // Subtext/neutral
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        gradient: "gradient 6s ease infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "pulse-glow": {
          from: {
            "box-shadow": "0 0 20px rgba(124, 58, 237, 0.5)",
          },
          to: {
            "box-shadow": "0 0 30px rgba(236, 72, 153, 0.8)",
          },
        },
      },
    },
  },
};
