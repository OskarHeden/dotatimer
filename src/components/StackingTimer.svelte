<script lang="ts">
	import gameTimer from '../stores/gameTimer';
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

		return `${formatTime(minutesLeft)}:${formatTime(timeToStack ? 0 : secondsLeft)}`;
	};

	$: gameTime = $gameTimer.time;
	$: countdownTimer = getCountdown(gameTime);
</script>

<UITimer title="Stacking Timer">
	<p>{countdownTimer}</p>
	{#if timeToStack}
		<div class="timeToStack">TIME TO STACK</div>
	{/if}
</UITimer>

<style>
	.timeToStack {
		position: absolute;
		top: 0;
		right: 0;
	}
</style>
