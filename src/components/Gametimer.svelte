<script lang="ts">
	import { onMount } from 'svelte';
	import gameTimer from '../stores/gameTimer';
	onMount(() => {
		gameTimer.start();
	});
	$: time = gameTimer.formatTime($gameTimer.time);
	$: console.log({ time, gameTimer });
</script>

<div class="gameTimerContainer">
	<button class="adjustTime" on:click={gameTimer.incrementOneSecond}>+</button>
	<div class="gameTimer">{time}</div>
	<button class="adjustTime" on:click={gameTimer.decrementOneSecond}>-</button>
</div>

<style>
	.gameTimerContainer {
		color: white;
		display: flex;
		flex-direction: row;
	}
	.gameTimer {
		width: 150px;
		height: 8vh;
		background-color: black;
		color: wheat;
		text-align: center;
		clip-path: polygon(0 0, 100% 0, 85% 100%, 15% 100%);
	}
	.adjustTime {
		background-color: rgb(83, 83, 83);
		font-size: 3em;
		width: 10vw;
		border: none;
		outline: hidden;
	}
</style>
