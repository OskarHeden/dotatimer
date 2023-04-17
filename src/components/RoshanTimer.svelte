<script lang="ts">
	import { playSoundEffect } from '../helpers/sound';
	import gameTimer from '../stores/gameTimer';
	import UITimer from './UITimer.svelte';
	import '@fontsource/orbitron';

	let startingTime: number | undefined;
	let startingTimeString: string;
	let elapsedTime: number | undefined;
	let interval: NodeJS.Timer;

	const MIN_SPAWN_TIME = 8 * 60;
	const MAX_SPAWN_TIME = 11 * 60;
	const AEGIS_RECLAIMED = 6 * 60;

	const reset = () => {
		clearInterval(interval);
		setTimeout(() => {
			elapsedTime = undefined;
			startingTime = undefined;
		}, 2000);
	};

	const startCountDown = () => {
		const time = $gameTimer.time;
		const gameTimeMinutes = Math.floor(time / 60);
		const gameTimeSeconds = time % 60;
		startingTime = time;
		startingTimeString = `${formatTime(gameTimeMinutes)}:${formatTime(gameTimeSeconds)}`;
		if (interval) {
			clearInterval(interval);
		}
		const startTime = $gameTimer.time;
		elapsedTime = startTime - startingTime;
		interval = setInterval(() => {
			const newTime = $gameTimer.time;
			elapsedTime = newTime - startingTime;
		}, 1000);
	};

	const REMINDERS = [60, 30, 15];

	const formatTime = (value: number) => value.toString().padStart(2, '0');
	let timeToFlash = false;

	const getCountdown = (elapsedTime: number) => {
		const time = MAX_SPAWN_TIME - elapsedTime;
		const gameTimeMinutes = Math.floor(time / 60);
		const gameTimeSeconds = time % 60;

		let aegisReclaimTimer = null;
		let potentialSpawnTimer = null;

		if (elapsedTime < AEGIS_RECLAIMED) {
			const aegisTimeRemaining = AEGIS_RECLAIMED - elapsedTime;
			const aegisReclaimedMinutes = Math.floor(aegisTimeRemaining / 60);
			const aegisReclaimedSeconds = aegisTimeRemaining % 60;
			aegisReclaimTimer = `${formatTime(aegisReclaimedMinutes)}:${formatTime(
				aegisReclaimedSeconds
			)}`;
		}
		if (elapsedTime < MIN_SPAWN_TIME) {
			const potentialSpawnRemaining = MIN_SPAWN_TIME - elapsedTime;
			const potentialSpawnMinutes = Math.floor(potentialSpawnRemaining / 60);
			const potentialSpawnSeconds = potentialSpawnRemaining % 60;
			potentialSpawnTimer = `${formatTime(potentialSpawnMinutes)}:${formatTime(
				potentialSpawnSeconds
			)}`;
		}
		timeToFlash = MAX_SPAWN_TIME - elapsedTime < 16 && MAX_SPAWN_TIME - elapsedTime > 0;

		if (elapsedTime === MAX_SPAWN_TIME) {
			playSoundEffect('./sound/Joey/roshanHasSpawned.mp3');
			reset();
		} else if (elapsedTime === AEGIS_RECLAIMED) {
			playSoundEffect('./sound/Joey/aegisReclaimed.mp3');
		} else if (elapsedTime === MIN_SPAWN_TIME) {
			playSoundEffect('./sound/Joey/roshanPotentialSpawn.mp3');
		}

		return {
			countdownTimer: `${formatTime(gameTimeMinutes)}:${formatTime(gameTimeSeconds)}`,
			aegisReclaimTimer,
			potentialSpawnTimer
		};
	};

	$: countDowns = getCountdown(elapsedTime);
	$: countdownTimer = countDowns.countdownTimer;
	$: aegisReclaimTimer = countDowns.aegisReclaimTimer;
	$: potentialSpawnTimer = countDowns.potentialSpawnTimer;

	$: subtitle = `Click to ${startingTime ? 'Restart' : 'Start'}`;
</script>

<UITimer title="Roshan Timer" {subtitle} flash={timeToFlash} onToggle={startCountDown}>
	{#if startingTime}
		<div class="startingTime">
			<span>Start time:</span>
			<span class="countDowns">{startingTimeString}</span>
		</div>
	{/if}
	<div class="content">
		{#if elapsedTime !== undefined}
			<p>Definitive spawn:</p>
			<p class="countDowns">{countdownTimer}</p>
		{/if}
		{#if potentialSpawnTimer}
			<p>Potential spawn:</p>
			<p class="countDowns">{potentialSpawnTimer}</p>
		{/if}
		{#if aegisReclaimTimer}
			<p>Aegis reclaimed in:</p>
			<p class="countDowns">{aegisReclaimTimer}</p>
		{/if}
	</div>
	<img class="roshanPic" src="../roshan.webp" alt="roshan" />
</UITimer>

<style>
	.startingTime {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 30vh;
		overflow: hidden;
	}
	button {
		max-width: 100px;
	}

	.countDowns {
		font-family: 'Orbitron', sans-serif;
		margin-top: 0px;
	}
	p {
		margin-bottom: 3px;
	}
	.roshanPic {
		position: absolute;
		top: 40px;
		right: 0%;
		max-width: 200px;
		filter: brightness(0);
		pointer-events: none;
	}

	@media only screen and (max-width: 600px) {
		.roshanPic {
			top: unset;
			bottom: 0%;
			right: 0%;
			max-width: 100px;
		}
	}
</style>
