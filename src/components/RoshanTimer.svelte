<script lang="ts">
	import { playSoundEffect } from '../helpers/sound';
	import { gameTimer } from '../stores/gameTimer';
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
	let flash = false;

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
		flash = MAX_SPAWN_TIME - elapsedTime < 16 && MAX_SPAWN_TIME - elapsedTime > 0;

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

<!-- <UITimer title="Roshan Timer" {subtitle} flash={flash} onToggle={startCountDown}> -->
<button class="timerContainer" class:flash on:click={startCountDown}>
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

	<slot />
	<span class="title" class:flash>Roshan Timer</span>
	{#if subtitle}
		<span class="subtitle" class:flash>{subtitle}</span>
	{/if}
</button>

<style>
	.startingTime {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		flex-direction: column;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
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
	.timerContainer {
		background: rgb(133, 133, 133);
		background: linear-gradient(
			324deg,
			rgba(133, 133, 133, 1) 0%,
			rgba(71, 71, 71, 1) 34%,
			rgba(110, 111, 110, 1) 100%
		);
		box-shadow: 5px 5px 5px black;
		border-radius: 5px;
		position: relative;
		overflow: hidden;
		width: 100%;
		height: 100%;
		min-height: 25svh;
		cursor: pointer;
		border: none;
		color: black;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;
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

	@media only screen and (max-width: 600px) {
		.roshanPic {
			top: unset;
			bottom: 0%;
			right: 0%;
			max-width: 100px;
		}
	}
</style>
