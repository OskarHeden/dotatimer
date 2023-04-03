import adapter from '@sveltejs/adapter-static';
import { VitePWA } from 'vite-plugin-pwa';

export default {
	kit: {
		adapter: adapter(),
		target: '#svelte',
		vite: {
			plugins: [
				VitePWA({
					manifest: {
						// Add your app details here
						name: 'DotaTimer PWA',
						short_name: 'DotaTimerPWA',
						description: 'A Progressive Web App built with SvelteKit',
						theme_color: '#ffffff',
						background_color: '#ffffff',
						display: 'standalone',
						start_url: '/',
						icons: [
							// Add your icons here
						]
					},
					workbox: {
						// Workbox options
					}
				})
			]
		}
	}
};
