/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: "#4285F4", // Lighter blue, similar to Twitter's primary
                    DEFAULT: "#007BFF", // Standard blue, similar to Bootstrap's primary
                    dark: "#005CBE", // Darker blue
                },
                secondary: {
                    light: "#F8F9FA", // Light gray for backgrounds
                    DEFAULT: "#868E96", // Medium gray for text
                    dark: "#343A40", // Dark gray for accents
                },
                accent: {
                    light: "#F9F7F6", // Very light gray for highlights
                    DEFAULT: "#FFC107", // Orange for emphasis
                    dark: "#E0A800", // Darker orange
                },
            },
        },
    },
    plugins: [],
};

