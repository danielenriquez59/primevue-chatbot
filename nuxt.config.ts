// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
        "primevue/resources/themes/lara-light-blue/theme.css",
        "primevue/resources/primevue.css"
    ],
	build: {
		transpile: ["primevue"],
	},
  app: {
    head: {
      script: [
        {src: "https://code.jquery.com/jquery-3.6.0.js"},
      ]
    },
  },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public:{
      OPENAI_APIKEY: process.env.OPENAI_APIKEY
    }
  },
})
