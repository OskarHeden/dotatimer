<script lang="ts">
	import './global.css';
	import { flip } from 'svelte/animate';
	import Header from '../components/Header.svelte';
	import RoshanTimer from '../components/RoshanTimer.svelte';
	import CountdownTimer from '../components/CountdownTimer.svelte';
	import { gameTimer } from '../stores/gameTimer';
	import { timerEngine } from '../stores/timerEngine';
	import Menu from '../components/Menu.svelte';
	import Mute from '../components/Mute.svelte';
	import { enableAudio } from '../helpers/sound';
	import { onMount } from 'svelte';
	import StartTimersModal from '../components/StartTimersModal.svelte';
	import { aegis, restoreTimers, roshan } from '../stores/timerConfig';

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

			// Restore localStorage timers
			// restoreTimers();
		}
	});

	let started = false;
	const startTimer = () => {
		started = true;
		roshan.reset();
		aegis.reset();
		$timerEngine.forEach((timer) => {
			timer.audio?.load();
			timer.audio?.pause();
		});
		gameTimer.start();
	};
</script>

{#if started}
	<Menu />
	<Mute />
{/if}
<Header />

<main>
	{#if started}
		<div class="componentGrid">
			{#each $timerEngine as timer (timer.index)}
				<div animate:flip={{ duration: 300 }} class="timer" class:big={timer.order < 2}>
					<CountdownTimer {timer} big={timer.order < 2} />
				</div>
			{/each}

			<div class="roshanContainer">
				<RoshanTimer />
			</div>
		</div>
	{:else}
		<StartTimersModal onStartTimer={startTimer} />
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
		max-width: 1200px;
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
