<script lang="ts">
	import { onMount } from 'svelte';
	import { playSoundEffect } from '../helpers/sound';
	import gameTimer from '../stores/gameTimer';

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
	let flash = false;

	const getCountdown = (time: number) => {
		const timeLeft = SPAWN_INTERVAL - (time % SPAWN_INTERVAL);
		const nextTimer =
			skipFirst && $gameTimer.time < SPAWN_INTERVAL ? timeLeft + SPAWN_INTERVAL : timeLeft;
		const reminderTime = nextTimer - REMINDER_SECONDS_BEFORE;
		flash = reminderTime < 1;
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

<!-- <UITimer {title} flash={flash} onToggle={toggleTimer} {enabled}>

</UITimer> -->
<button class="timerContainer" class:flash class:disabled={!enabled} on:click={toggleTimer}>
	<p class="countdown">{countdownTimer}</p>
	{#if iconSrc}
		<img class="iconImage" src={iconSrc} alt="icon" class:flash />
	{/if}
	<span class="title" class:flash>{title}</span>
</button>

<style>
	.countdown {
		font-family: 'Orbitron', sans-serif;
		font-size: 1.3rem;
	}

	.iconImage {
		max-width: 40px;
		filter: brightness(0);
		position: absolute;
		bottom: 50;
		right: 0px;
	}
	.iconImage.flash {
		animation: blink 3s infinite;
	}
	.timerContainer {
		background-color: grey;
		box-shadow: 5px 5px 5px black;
		border-radius: 5px;
		position: relative;
		overflow: hidden;
		width: 100%;
		height: 100%;
		cursor: pointer;
		border: none;
		color: black;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;
	}
	.disabled {
		opacity: 0.2;
	}

	.timerContainer.flash {
		animation: colorSwap 3s infinite;
	}
	.title {
		color: white;
	}
	.title.flash {
		animation: reverseColorSwap 3s infinite;
	}
	@keyframes colorSwap {
		from {
			background-color: white;
		}
		to {
			background-color: grey;
		}
	}
	@keyframes reverseColorSwap {
		from {
			color: grey;
		}
		to {
			color: white;
		}
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
