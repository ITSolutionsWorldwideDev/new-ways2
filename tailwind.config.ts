import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        heading: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
      fontSize: {
        // Custom sizes for responsive typography
        "2xl": ["1.5rem", "2rem"],     // 24px
        "3xl": ["1.875rem", "2.25rem"], // 30px
        "4xl": ["2rem", "2.5rem"],      // 32px
        "5xl": ["3rem", "1.2"],         // 48px
      },
      colors: {
        lemon: {
          DEFAULT: "#E8FC56",
        },
        "welcome-start": "#FFFFFF",
        "welcome-middle": "#F3F4F6",
        "welcome-end": "#D1D5DB",
        "financial-yellow": "#FFC107",
        "subtitle-gray": "#D1D5DB",
        "feature-text": "#D1D5DB",
        "heading-dark": "#171717",
        "security-border": "#BFDBFE",
        "security-bg-start": "#EFF6FF",
        "security-bg-end": "#EEF2FF",
        "onboarding-start": "#F59E0B",
        "onboarding-end": "#EAB308",
        "signin-start": "#546CF3",
        "signin-end": "#7D47ED",
        "card-bg": "#F7F9FF",
        "realtime-bg": "#EFF6FF",
        "expert-bg": "#FFFBEB",
        "continue-btn": "#FFC107",
        "continue-text": "#000000",
        "gray-550": "#4B5563",
        "gray-750": "#647082",
        "blue-650": "#1D4ED8",
        "dark-heading": "#111827",
        "dark-blue-border": "#2563EB",
        "light-green-350": "#DCFCE7",

        // Keep existing shadcn colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        "welcome-gradient":
          "linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 50%, #D1D5DB 100%)",
        "financial-gradient":
          "linear-gradient(135deg, #FFC107 0%, #FFC107 100%)",
        "security-gradient":
          "linear-gradient(135deg, #EFF6FF 0%, #EEF2FF 100%)",
        "onboarding-gradient":
          "linear-gradient(135deg, #F59E0B 0%, #EAB308 100%)",
        "signin-gradient": "linear-gradient(135deg, #546CF3 0%, #7D47ED 100%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
  "arrow-move": "arrow-move 0.3s ease-in-out",
  marquee: "marquee 18s linear infinite",
      },
      keyframes: {
        "arrow-move": {
          "0%": { transform: "translateX(0px)" },
          "100%": { transform: "translateX(4px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
