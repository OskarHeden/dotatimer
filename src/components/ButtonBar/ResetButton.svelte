<script>
	import { gameTimer } from '../../stores/gameTimer';

	const reset = () => {
		gameTimer.reset();
		gameTimer.start();
	};
</script>

<button class="reset" on:click={reset}><img src="/icons/reset.svg" alt="reset" /></button>

<style>
	button {
		background-color: transparent;
		border: none;
		cursor: pointer;
	}
	.reset {
		color: white;
	}

	.reset img {
		height: 30px;
		width: 30px;
		fill: white;
	}
</style>
