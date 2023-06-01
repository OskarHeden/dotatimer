<script lang="ts">
	import { onMount } from 'svelte';
	import { gameTimer } from '../stores/gameTimer';
	import { modalOpen } from '../stores/resetModal';

	export let onStartTimer = () => {};

	let startMinutes: string = '-01';
	let startSeconds: string = '00';

	const handleOnChange = () => {
		const minutesInSeconds = +startMinutes * 60;
		const totalSeconds =
			minutesInSeconds < 0 ? minutesInSeconds - +startSeconds : minutesInSeconds + +startSeconds;
		if (typeof minutesInSeconds === 'number' && typeof totalSeconds === 'number') {
			$gameTimer.initialTime = totalSeconds;
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			resetGame();
		}
	};

	onMount(() => {
		gameTimer.pause();
		handleOnChange();
	});

	const resetGame = () => {
		onStartTimer();
		modalOpen.set(false);
	};
</script>

<div class="reset-modal">
	<h2>Ready to start another game?</h2>
	<span class="subHeading">Set the desired starting game time:</span>
	<div class="timeInput">
		<input
			type="text"
			bind:value={startMinutes}
			on:input={handleOnChange}
			on:keydown={handleKeyDown}
			placeholder="-1"
		/>
		<span class="semiColon">:</span>
		<input
			type="text"
			bind:value={startSeconds}
			on:input={handleOnChange}
			on:keydown={handleKeyDown}
			placeholder="00"
		/>
		<div>
			<button on:click={resetGame}>Start timers</button>
		</div>
	</div>
</div>

<style>
	.reset-modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: var(--zIndexModal);

		margin: 0 auto;
		width: 70vw;
		padding: 2rem;
		border-radius: 12px;
		display: flex;
		flex-direction: column;

		align-items: center;
		text-align: center;
		background: rgba(0, 0, 0, 0.85);
		border: 2px solid #ffffff;
		color: #ffffff;
	}
	.subHeading {
		margin-top: 10px;
		font-weight: bold;
	}
	input {
		max-width: 75px;
		height: 40px;
		margin: 20px 0px 20px 0px;
		font-size: 1.5rem;
		text-align: center;
		background-color: black;
		color: white;
		border: 1px solid white;
		border-radius: 5px;
		font-family: 'Orbitron', sans-serif;
	}
	span {
		color: rgb(226, 218, 206);
	}
	.semiColon {
		font-size: 2rem;
	}
	button {
		border: none;
		font-size: 24px;
		padding: 0.5em 1em;
		color: #fff;
		border-radius: 4px;
		background-color: black;
		margin-top: 1rem;
		border: 2px solid rgb(226, 218, 206);
	}
	button:hover {
		box-shadow: 0px 0px 5px 2px #ff6046;
		border: 2px solid #ff6046;
	}

	@media only screen and (max-width: 400px) {
		h1 {
			font-size: 2rem;
		}
	}
</style>
