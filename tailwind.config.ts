/**
 * Hybetech Tailwind CSS Configuration
 *
 * Extends Tailwind with the Hybetech design system tokens.
 * Configured for Astro with TypeScript.
 */

import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],

  // Dark mode class-based for manual toggle
  darkMode: 'class',

  theme: {
    // Container configuration
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },

    extend: {
      // Colors - Hybetech palette
      colors: {
        // Primary - Deep Slate/Navy
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Accent - Electric Blue
        accent: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // Violet - Secondary accent
        violet: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        // Neutral - Warm tones
        neutral: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
        // CTA colors
        cta: {
          primary: '#14b8a6',
          'primary-hover': '#0d9488',
          'primary-active': '#0f766e',
          secondary: '#f97316',
          'secondary-hover': '#ea580c',
          'secondary-active': '#c2410c',
        },
        // Semantic colors
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        info: {
          50: '#ecfeff',
          100: '#cffafe',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
        },
      },

      // Typography
      fontFamily: {
        heading: ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
        body: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },

      fontSize: {
        // Extend with fluid typography
        'display': ['clamp(2.25rem, 5vw + 1rem, 4.5rem)', { lineHeight: '1.1' }],
        'h1': ['clamp(1.875rem, 3vw + 1rem, 3rem)', { lineHeight: '1.2' }],
        'h2': ['clamp(1.5rem, 2vw + 1rem, 2.25rem)', { lineHeight: '1.25' }],
        'h3': ['clamp(1.25rem, 1.5vw + 0.75rem, 1.875rem)', { lineHeight: '1.3' }],
        'body-lg': ['clamp(1rem, 0.5vw + 0.875rem, 1.25rem)', { lineHeight: '1.6' }],
      },

      // Spacing extensions
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      // Border radius
      borderRadius: {
        '4xl': '2rem',
      },

      // Box shadows with glow effects
      boxShadow: {
        'glow-accent': '0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2)',
        'glow-violet': '0 0 20px rgba(139, 92, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.2)',
        'glow-cta': '0 0 20px rgba(20, 184, 166, 0.4)',
      },

      // Background gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': `radial-gradient(at 40% 20%, rgba(59, 130, 246, 0.15) 0px, transparent 50%),
                          radial-gradient(at 80% 0%, rgba(139, 92, 246, 0.1) 0px, transparent 50%),
                          radial-gradient(at 0% 50%, rgba(20, 184, 166, 0.1) 0px, transparent 50%)`,
        'gradient-hero': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        'gradient-accent': 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },

      // Backdrop blur for glassmorphism
      backdropBlur: {
        xs: '2px',
      },

      // Transition timing
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },

      // Transition duration
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },

      // Animation keyframes
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-up': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },

      // Animations
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-up': 'fade-up 0.4s ease-out',
        'fade-down': 'fade-down 0.4s ease-out',
        'scale-up': 'scale-up 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },

      // Z-index scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },

      // Typography plugin configuration
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#e2e8f0',
            '--tw-prose-headings': '#f1f5f9',
            '--tw-prose-lead': '#cbd5e1',
            '--tw-prose-links': '#60a5fa',
            '--tw-prose-bold': '#f1f5f9',
            '--tw-prose-counters': '#94a3b8',
            '--tw-prose-bullets': '#64748b',
            '--tw-prose-hr': '#334155',
            '--tw-prose-quotes': '#f1f5f9',
            '--tw-prose-quote-borders': '#3b82f6',
            '--tw-prose-captions': '#94a3b8',
            '--tw-prose-code': '#f1f5f9',
            '--tw-prose-pre-code': '#e2e8f0',
            '--tw-prose-pre-bg': '#1e293b',
            '--tw-prose-th-borders': '#475569',
            '--tw-prose-td-borders': '#334155',
          },
        },
      },
    },
  },

  plugins: [
    // Typography plugin for prose content
    require('@tailwindcss/typography'),
    // Forms plugin for better form defaults
    require('@tailwindcss/forms'),
    // Aspect ratio plugin
    require('@tailwindcss/aspect-ratio'),
    // Container queries
    require('@tailwindcss/container-queries'),
  ],
};

export default config;
