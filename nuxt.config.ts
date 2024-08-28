// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: "src/",
  ssr: false,
  appDir: 'src/app',
  serverDir: 'src/app/server',
  dir: {
    assets: 'app/assets',
    pages: 'pages',
    plugins: 'shared/plugins'
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/app/assets/scss/_colors.scss" as *; @use "~/app/assets/scss/_fontSizes.scss" as *; @use "~/app/assets/scss/_commonSizes.scss" as *;'
        }
      }
    }
  },
  css: ['~/app/assets/scss/main.scss'],
  modules: [
    '@pinia/nuxt'
  ],
  components: {
    dirs:[ '~/shared/ui' ]
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.API_BASE_URL
    }
  }
})
