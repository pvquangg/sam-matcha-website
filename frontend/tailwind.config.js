/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sam-matcha': '#7a9659', // Xanh lá matcha đặc trưng
        'sam-dark': '#2c2c2c',   // Xám đen tường nội thất
        'sam-cream': '#f9f9f6',  // Kem sáng làm nền chữ
        'sam-gold': '#e8b851',   // Vàng ấm của đèn
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}