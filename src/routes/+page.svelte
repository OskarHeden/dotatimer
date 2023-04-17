<script lang="ts">
	interface Window {
		AudioContext: typeof AudioContext;
		webkitAudioContext: typeof AudioContext;
	}

	import './global.css';
	import Header from '../components/Header.svelte';
	import RoshanTimer from '../components/RoshanTimer.svelte';
	import CountdownTimer from '../components/CountdownTimer.svelte';
	import gameTimer from '../stores/gameTimer';
	import Menu from '../components/Menu.svelte';
	import { enableAudio, unlockSounds } from '../helpers/sound';
	import { onMount } from 'svelte';

	onMount(() => {
		if (typeof window !== 'undefined') {
			const w: Window = window;
			const AudioContext = w.AudioContext || w.webkitAudioContext;
			const audioContext = new AudioContext();

			enableAudio(audioContext);
			unlockSounds();
		}
	});

	let started = false;
	const startTimer = () => {
		started = true;
		gameTimer.start();
	};
</script>

<Menu />
<Header />

<main>
	{#if started}
		<div class="componentGrid">
			<div class="big">
				<CountdownTimer
					title="Power Rune Timer"
					audioSrc="./sound/Joey/powerRuneSpawn.mp3"
					spawnMultiplier={2}
					iconSrc={'powerRune.webp'}
					skipFirst
				/>
			</div>
			<div class="big">
				<CountdownTimer
					title="Bounty Rune Timer"
					audioSrc="./sound/Joey/bountyRuneSpawn.mp3"
					iconSrc={'Bountyrune.png'}
					spawnMultiplier={3}
				/>
			</div>
			<div class="big">
				<CountdownTimer
					title="Bounty Rune Timer"
					audioSrc="./sound/Joey/bountyRuneSpawn.mp3"
					iconSrc={'Bountyrune.png'}
					spawnMultiplier={3}
				/>
			</div>
			<div class="roshanContainer">
				<RoshanTimer />
			</div>
			<div class="small">
				<CountdownTimer
					title="Stacking Timer"
					audioSrc="./sound/Joey/timeToStack.mp3"
					spawnMultiplier={1}
					skipFirst
					iconSrc="Centaurcreep.webp"
				/>
			</div>
			<div class="small">
				<CountdownTimer
					title="Catapult Wave"
					audioSrc="./sound/Joey/catapultWave.mp3"
					spawnMultiplier={5}
					iconSrc={'Catapult.webp'}
				/>
			</div>
			<div class="small">
				<CountdownTimer
					title="Catapult Wave"
					audioSrc="./sound/Joey/catapultWave.mp3"
					spawnMultiplier={5}
					iconSrc={'Catapult.webp'}
				/>
			</div>
			<div class="small">
				<CountdownTimer
					title="Catapult Wave"
					audioSrc="./sound/Joey/catapultWave.mp3"
					spawnMultiplier={5}
					iconSrc={'Catapult.webp'}
				/>
			</div>
		</div>
	{:else}
		<button class="start" on:click={startTimer}>START TIMERS</button>
	{/if}
</main>

<style>
	main {
		height: calc(100svh - 7.5rem);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.componentGrid {
		flex: 1;
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin: 1rem 10vw 0;
		justify-content: center;
		text-align: center;
		grid-gap: 10px;
	}
	.roshanContainer {
		grid-row: 4;
		grid-column: 1/3;
		width: 100%;
	}
	.small {
		max-height: 5rem;
	}
	.big {
		max-height: 5rem;
		grid-column: 1/3;
	}
</style>
