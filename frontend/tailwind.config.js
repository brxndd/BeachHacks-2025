// tailwind.config.js
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      
      // Add more paths if you have other directories
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/typography'), // Add the typography plugin
      // Add other plugins here if needed
    ],
  }