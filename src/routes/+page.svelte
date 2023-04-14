<script>
	import './global.css';
	import Header from '../components/Header.svelte';
	import RoshanTimer from '../components/RoshanTimer.svelte';
	import CountdownTimer from '../components/CountdownTimer.svelte';
	import gameTimer from '../stores/gameTimer';
	import { enableAudio } from '../helpers/sound';

	$: if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
		console.log('mupp');
		// navigator.serviceWorker
		// 	.register('/service-worker.ts')
		// 	.then((registration) => {
		// 		console.log('Service Worker registered:', registration);

		// 		// Listen for updates from the service worker
		// 		registration.active?.addEventListener('message', (event) => {
		// 			if (event.data.action === 'updateAvailable') {
		// 				console.log('Update available! Refresh the page to get the latest version.');
		// 				// Notify the user or refresh the page to update the app
		// 			}
		// 		});

		// 		// Check for updates every minute (60,000 milliseconds)
		// 		setInterval(() => {
		// 			registration.active?.postMessage({ action: 'checkForUpdate' });
		// 		}, 60000);
		// 	})
		// 	.catch((error) => {
		// 		console.log('Service Worker registration failed:', error);
		// 	});
	}
	let started = false;
	const startTimer = () => {
		started = true;
		enableAudio();
		gameTimer.start();
	};
</script>

<Header />

<main>
	{#if started}
		<div class="componentGrid">
			<CountdownTimer
				title="Power Rune Timer"
				audioSrc="./sound/Joey/powerRuneSpawn.mp3"
				spawnMultiplier={2}
				iconSrc={'powerRune.webp'}
				skipFirst
			/>
			<CountdownTimer
				title="Bounty Rune Timer"
				audioSrc="./sound/Joey/bountyRuneSpawn.mp3"
				iconSrc={'Bountyrune.png'}
				spawnMultiplier={3}
			/>
			<div class="roshanContainer">
				<RoshanTimer />
			</div>
			<CountdownTimer
				title="Stacking Timer"
				audioSrc="./sound/Joey/timeToStack.mp3"
				spawnMultiplier={1}
				skipFirst
				iconSrc="Centaurcreep.webp"
			/>
			<CountdownTimer
				title="Catapult Wave"
				audioSrc="./sound/Joey/catapultWave.mp3"
				spawnMultiplier={5}
				iconSrc={'Catapult.webp'}
			/>
		</div>
	{:else}
		<button class="start" on:click={startTimer}>START TIMERS</button>
	{/if}
</main>

<style>
	main {
		height: calc(100vh - 7.5rem);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.componentGrid {
		flex: 1;
		display: grid;
		height: 100%;
		max-height: 60rem;
		grid-template-columns: 1fr 1fr;
		margin: 1rem 10vw 0;
		justify-content: center;
		text-align: center;
		grid-gap: 10px;
	}
	.roshanContainer {
		grid-row: 2;
		grid-column: 1/3;
		width: 100%;
	}
</style>
