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
            transform: "translate(0, 0) rotate(360deg)",
          },
          '25%': {
            transform: "translateY(5%, 15%) rotate(360deg)",
          },
          '50%': {
            transform: "translateY(10%, 5%) rotate(360deg)",
          },
          '75%': {
            transform: "translateY(0%, 15%) rotate(360deg)",
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "space-float": "space-float 10s infinite ease-in-out"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}