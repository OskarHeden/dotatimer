import { sveltekit } from '@sveltejs/kit/vite';
import { VitePWA } from 'vite-plugin-pwa';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		VitePWA({
			injectRegister: 'auto',
			manifest: {
				name: 'Dota timer PWA',
				short_name: 'DotaTimer',
				description: 'Step up your DotA game with our awesome timers!',
				theme_color: '#ffffff',
				icons: [
					{
						src: '/icons/192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/icons/512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: '/icons/512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},
			devOptions: {
				enabled: true
			}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;
