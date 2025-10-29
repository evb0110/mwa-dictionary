// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxt/eslint', '@nuxt/ui', '@pinia/nuxt', '@vueuse/nuxt', '@nuxt/image'],

    devtools: { enabled: true },

    css: ['~/assets/css/main.css'],

    ui: {
        global: true,
        safelistColors: ['primary', 'neutral'],
    },

    app: {
        pageTransition: false,
        layoutTransition: false,
    },

    routeRules: {
        '/': { prerender: true },
        '/library/book/**': { ssr: false },
    },

    compatibilityDate: '2025-01-15',

    vite: { optimizeDeps: { include: ['pdfjs-dist'] } },

    eslint: {
        config: {
            stylistic: {
                commaDangle: 'never',
                braceStyle: '1tbs',
            },
        },
    },
})
