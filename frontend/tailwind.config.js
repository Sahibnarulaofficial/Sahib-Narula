/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /*
         * All color tokens reference CSS variables defined in globals.css.
         * This means Tailwind classes like `bg-brand-base`, `text-content-primary`
         * will update automatically when the [data-theme] attribute changes — 
         * no hardcoded hex values here.
         */
        brand: {
          base:    'var(--color-base)',
          surface: 'var(--color-surface)',
          detail:  'var(--color-detail)',
        },
        content: {
          primary:   'var(--color-primary)',
          secondary: 'var(--color-secondary)',
        },
        accent: 'var(--color-accent)',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter:    ['Inter', 'sans-serif'],
        space:    ['"Space Grotesk"', 'sans-serif'],
        mono:     ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow':  'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
}
