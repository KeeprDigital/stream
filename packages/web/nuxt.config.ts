export default defineNuxtConfig({
	ssr: false,
	modules: [
		'@nuxt/eslint',
		'@nuxt/image',
		'@nuxt/test-utils/module',
		'@nuxt/ui',
		'@nuxtjs/supabase',
		'@pinia/nuxt',
		'@vueuse/nuxt',
	],
	eslint: {
		config: {
			standalone: false,
		},
	},
	nitro: {
		experimental: {
			websocket: true,
		},
	},
	css: ['~/assets/css/main.css'],
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
});
