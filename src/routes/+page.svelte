<script lang="ts">
	import './global.css';
	import { flip } from 'svelte/animate';
	import Header from '../components/Header.svelte';
	import RoshanTimer from '../components/RoshanTimer.svelte';
	import CountdownTimer from '../components/CountdownTimer.svelte';
	import { gameTimer } from '../stores/gameTimer';
	import { timerEngine } from '../stores/timerEngine';
	import Menu from '../components/Menu.svelte';
	import { enableAudio } from '../helpers/sound';
	import { onMount } from 'svelte';

	interface Window {
		AudioContext: typeof AudioContext;
		webkitAudioContext: typeof AudioContext;
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			const w: Window = window;
			const AudioContext = w.AudioContext || w.webkitAudioContext;
			const audioContext = new AudioContext();

			enableAudio(audioContext);
		}
	});

	let started = false;
	const startTimer = () => {
		started = true;
		$timerEngine.forEach(timer => {
			timer.audio?.load();
			timer.audio?.pause();
		});
		gameTimer.start();
	};
</script>

<Menu />
<Header />

<main>
	{#if started}
		<div class="componentGrid">
			{#each $timerEngine as timer(timer.index)}
				<div animate:flip={{ duration: 300 }} class="timer" class:big={timer.order < 2}>
					<CountdownTimer {timer} />
				</div>
			{/each}

			<div class="roshanContainer">
				<RoshanTimer />
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
		grid-row: 3;
		grid-column: 1/3;
		width: 100%;
	}
	.timer {
		max-height: 5rem;
	}
	.timer.big {
		grid-column: 1/3;
	}
</style>
