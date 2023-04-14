<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import gameTimer from '../stores/gameTimer';
	import { clickOutside } from '../helpers/clickOutside';
	import '@fontsource/orbitron';

	let editingTime = false;
	let editingListener;
	let minutes: string;
	let seconds: string;

	const editTime = () => {
		if (!editingTime) {
			editingTime = true;
			minutes = `${Math.floor(time / 60)}`;
			seconds = `${time % 60}`;
		}
	};

	const closeEditTime = () => {
		editingTime = false;
	};

	const closeAndSave = () => {
		const secondsFromMinutes: number = parseInt(minutes) * 60;
		const totalSeconds = +(secondsFromMinutes + parseInt(seconds));
		gameTimer.setTimer(totalSeconds);
		closeEditTime();
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			const secondsFromMinutes: number = parseInt(minutes) * 60;
			const totalSeconds = +(secondsFromMinutes + parseInt(seconds));
			gameTimer.setTimer(totalSeconds);
			closeEditTime();
		} else if (event.key === 'Escape') {
			closeEditTime();
		}
	};

	onMount(() => {
		if (typeof window !== 'undefined') {
			editingListener = window.addEventListener('keydown', (event) => {
				if (event.key === 'Escape') {
					closeEditTime();
				}
			});
		}
	});
	onDestroy(() => {
		gameTimer.reset();
		if (typeof window !== 'undefined') {
			window.removeEventListener('keydown', editingListener);
		}
	});
	$: time = $gameTimer.time;
	$: formattedTime = gameTimer.formatTime($gameTimer.time);
</script>

<div class="gameTimerContainer" use:clickOutside={{ callback: closeAndSave, enabled: editingTime }}>
	<button class="adjustTime" on:click={gameTimer.incrementOneSecond}>+</button>
	<div class="gameTimer" class:editingTime on:click={editTime} on:keydown={handleKeyDown}>
		{#if editingTime}
			<div class="editTimeInputs">
				<input
					bind:value={minutes}
					pattern="[0-9]*"
					type="number"
					on:keydown={handleKeyDown}
					autofocus
				/>
				<input bind:value={seconds} pattern="[0-9]*" type="number" on:keydown={handleKeyDown} />
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
		position: absolute;
		top: 0px;
		left: 50%;
		transform: translate(-50%, 0);
	}
	.gameTimer {
		color: white;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 1.7rem;
		font-family: 'Orbitron', sans-serif;
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
		background-color: transparent;
		font-size: 3em;
		width: 20vw;
		max-width: 170px;
		color: white;
		border: none;
		outline: hidden;
		margin-left: 0rem;
		margin-right: 0rem;
	}
	button:active {
		color: black;
	}

	@media only screen and (max-width: 600px) {
		.adjustTime {
			margin-left: 2rem;
			margin-right: 2rem;
		}
	}
</style>
