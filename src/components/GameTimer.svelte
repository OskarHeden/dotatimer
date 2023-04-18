<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { gameTimer } from '../stores/gameTimer';
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

	{#if !editingTime}
		<button class="gameTimer" class:editingTime on:click|stopPropagation={editTime}>
			<span class="minutes">{formattedTime.minutes.toString().padStart(2, '0')}</span>:<span class="seconds">{formattedTime.seconds.toString().padStart(2, '0')}</span>
		</button>
	{:else}
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
	{/if}
	<button class="adjustTime" on:click={gameTimer.decrementOneSecond}>-</button>
</div>

<style>
	.gameTimerContainer {
        position: relative;
        display: flex;
        justify-content: space-between;
		color: white;;
		width: 100%;
        z-index: 10;
	}
	.gameTimer {
        flex: 1;
		color: white;
		text-align: center;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 1.75rem;
		font-family: 'Orbitron', sans-serif;
	}
    .minutes,
    .seconds {
        flex: 1;
    }
    .minutes {
        text-align: right;
    }
    .seconds {
        text-align: left;
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
		font-size: 1.5rem;
		background-color: #111;
		color: #fff;
		border: none;
		margin: 0.25rem;
		padding: 0.25rem;
	}

	.adjustTime {
		font-size: 3rem;
		width: 20vw;
		max-width: 170px;
		color: white;
		margin-left: 0rem;
		margin-right: 0rem;
	}
	button {
		background-color: transparent;
		border: none;
		outline: hidden;
	}
	button:active {
		color: black;
	}

	@media only screen and (max-width: 600px) {
        .gameTimer {
            font-size: 1.25rem;
        }
		.editTimeInputs input {
			width: 2.5rem;
			font-size: 1rem;
		}
		.adjustTime {
            font-size: 2rem;
        }
        .adjustTime:first-of-type {
            padding-left: 3rem;
        }
        .adjustTime:last-of-type {
            padding-right: 3rem;
        }
	}
</style>
