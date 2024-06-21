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
                    light: "#4285F4",
                    DEFAULT: "#007BFF",
                    dark: "#005CBE",
                },
                secondary: {
                    light: "#F8F9FA",
                    DEFAULT: "#868E96",
                    dark: "#343A40",
                },
                accent: {
                    light: "#FFF3CD",
                    DEFAULT: "#FFC107",
                    dark: "#E0A800",
                },
            },
        },
    },
    plugins: [],
};

