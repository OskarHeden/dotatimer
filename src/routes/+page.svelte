<script>
	import './global.css';
	import StackingTimer from '../components/StackingTimer.svelte';
	import GameTimer from '../components/Gametimer.svelte';
</script>

<div class="header">
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
		height: 8vh;
		width: 50vh;
		background-color: rgb(83, 83, 83);
		display: flex;
		align-items: center;
		justify-content: center;
		clip-path: polygon(0 0, 100% 0, 85% 100%, 15% 100%);
		box-shadow: 5px 5px 5px black;
	}
	.componentGrid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin: 8vh 2rem 0;
		justify-content: center;
		text-align: center;
	}
</style>
