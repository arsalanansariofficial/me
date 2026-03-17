/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' }
    },
    extend: {
      fontFamily: { sans: 'Poppins, sans-serif' },
      fontSize: {
        'fs-1': 'var(--fs-1)',
        'fs-2': 'var(--fs-2)',
        'fs-3': 'var(--fs-3)',
        'fs-4': 'var(--fs-4)',
        'fs-5': 'var(--fs-5)',
        'fs-6': 'var(--fs-6)',
        'fs-7': 'var(--fs-7)',
        'fs-8': 'var(--fs-8)'
      },
      fontWeight: {
        'fw-300': 'var(--fw-300)',
        'fw-400': 'var(--fw-400)',
        'fw-500': 'var(--fw-500)',
        'fw-600': 'var(--fw-600)'
      },
      boxShadow: {
        'shadow-1': 'var(--shadow-1)',
        'shadow-2': 'var(--shadow-2)',
        'shadow-3': 'var(--shadow-3)',
        'shadow-4': 'var(--shadow-4)',
        'shadow-5': 'var(--shadow-5)',
        'shadow-6': 'var(--shadow-6)'
      },
      backgroundImage: {
        'bg-gradient-onyx': 'var(--bg-gradient-onyx)',
        'bg-gradient-jet': 'var(--bg-gradient-jet)',
        'bg-gradient-yellow-1': 'var(--bg-gradient-yellow-1)',
        'bg-gradient-yellow-2': 'var(--bg-gradient-yellow-2)',
        'border-gradient-onyx': 'var(--border-gradient-onyx)',
        'text-gradient-yellow': 'var(--text-gradient-yellow)'
      },
      colors: {
        jet: 'var(--jet)',
        onyx: 'var(--onyx)',
        'eerie-black-1': 'var(--eerie-black-1)',
        'eerie-black-2': 'var(--eerie-black-2)',
        'smoky-black': 'var(--smoky-black)',
        'white-1': 'var(--white-1)',
        'white-2': 'var(--white-2)',
        'orange-yellow-crayola': 'var(--orange-yellow-crayola)',
        'vegas-gold': 'var(--vegas-gold)',
        'light-gray': 'var(--light-gray)',
        'light-gray-70': 'var(--light-gray-70)',
        'bittersweet-shimmer': 'var(--bittersweet-shimmer)',

        ring: 'hsl(var(--ring))',
        input: 'hsl(var(--input))',
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          to: { height: '0' },
          from: { height: 'var(--radix-accordion-content-height)' }
        }
      },
      animation: {
        'accordion-up': 'accordion-up 0.2s ease-out',
        'accordion-down': 'accordion-down 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
