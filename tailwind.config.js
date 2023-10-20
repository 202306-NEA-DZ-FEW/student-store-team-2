/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                bkg: "rgb(var(--color-bkg) / <alpha-value>)",
                content: "rgb(var(--color-content) / <alpha-value>)",
                accent: "rgb(var(--color-accent) / <alpha-value>)",
                accent2: "rgb(var(--color-accent2) / <alpha-value>)",
                border: "rgb(var( --color-border) / <alpha-value>)",
                titleContent: "rgb(var( --color-titleContent) / <alpha-value>)",
                secondaryGreen:
                    "rgb(var( --color-secondaryGreen) / <alpha-value>)",
                secondaryYellow:
                    "rgb(var( --color-secondaryYellow) / <alpha-value>)",
                secondaryBlue:
                    "rgb(var( --color-secondaryBlue) / <alpha-value>)",
                navbar: "rgb(var( --color-navbar) / <alpha-value>)",
            },
            fontFamily: {
                jost: ["var(--font-jost)"],
                lato: ["var(--font-lato)"],
                jua: ["var(--font-jua)"],
                poppins: ["var(--font-poppins)"],
            },
            letterSpacing: {
                title: "tracking-normal",
                navigation: "tracking-normal",
            },
            keyframes: {
                wiggle: {
                    "0%": { transform: "translate(700px,0)" },
                    "100%": { transform: "translate(0,0)" },
                },
            },
            animation: {
                wiggle: "wiggle 0.5s ease-in-out ",
            },
        },
    },
    plugins: [require("@tailwindcss/aspect-ratio")],
};
