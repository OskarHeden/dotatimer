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
			const negativeTime = time < 0;
			if (negativeTime) {
				const negativeMinutes = time < -59;
				minutes = `${negativeMinutes ? '-' : ''}${Math.floor(Math.abs(time) / 60)}`;
				seconds = `${negativeMinutes ? '' : '-'}${Math.abs(time) % 60}`;
			} else {
				minutes = `${Math.floor(time / 60)}`;
				seconds = `${time % 60}`;
			}
		}
	};

	const closeEditTime = () => {
		editingTime = false;
	};

	const closeAndSave = () => {
		if (!minutes && !seconds) {
			return closeEditTime();
		}
		if (!minutes) {
			minutes = '0';
		} else if (!seconds) {
			seconds = '0';
		}
		const secondsFromMinutes: number = parseInt(minutes) * 60;
		const totalSeconds =
			secondsFromMinutes < 0
				? +(secondsFromMinutes - parseInt(seconds))
				: +(secondsFromMinutes + parseInt(seconds));
		gameTimer.setTimer(totalSeconds);
		closeEditTime();
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			closeAndSave();
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
	$: hasStarted = $gameTimer.hasStarted;

	$: formattedTime = gameTimer.formatTime($gameTimer.time);
</script>

<div
	class="gameTimerContainer"
	use:clickOutside={{ callback: closeAndSave, enabled: editingTime }}
	class:idle={!$gameTimer.isRunning}
>
	{#if !hasStarted}
		<img class="logo" src="/icons/512.png" alt="Logo" />
	{:else}
		<button class="adjustTime left" on:click={gameTimer.decrementOneSecond}>-</button>
		<div class="timer-div">
			{#if !editingTime}
				<button class="gameTimer" class:editingTime on:click|stopPropagation={editTime}>
					<span class="minutes">{formattedTime.minutes}</span>:<span class="seconds"
						>{formattedTime.seconds}</span
					>
				</button>
			{:else}
				<div class="editTimeInputs">
					<!-- svelte-ignore a11y-autofocus -->
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
		</div>
		<button class="adjustTime right" on:click={gameTimer.incrementOneSecond}>+</button>
	{/if}
</div>

<style>
	.gameTimerContainer {
		position: relative;
		display: flex;
		justify-content: space-between;
		color: white;
		width: 100%;
		z-index: var(--zIndexComponents);
	}
	.gameTimerContainer.idle {
		justify-content: center;
		align-items: center;
	}
	.gameTimer {
		flex: 1;
		color: white;
		text-align: center;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 1.75rem;
	}

	.logo {
		width: 80px;
		height: 80px;
		filter: drop-shadow(0px 0px 54px #853939);
		animation: pulse alternate 3s infinite;
	}

	.gameTimer span {
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
		width: 2.5rem;
		text-align: center;
		font-size: 1.5rem;
		background-color: #111;
		color: #fff;
		border: none;
		border-radius: 2px;
		margin: 0.25rem;
		padding: 0.25rem;
		-webkit-appearance: none;
		-moz-appearance: textfield;
	}

	/* Hide input arrows */
	.editTimeInputs input::-webkit-outer-spin-button,
	.editTimeInputs input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	input[type='number'] {
		-moz-appearance: textfield;
	}

	.timer-div {
		height: 70px;
		width: 130px;
		display: flex;
	}

	.adjustTime {
		height: 70px;
		width: 170px;
		font-size: 3rem;
		max-width: 170px;
		color: white;
		margin-left: 0rem;
		margin-right: 0rem;
	}

	.adjustTime.left {
		padding-left: 3rem;
		padding-bottom: 8px;
	}
	.adjustTime.right {
		padding-right: 3rem;
		padding-bottom: 4px;
	}
	button {
		background-color: transparent;
		border: none;
		outline: hidden;
	}
	button:active {
		color: black;
	}
	@keyframes pulse {
		from {
			filter: drop-shadow(0px 0px 54px #853939);
		}
		to {
			filter: drop-shadow(0px 0px 0px #853939);
		}
	}

	@media only screen and (max-width: 480px) {
		.gameTimer {
			font-size: 1.25rem;
		}
		.editTimeInputs input {
			width: 2.5rem;
			font-size: 1rem;
		}
		.adjustTime {
			font-size: 2.5rem;
		}

		.logo {
			width: 75px;
			height: 75px;
			filter: drop-shadow(0px 0px 54px #853939);
		}
	}

	@media only screen and (max-width: 400px) {
		.adjustTime {
			font-size: 2rem;
		}
		.adjustTime.left {
			padding-left: 2.5rem;
			padding-bottom: 16px;
		}
		.adjustTime.right {
			padding-right: 2rem;
			padding-bottom: 12px;
		}
		.timer-div button {
			padding-bottom: 12px;
		}
	}
</style>
