/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/index.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
  extend: {
    colors: {
      primary: "#F97316",
      primaryDark: "#EA580C",
      background: "#F9FAFB",
      surface: "#FFFFFF",
      text: "#111827",
      muted: "#6B7280",
      border: "#E5E7EB",
    },
  },
},
  plugins: [],
}