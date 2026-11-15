/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        ink: "#05070b",
        navy: "#0b1f3b",
        "navy-soft": "#132f54",
        "navy-deep": "#04070d",
        lime: "#b8ff3b",
        "lime-deep": "#8fd400",
        paper: "#f3efe6",
        charcoal: "#1f2937",
        mist: "#b8c3cf",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(184,255,59,0.25), 0 20px 60px -30px rgba(184,255,59,0.35)",
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(ellipse at 70% 30%, rgba(184,255,59,0.12), transparent 45%)",
      },
    },
  },
  plugins: [],
};