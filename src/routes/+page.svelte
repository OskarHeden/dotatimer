<script>
	import './global.css';
	import StackingTimer from '../components/StackingTimer.svelte';
	import GameTimer from '../components/Gametimer.svelte';

	$: if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
		console.log('mupp');
		navigator.serviceWorker
			.register('/service-worker.ts')
			.then((registration) => {
				console.log('Service Worker registered:', registration);

				// Listen for updates from the service worker
				registration.active?.addEventListener('message', (event) => {
					if (event.data.action === 'updateAvailable') {
						console.log('Update available! Refresh the page to get the latest version.');
						// Notify the user or refresh the page to update the app
					}
				});

				// Check for updates every minute (60,000 milliseconds)
				setInterval(() => {
					registration.active?.postMessage({ action: 'checkForUpdate' });
				}, 60000);
			})
			.catch((error) => {
				console.log('Service Worker registration failed:', error);
			});
	}
</script>

<div class="header">
	<img src="clockUI.png" />
	<GameTimer />
</div>

<div class="componentGrid">
	<StackingTimer>hej</StackingTimer>
</div>

<style>
	.header {
		position: fixed;
		top: 0px;
		left: 50%;
		transform: translate(-50%, 0);
	}
	img {
		max-width: 100vw;
	}
	.componentGrid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin: 20vh 2rem 0;
		justify-content: center;
		text-align: center;
	}
</style>
