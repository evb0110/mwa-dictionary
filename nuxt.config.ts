// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxt/eslint', '@nuxt/ui', '@pinia/nuxt', '@vueuse/nuxt', '@nuxt/image'],

    devtools: { enabled: true },

    css: ['~/assets/css/main.css'],

    routeRules: {
        '/': { prerender: true },
        '/library/book/**': { ssr: false },
    },

    devServer: { port: 3600 },

    compatibilityDate: '2025-01-15',

    vite: { optimizeDeps: { include: ['pdfjs-dist'] } },

    eslint: {
        config: {
            stylistic: {
                commaDangle: 'always',
                braceStyle: '1tbs',
            },
        },
    },
})
