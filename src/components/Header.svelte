<script>
	import GameTimer from '../components/GameTimer.svelte';
</script>

<div class="header">
	<img src="Dota-UI.png" alt="timer" />
	<GameTimer />
</div>

<style>
	.header {
		position: relative;
		width: 100%;
		max-width: 460px;
		aspect-ratio: 484 / 96;
		margin: auto;
	}
	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
</style>
