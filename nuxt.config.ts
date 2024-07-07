// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ["~/assets/css/main.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: ["nuxt-icon"],
    runtimeConfig: {        
        privateRuntimeConfig: {
            apiKey: process.env.API_KEY,
        },
    },
    plugins: ["~/plugins/markdown.ts"],
});
