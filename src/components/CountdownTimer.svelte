<script lang="ts">
	import { playSoundEffect } from '../helpers/sound';
	import gameTimer from '../stores/gameTimer';
	import UITimer from './UITimer.svelte';

	export let spawnMultiplier: number;
	export let title: string;
	export let iconSrc: string;
	export let audioSrc: string;
	export let skipFirst = false;

	let enabled = true;
	const toggleTimer = () => {
		enabled = !enabled;
	};

	const SPAWN_INTERVAL = 60 * spawnMultiplier;
	const REMINDER_SECONDS_BEFORE = 15;

	const formatTime = (value: number) => value.toString().padStart(2, '0');
	let timeToReact = false;

	const getCountdown = (time: number) => {
		const timeLeft = SPAWN_INTERVAL - (time % SPAWN_INTERVAL) - REMINDER_SECONDS_BEFORE;
		const nextTimer =
			skipFirst && $gameTimer.time < SPAWN_INTERVAL ? timeLeft + SPAWN_INTERVAL : timeLeft;
		timeToReact = nextTimer < 1;
		const minutesLeft = timeToReact ? 0 : Math.floor(nextTimer / 60);
		const secondsLeft = timeToReact ? 0 : nextTimer % 60;

		if (nextTimer === 0) {
			if (enabled) {
				playSoundEffect(audioSrc);
			}
		}

		return `${formatTime(minutesLeft)}:${formatTime(secondsLeft)}`;
	};

	$: gameTime = $gameTimer.time;
	$: countdownTimer = getCountdown(gameTime);
</script>

<UITimer {title} flash={timeToReact} onToggle={toggleTimer} {enabled}>
	<p class="countDowns">{countdownTimer}</p>
	{#if timeToReact}
		<div class="timeToReact">
			<div class="content">
				<div class="icon bounce">
					<img src={iconSrc} width="100" height="100" alt="icon" />
				</div>
			</div>
		</div>
	{/if}
</UITimer>

<style>
	.timeToReact {
		position: absolute;
		top: 0;
		right: 0;
	}
	.timeToReact .content {
		position: relative;
		display: flex;
		margin: 1rem;
	}
	.icon {
		width: 20px;
		height: 20px;
	}

	.bounce {
		-moz-animation: bounce 3s infinite;
		-webkit-animation: bounce 3s infinite;
		animation: bounce 3s infinite;
	}
	.countDowns {
		font-family: 'Orbitron', sans-serif;
	}
	@-moz-keyframes bounce {
		0%,
		20%,
		50%,
		80%,
		100% {
			-moz-transform: translateY(0) rotate(80deg);
			transform: translateY(0) rotate(80deg);
		}
		40% {
			-moz-transform: translateY(-10px) rotate(80deg);
			transform: translateY(-10px) rotate(80deg);
		}
		60% {
			-moz-transform: translateY(-5px) rotate(80deg);
			transform: translateY(-5px) rotate(80deg);
		}
	}
	@-webkit-keyframes bounce {
		0%,
		20%,
		50%,
		80%,
		100% {
			-webkit-transform: translateY(0) rotate(80deg);
			transform: translateY(0) rotate(80deg);
		}
		40% {
			-webkit-transform: translateY(-10px) rotate(80deg);
			transform: translateY(-10px) rotate(80deg);
		}
		60% {
			-webkit-transform: translateY(-5px) rotate(80deg);
			transform: translateY(-5px) rotate(80deg);
		}
	}
	@keyframes bounce {
		0%,
		20%,
		50%,
		80%,
		100% {
			-moz-transform: translateY(0) rotate(80deg);
			-ms-transform: translateY(0) rotate(80deg);
			-webkit-transform: translateY(0) rotate(80deg);
			transform: translateY(0) rotate(80deg);
		}
		40% {
			-moz-transform: translateY(-10px) rotate(80deg);
			-ms-transform: translateY(-10px) rotate(80deg);
			-webkit-transform: translateY(-10px) rotate(80deg);
			transform: translateY(-10px) rotate(80deg);
		}
		60% {
			-moz-transform: translateY(-5px) rotate(80deg);
			-ms-transform: translateY(-5px) rotate(80deg);
			-webkit-transform: translateY(-5px) rotate(80deg);
			transform: translateY(-5px) rotate(80deg);
		}
	}
</style>
