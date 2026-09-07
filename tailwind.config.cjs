/** @type {import('tailwindcss').Config} */
module.exports = {
 content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
 theme: {
 extend: {
 colors: {
 soul: {
 purple: "#6e4bff",
 blue: "#3438c8",
 cyan: "#50c7ff",
 yellow: "#ffd86b",
 ink: "#161733",
 text: "#33364f",
 soft: "#f5f6ff",
 line: "#e5e7f5",
 danger: "#d93025",
 success: "#15803d",
 },
 },
 backgroundImage: {
 "soul-gradient": "linear-gradient(135deg, #6e4bff, #3438c8, #50c7ff)",
 },
 fontFamily: {
 sans: ["Inter", "system-ui", "sans-serif"],
 },
 boxShadow: {
 card: "0 12px 30px rgba(52, 56, 200, 0.13)",
 header: "0 8px 20px rgba(0, 0, 0, 0.15)",
 future: "0 20px 50px rgba(52, 56, 200, 0.18)",
 },
 },
 },
 plugins: [],
};