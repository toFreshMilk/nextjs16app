import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/core/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/standard/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/tenants/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/uikit/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [],
};
export default config;
