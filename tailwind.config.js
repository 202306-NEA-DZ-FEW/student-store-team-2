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
            },
            fontFamily: {
                jost: ["Jost", "sans-serif"],
                lato: ["Lato", "sans-serif"],
                jua: ["Jua", "sans-serif"],
            },
            letterSpacing: {
                title: "tracking-normal",
                navigation: "tracking-normal",
            },
        },
    },
    plugins: [],
};
