/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f4f8", // Very light navy
          100: "#d9e2ec", // Light navy
          200: "#bcccdc", // Lighter navy
          300: "#9fb3c8", // Light navy
          400: "#829ab1", // Medium light navy
          500: "#648299", // Medium navy
          600: "#1D3557", // Base Navy Blue (main brand color)
          700: "#152a42", // Darker navy
          800: "#0f1f31", // Dark navy
          900: "#0d1b2a", // Very dark navy
        },
        accent: {
          orange: {
            50: "#fef7f0",
            100: "#feecdc",
            200: "#fcd9bd",
            300: "#fac49e",
            400: "#f7ae80",
            500: "#F4A261", // Base Orange
            600: "#ef8f3d",
            700: "#e67e22",
            800: "#d35400",
            900: "#a04000",
          },
          beige: {
            50: "#fdfbf7",
            100: "#faf6eb",
            200: "#f5ecd3",
            300: "#f0e1bb",
            400: "#ebd7a3",
            500: "#E9C46A", // Base Beige
            600: "#e5b84d",
            700: "#dfa730",
            800: "#c69314",
            900: "#8a6509",
          },
        },
        neutral: {
          50: "#F8F9FA", // Base White
          100: "#f1f3f4",
          200: "#e8eaed",
          300: "#dadce0",
          400: "#bdc1c6",
          500: "#9aa0a6",
          600: "#80868b",
          700: "#5f6368",
          800: "#3c4043",
          900: "#2F2F2F", // Base Charcoal
        },
        secondary: {
          50: "#f8f9fa",
          100: "#f1f3f4",
          200: "#e3e6ea",
          300: "#c7ccd1",
          400: "#9aa0a6",
          500: "#80868b",
          600: "#5f6368",
          700: "#3c4043",
          800: "#2F2F2F",
          900: "#1a1a1a",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
