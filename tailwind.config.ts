import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/standard/**/*.{js,ts,jsx,tsx,mdx}',
        './src/tenants/**/*.{js,ts,jsx,tsx,mdx}',
        './src/uikit/**/*.{js,ts,jsx,tsx,mdx}',
    ],
};

export default config;
