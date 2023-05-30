<script>
	import { gameTimer } from '../../stores/gameTimer';

	const pause = () => {
		gameTimer.pause();
	};
	const play = () => {
		gameTimer.play();
	};

	$: isRunning = $gameTimer.isRunning;
</script>

<button class="pause play" on:click={isRunning ? pause : play}>
	{#if isRunning}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			stroke="white"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="feather feather-pause-circle"
			><circle cx="12" cy="12" r="10" /><path d="M10 15V9M14 15V9" /></svg
		>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			stroke="white"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="feather feather-play-circle"
			><circle cx="12" cy="12" r="10" /><path d="m10 8 6 4-6 4V8z" /></svg
		>
	{/if}
</button>

<style>
	button {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.pause,
	.play {
		color: black;
	}

	.pause svg,
	.play svg {
		height: 30px;
		width: 30px;
	}
</style>
