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
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="feather feather-pause"
			><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg
		>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3" /></svg
		>
	{/if}
</button>

<style>
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		border: none;
	}
	.pause,
	.play {
		color: black;
	}

	.pause svg,
	.play svg {
		stroke: white;
		height: 30px;
		width: 30px;
	}
</style>
