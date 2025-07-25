/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // white with opacity - Minimal borders
        input: "var(--color-input)", // gray-700 - Interactive surface color
        ring: "var(--color-ring)", // teal-400 - Mint accent for focus rings
        background: "var(--color-background)", // gray-950 - Deeper variant for page backgrounds
        foreground: "var(--color-foreground)", // gray-200 - High-contrast text
        primary: {
          DEFAULT: "var(--color-primary)", // teal-400 - Mint accent
          foreground: "var(--color-primary-foreground)", // gray-900 - Deep background
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // gray-700 - Interactive surface color
          foreground: "var(--color-secondary-foreground)", // gray-200 - High-contrast text
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // red-500 - Critical status indicator
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // gray-700 - Interactive surface color
          foreground: "var(--color-muted-foreground)", // gray-400 - Reduced emphasis text
        },
        accent: {
          DEFAULT: "var(--color-accent)", // teal-400 - Mint accent
          foreground: "var(--color-accent-foreground)", // gray-900 - Deep background
        },
        popover: {
          DEFAULT: "var(--color-popover)", // gray-800 - Panel background
          foreground: "var(--color-popover-foreground)", // gray-200 - High-contrast text
        },
        card: {
          DEFAULT: "var(--color-card)", // gray-800 - Panel background
          foreground: "var(--color-card-foreground)", // gray-200 - High-contrast text
        },
        success: {
          DEFAULT: "var(--color-success)", // emerald-500 - Status indicator for healthy systems
          foreground: "var(--color-success-foreground)", // white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // amber-500 - Alert color for degraded performance
          foreground: "var(--color-warning-foreground)", // white
        },
        error: {
          DEFAULT: "var(--color-error)", // red-500 - Critical status indicator
          foreground: "var(--color-error-foreground)", // white
        },
        surface: {
          DEFAULT: "var(--color-surface)", // gray-700 - Interactive surface color
          foreground: "var(--color-surface-foreground)", // gray-200 - High-contrast text
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 300ms ease-out",
        "slide-up": "slideUp 200ms ease-out",
        "chart-draw": "chartDraw 800ms cubic-bezier(0.4, 0, 0.2, 1)",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
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
        "fadeIn": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slideUp": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "chartDraw": {
          from: { 
            strokeDasharray: "1000",
            strokeDashoffset: "1000"
          },
          to: { 
            strokeDasharray: "1000",
            strokeDashoffset: "0"
          },
        },
      },
      transitionTimingFunction: {
        'ease-out-custom': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '800': '800ms',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '300': '300',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}