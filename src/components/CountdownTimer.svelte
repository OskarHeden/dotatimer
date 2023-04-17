<script lang="ts">
	import { onMount } from 'svelte';
	import { playSoundEffect } from '../helpers/sound';
	import gameTimer from '../stores/gameTimer';
	import UITimer from './UITimer.svelte';

	export let spawnMultiplier: number;
	export let title: string;
	export let iconSrc: string | undefined;
	export let audioSrc: string | undefined = undefined;
	export let skipFirst = false;

	let enabled = false;
	const toggleTimer = () => {
		enabled = !enabled;
	};

	const SPAWN_INTERVAL = 60 * spawnMultiplier;
	const REMINDER_SECONDS_BEFORE = 15;

	const formatTime = (value: number) => value.toString().padStart(2, '0');
	let timeToReact = false;

	const getCountdown = (time: number) => {
		const timeLeft = SPAWN_INTERVAL - (time % SPAWN_INTERVAL);
		const nextTimer =
			skipFirst && $gameTimer.time < SPAWN_INTERVAL ? timeLeft + SPAWN_INTERVAL : timeLeft;
		const reminderTime = nextTimer - REMINDER_SECONDS_BEFORE;
		timeToReact = reminderTime < 1;
		const minutesLeft = Math.floor(nextTimer / 60);
		const secondsLeft = nextTimer % 60;

		if (reminderTime === 0) {
			if (enabled && audio) {
				playSoundEffect(audio);
			}
		}

		return `${formatTime(minutesLeft)}:${formatTime(secondsLeft)}`;
	};

	let audio;
	onMount(() => {
		if (typeof window !== 'undefined') {
			audio = new Audio(audioSrc);
		}
	});

	$: gameTime = $gameTimer.time;
	$: countdownTimer = getCountdown(gameTime);
</script>

<UITimer {title} flash={timeToReact} onToggle={toggleTimer} {enabled}>
	<p class="countdown">{countdownTimer}</p>
	{#if iconSrc}
		<img class="iconImage" src={iconSrc} alt="icon" class:timeToReact />
	{/if}
</UITimer>

<style>
	.countdown {
		font-family: 'Orbitron', sans-serif;
	}

	.iconImage {
		max-width: 40px;
		filter: brightness(0);
		position: absolute;
		bottom: 50;
		right: 0px;
	}
	.iconImage.timeToReact {
		animation: blink 3s infinite;
	}

	@keyframes blink {
		from {
			filter: brightness(0);
		}
		to {
			filter: brightness(1);
		}
	}
</style>
