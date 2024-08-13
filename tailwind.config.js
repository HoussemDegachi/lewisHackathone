/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./app/**/*.{js,jsx}", "./src/**/*.{js,jsx}"],
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
    },
    extend: {
      colors: {
        editor: "#1e1e1e",
        //  Dark Purple for background
        Purple: "#2C003E",
        // Neon Green for texts
        green: "#39FF14",
        // Bright Pink for cursor
        pink: "#FF1493",
        // Electric Blue for keyboards after highlighting
        blue: "#00FFFF",
        //  Neon Yellow for strings
        yellow: "#FFFF00",
        //  Glowing Red for Errors/Warnings
        Red: "#FF4500",
        // Dim Gray for Comments
        gray: "#A9A9A9",
        // Electric Indigo for Line Highlights
        indigo: "#6F00FF",
        // Magenta  for Selection Background
        magenta: "#FF00FF",
        // Blood Red  for Insult Text
        insult: "#8B0000",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
