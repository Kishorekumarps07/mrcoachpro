/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ["var(--font-roboto)", "sans-serif"],
                body: ["var(--font-josefin)", "sans-serif"],
            },
            colors: {
                "accent-yellow": "#F9D949",
                "bg-primary": "#0E0E0E",
            },
            animation: {
                "slow-zoom": "slow-zoom 20s ease-out infinite alternate",
            },
            keyframes: {
                "slow-zoom": {
                    "0%": { transform: "scale(1)" },
                    "100%": { transform: "scale(1.1)" },
                },
            },
        },
    },
    plugins: [],
};
