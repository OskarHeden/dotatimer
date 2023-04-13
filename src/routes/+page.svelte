<script>
	import './global.css';
	import StackingTimer from '../components/StackingTimer.svelte';
	import GameTimer from '../components/Gametimer.svelte';
</script>

<div class="header">
	<img src="clockUI.png" />
	<GameTimer />
</div>

<div class="componentGrid">
	<StackingTimer>hej</StackingTimer>
</div>

<style>
	.header {
		position: fixed;
		top: 0px;
		left: 50%;
		transform: translate(-50%, 0);
	}
	.componentGrid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin: 20vh 2rem 0;
		justify-content: center;
		text-align: center;
	}
</style>
