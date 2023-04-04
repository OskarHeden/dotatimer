<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import gameTimer from '../stores/gameTimer';

	let editingTime = false;
	let minutes: string;
	let seconds: string;

	const editTime = () => {
		if (!editingTime) {
			editingTime = true;
			minutes = `${Math.floor(time / 60)}`;
			seconds = `${time % 60}`;
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			const secondsFromMinutes: number = parseInt(minutes) * 60;
			const totalSeconds = +(secondsFromMinutes + parseInt(seconds));
			gameTimer.setTimer(totalSeconds);
			editingTime = false;
		} else if (event.key === 'Escape') {
			editingTime = false;
		}
	};

	onMount(() => {
		gameTimer.start();
	});
	onDestroy(() => {
		gameTimer.pause();
	});
	$: time = $gameTimer.time;
	$: formattedTime = gameTimer.formatTime($gameTimer.time);
</script>

<div class="gameTimerContainer">
	<button class="adjustTime" on:click={gameTimer.incrementOneSecond}>+</button>
	<div class="gameTimer" class:editingTime on:click={editTime} on:keydown={handleKeyDown}>
		{#if editingTime}
			<div class="editTimeInputs">
				<input bind:value={minutes} on:keydown={handleKeyDown} autofocus />
				<input bind:value={seconds} on:keydown={handleKeyDown} />
			</div>
		{:else}
			{formattedTime}
		{/if}
	</div>
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
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.editTimeInputs {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.editTimeInputs input {
		width: 2rem;
		text-align: center;
	}

	.adjustTime {
		background-color: rgb(83, 83, 83);
		font-size: 3em;
		width: 10vw;
		border: none;
		outline: hidden;
	}
</style>
