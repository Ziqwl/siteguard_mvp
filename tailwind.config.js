
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css,scss}"
  ],
  theme: {
    extend: {
      colors: {
        border: 'rgb(228, 228, 231)', // You can adjust this to match your design system
      },
    },
  },
  plugins: []
};
