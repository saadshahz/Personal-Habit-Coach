/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#6366f1", // Indigo 500
                secondary: "#8b5cf6", // Violet 500
                accent: "#06b6d4", // Cyan 500
                background: "#0f172a", // Slate 900
                card: "rgba(255, 255, 255, 0.1)",

                // Custom gradient stops
                'purple-deep': '#7c3aed',
                'purple-bright': '#a78bfa',
                'blue-deep': '#3b82f6',
                'blue-bright': '#60a5fa',
                'cyan-bright': '#22d3ee',
                'pink-bright': '#f472b6',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            },
            boxShadow: {
                'glow-purple': '0 0 40px rgba(139, 92, 246, 0.3)',
                'glow-cyan': '0 0 40px rgba(6, 182, 212, 0.3)',
                'glow-blue': '0 0 40px rgba(59, 130, 246, 0.3)',
                'premium': '0 20px 60px -15px rgba(0, 0, 0, 0.3)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'gradient': 'gradient 8s ease infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                gradient: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
            },
            backgroundSize: {
                '200': '200% 200%',
            }
        },
    },
    plugins: [],
}
