/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      "4xl": "36px",
      "3xl": "30px",
      "2xl": "24px",
      xl: "20px",
      base: "18px",
      sm: "16px",
      "xs": "14px",
      "2xs": "12px",
    },
    extend: {
      colors: {
        "editor": "#1e1e1e",
        "primary": "#374151"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "space-float": {
          '0%, 100%': {
            transform: "translate(0, 0) rotate(0deg)",
          },
          '25%': {
            transform: "translate(60%, 60%) rotate(20deg)",
          },
          '50%': {
            transform: "translate(40%, 50%) rotate(0deg)",
          },
          '75%': {
            transform: "translate(20%, 90%) rotate(-20deg)",
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "space-float": "space-float 20s infinite ease-in-out"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}