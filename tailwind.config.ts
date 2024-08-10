import { Config } from 'tailwind-merge'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
        // sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        'theme-primary': 'var(--theme-primary)',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // New color definitions
        text: {
          DEFAULT: 'var(--text)',
          accent: 'var(--text-accent)',
          dimmed: 'var(--text-dimmed)',
        },
        'border-hover': 'var(--border-hover)',
        'badge-border': 'var(--badge-border)',
        body: 'var(--body)',
        section: 'var(--section)',
        'active-state': 'var(--active-state)',
        'section-hover': 'var(--section-hover)',
        'card-hover': 'var(--card-hover)',
        pill: 'var(--pill)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      height: {
        'marketing-header': 'var(--marketing-header-height)',
      },
      margin: {
        'marketing-header': 'var(--marketing-header-height)',
      },
      padding: {
        'marketing-header': 'var(--marketing-header-height)',
      },
      keyframes: {
        grid: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
        'image-glow': {
          '0%': {
            opacity: '0',
            'animation-timing-function': 'cubic-bezier(0.74, 0.25, 0.76, 1)',
          },
          '10%': {
            opacity: '0.7',
            'animation-timing-function': 'cubic-bezier(0.12, 0.01, 0.08, 0.99)',
          },
          '100%': {
            opacity: '0.4',
          },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(-10px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'shimmer-btn': {
          from: {
            backgroundPosition: '0 0',
          },
          to: {
            backgroundPosition: '-200% 0',
          },
        },
        shimmer: {
          '0%, 90%, 100%': {
            'background-position': 'calc(-100% - var(--shimmer-width)) 0',
          },
          '30%, 60%': {
            'background-position': 'calc(100% + var(--shimmer-width)) 0',
          },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
      },
      animation: {
        'shimmer-btn': 'shimmer-btn 2s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        grid: 'grid 20s linear infinite',
        'image-glow': 'image-glow 4100ms 600ms ease-out forwards',
        'fade-in':
          'fade-in 1000ms var(--animation-delay, 0ms                                     ) ease forwards',
        'fade-up': 'fade-up 1000ms var(--animation-delay, 0ms) ease forwards',
        shimmer: 'shimmer 8s infinite',
        marquee: 'marquee var(--duration) infinite linear',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
      },
      // New custom properties
      transitionProperty: {
        custom: 'var(--transition-property)',
      },
      transitionTimingFunction: {
        custom: 'var(--cubic)',
      },
      transitionDuration: {
        custom: 'var(--duration)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

const cssVariables = `
:root {
  --theme-primary: #ff6c00;
  --text: #f3f3f3;
  --text-accent: #909090;
  --text-dimmed: #cccccc;
  --border-hover: #252525;
  --badge-border: var(--border-hover);
  --body: #040404;
  --section: #0c0c0c;
  --active-state: #1b1b1b;
  --section-hover: var(--section-state);
  --card: var(--section);
  --card-hover: #161616;
  --pill: var(--card-hover);
  --cubic: cubic-bezier(0.4, 0, 0.2, 1);
  --duration: 0.3s;
  --transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, -webkit-text-decoration-color;
}
`

export default config
