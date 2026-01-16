/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'urban-dark': '#1a1a1a',
                'urban-panel': '#242424',
                'urban-accent': '#3b82f6',
            },
        },
    },
    plugins: [],
}
