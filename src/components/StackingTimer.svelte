<script lang="ts">
	import { playSoundEffect } from '../helpers/sound';
	import gameTimer from '../stores/gameTimer';
	import StackArrow from './icons/StackArrow.svelte';
	import UITimer from './UITimer.svelte';

	const STACKING_INTERVAL = 60;
	const MINUTE_DIVISIBLE = 1;
	const REMINDER_SECONDS_BEFORE = 15;

	const formatTime = (value: number) => value.toString().padStart(2, '0');
	let timeToStack = false;

	const getCountdown = (time: number) => {
		const gameTimeMinutes = Math.floor(time / 60);
		const gameTimeSeconds = time % 60;

		const skipMinute = time < 60 && MINUTE_DIVISIBLE === 1;

		const minutesLeft = skipMinute
			? (gameTimeMinutes % MINUTE_DIVISIBLE) + 1
			: gameTimeMinutes % MINUTE_DIVISIBLE;
		const secondsLeft = STACKING_INTERVAL - gameTimeSeconds - REMINDER_SECONDS_BEFORE;
		timeToStack = secondsLeft < 1;

		if (secondsLeft === 0) {
			playSoundEffect('./sound/Joey/timeToStack.mp3');
		}

		return `${formatTime(minutesLeft)}:${formatTime(timeToStack ? 0 : secondsLeft)}`;
	};

	$: gameTime = $gameTimer.time;
	$: countdownTimer = getCountdown(gameTime);
</script>

<UITimer title="Stacking Timer" flash={timeToStack}>
	<p class="countDowns">{countdownTimer}</p>
	{#if timeToStack}
		<div class="timeToStack">
			<div class="content">
				<span>STACK!</span>
				<div class="icon bounce">
					<StackArrow />
				</div>
			</div>
		</div>
	{/if}
	<img class="creepImg" src="Centaurcreep.webp" alt="creep" />
</UITimer>

<style>
	.timeToStack {
		position: absolute;
		top: 0;
		right: 0;
	}
	.timeToStack .content {
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

	.creepImg {
		max-width: 75px;
		filter: brightness(0);
		position: absolute;
		bottom: 0px;
		right: 0px;
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
