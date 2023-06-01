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
	import Menu from '../components/Menu/Menu.svelte';
	import { enableAudio } from '../helpers/sound';
	import { onMount } from 'svelte';
	import StartTimersModal from '../components/StartTimersModal.svelte';
	import { aegis, restoreTimers, roshan } from '../stores/timerConfig';

	import '@fontsource-variable/merriweather-sans';
	import DynamicTimer from '../components/DynamicTimer.svelte';
	import ButtonBar from '../components/ButtonBar/ButtonBar.svelte';
	import { menuOpen } from '../stores/menu';
	import { modalOpen } from '../stores/resetModal';
	import ResetModal from '../components/ResetModal.svelte';

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

<Header />
<svelte:head>
	<title>Dotatimer - Dota 2 Event Tracker</title>
	<meta
		name="description"
		content="Dotatimer - The ultimate Dota 2 event tracking application. Keep tabs on events such as roshan, lotus, power runes, wisdom runes, bounty runes, stacking, catapult and much more."
	/>
	<meta
		name="keywords"
		content="dotatimer, Dota 2, Timer, Dotatimer, Roshan, Lotus, Power Runes, Wisdom Runes, Bounty Runes, Stacking, Catapult, Game Tracker, Event Tracker"
	/>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta property="og:title" content="Dotatimer - Dota 2 Event Tracker" />
	<meta
		property="og:description"
		content="Keep track of key Dota 2 events with Dotatimer. Roshan, lotus, power runes, wisdom runes, bounty runes, stacking, catapult and much more at your fingertips."
	/>
	<meta property="og:url" content="https://www.dotatimer.com" />
	<meta property="og:image" content="/logo.png" />
	<link rel="icon" href="/favicon.png" />
	<link rel="canonical" href="https://www.dotatimer.com" />
</svelte:head>

{#if $menuOpen}
	<Menu />
{/if}

{#if $modalOpen}
	<ResetModal onStartTimer={startTimer} />
{/if}

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
		<ButtonBar />
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

	@media (max-width: 468px) {
		.static-timers {
			overflow: scroll;
			max-height: 80svh;
		}
	}
</style>
