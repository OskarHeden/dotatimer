<script>
	import './global.css';
	import Gametimer from '../components/Gametimer.svelte';
	import StackingTimer from '../components/StackingTimer.svelte';
</script>

<div class="header">
	<Gametimer />
</div>

<div class="componentGrid">
	<StackingTimer>hej</StackingTimer>
</div>

<style>
	.header {
		position: fixed;
		top: 0px;
		right: 0px;
		height: 8vh;
		width: 100%;
		background-color: black;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	h1 {
		color: white;
	}
	.componentGrid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin: 8vh 2rem 0;
		justify-content: center;
		text-align: center;
	}
</style>
