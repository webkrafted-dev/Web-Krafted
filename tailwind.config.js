/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        navy: "#0B1F3B",
        "navy-soft": "#16385F",
        lime: "#B8FF3B",
        "lime-deep": "#79A81A",
        paper: "#F7F8FA",
        charcoal: "#1F2937",
        mist: "#DDE4EC",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};