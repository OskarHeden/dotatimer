<script lang="ts">
	import { dev } from '$app/environment';
	import { inject, track as vercelTrack } from '@vercel/analytics';
	inject({ mode: dev ? 'development' : 'production' });

	import './global.css';
	import { flip } from 'svelte/animate';
	import Header from '../components/Header.svelte';
	import RoshanTimer from '../components/RoshanTimer.svelte';
	import CountdownTimer from '../components/CountdownTimer.svelte';
	import { gameTimer } from '../stores/gameTimer';
	import { timerEngine, dynamicTimers } from '../stores/timerEngine';
	import Menu from '../components/Menu.svelte';
	import Mute from '../components/Mute.svelte';
	import { enableAudio } from '../helpers/sound';
	import { onMount } from 'svelte';
	import StartTimersModal from '../components/StartTimersModal.svelte';
	import { aegis, restoreTimers, roshan } from '../stores/timerConfig';

	import '@fontsource-variable/merriweather-sans';
	import DynamicTimer from '../components/DynamicTimer.svelte';

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
		vercelTrack('StartTimers');
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
			<div class="dynamic-timers">
				{#each $dynamicTimers as timer (timer.index)}
					<div animate:flip={{ duration: 300 }} class="timer dynamic">
						{#if timer.title === 'Roshan'}
							<RoshanTimer {timer} />
						{:else}
							<DynamicTimer {timer} />
						{/if}
					</div>
				{/each}
			</div>

			<div class="static-timers">
				{#each $timerEngine as timer (timer.index)}
					<div animate:flip={{ duration: 300 }} class="timer static">
						<CountdownTimer {timer} />
					</div>
				{/each}
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
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 1100px;
		grid-column-gap: 2rem;
		margin-right: 1rem;
		margin-left: 1rem;
	}
	.dynamic-timers,
	.static-timers {
		display: flex;
		flex-direction: column;
	}
	.timer {
		margin: 0.5em 0;
	}
</style>
