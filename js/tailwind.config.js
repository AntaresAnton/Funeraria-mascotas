tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#2C5F5D',
                secondary: '#F4F1EA',
                accent: '#D9A08B',
                dark: '#1a1a1a',
            },
            fontFamily: {
                serif: ['Playfair Display', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 10px 40px -10px rgba(44, 95, 93, 0.1)',
                'card': '0 0 20px rgba(0,0,0,0.03)',
            },
            backgroundImage: {
                'hero-pattern': "url('https://www.transparenttextures.com/patterns/cubes.png')",
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        }
    }
}