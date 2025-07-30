
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
        // Основные цвета
        primary: {
          DEFAULT: '#667eea',
          blue: '#667eea',
          purple: '#764ba2',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#764ba2',
          teal: '#5eead4',
          purple: '#a78bfa',
          foreground: '#ffffff',
        },
        // Системные цвета
        background: '#0f0f23',
        foreground: '#ffffff',
        card: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: 'rgba(255, 255, 255, 0.12)',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: 'rgba(255, 255, 255, 0.06)',
          foreground: '#a1a1aa',
        },
        border: 'rgba(255, 255, 255, 0.15)',
        // Glass morphism
        glass: {
          bg: 'rgba(255, 255, 255, 0.08)',
          border: 'rgba(255, 255, 255, 0.15)',
          mobile: 'rgba(255, 255, 255, 0.12)',
        },
        // Градиенты
        gradient: {
          primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          secondary: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)',
          dark: 'linear-gradient(135deg, #0f0f23 0%, #1e1b4b 100%)',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
      },
      spacing: {
        'touch-target': '48px',
        'mobile-padding': '1rem',
        'tablet-padding': '1.5rem',
        'desktop-padding': '2rem',
      },
    },
  },
  plugins: []
};
