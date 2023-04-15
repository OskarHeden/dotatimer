<script>
	import './global.css';
	import GameTimer from '../components/GameTimer.svelte';
	import RoshanTimer from '../components/RoshanTimer.svelte';
	import CountdownTimer from '../components/CountdownTimer.svelte';
	import gameTimer from '../stores/gameTimer';
	import Menu from '../components/Menu.svelte';
	import { enableAudio } from '../helpers/sound';
	import { onDestroy, onMount } from 'svelte';

	onMount(() => {
		if (typeof document !== 'undefined') {
			const AudioContext = window.AudioContext || window.webkitAudioContext;
			const audioContext = new AudioContext();

			enableAudio(audioContext);
		}
	});

	let started = false;
	const startTimer = () => {
		started = true;
		gameTimer.start();
	};
</script>

<Menu />
<div class="header">
	<img src="clockUI.png" alt="timer" />
	<GameTimer />
</div>

{#if started}
	<div class="componentGrid">
		<CountdownTimer
			title="Power Rune Timer"
			audioSrc="./sound/Joey/powerRuneSpawn.mp3"
			spawnMultiplier={2}
			iconSrc={'powerRune.webp'}
			skipFirst
		/>
		<CountdownTimer
			title="Bounty Rune Timer"
			audioSrc="./sound/Joey/bountyRuneSpawn.mp3"
			iconSrc={'Bountyrune.png'}
			spawnMultiplier={3}
		/>
		<div class="roshanContainer">
			<RoshanTimer />
		</div>
		<CountdownTimer
			title="Stacking Timer"
			audioSrc="./sound/Joey/timeToStack.mp3"
			spawnMultiplier={1}
			skipFirst
			iconSrc="Centaurcreep.webp"
		/>
		<CountdownTimer
			title="Catapult Wave"
			audioSrc="./sound/Joey/catapultWave.mp3"
			spawnMultiplier={5}
			iconSrc={'Catapult.webp'}
		/>
	</div>
{:else}
	<div class="notStarted">
		<button on:click={startTimer}>START TIMERS</button>
	</div>
{/if}

<style>
	.header {
		position: fixed;
		top: 0px;
		left: 50%;
		transform: translate(-50%, 0);
	}
	img {
		max-width: 100vw;
	}
	.componentGrid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin: 20vh 10vw 0;
		justify-content: center;
		text-align: center;
		grid-gap: 10px;
	}
	.roshanContainer {
		grid-row: 2;
		grid-column: 1/3;
		width: 100%;
	}
	.notStarted {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 15vh;
	}
</style>
