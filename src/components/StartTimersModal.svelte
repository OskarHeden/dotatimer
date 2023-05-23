<script lang="ts">
	import { onMount } from 'svelte';
	import { gameTimer } from '../stores/gameTimer';
	import { timerConfig, setTimerReminder, toggleTimer } from '../stores/timerConfig';
	import Slider from './Slider.svelte';

	export let onStartTimer = () => {};

	const handleOnChange = () => {
		const minutesInSeconds = +startMinutes * 60;
		const totalSeconds =
			minutesInSeconds < 0 ? minutesInSeconds - +startSeconds : minutesInSeconds + +startSeconds;
		if (typeof minutesInSeconds === 'number' && typeof totalSeconds === 'number') {
			$gameTimer.initialTime = totalSeconds;
		}
	};

	let startMinutes: string = '-01';
	let startSeconds: string = '00';

	onMount(() => {
		handleOnChange();
	});
</script>

<video autoplay="autoplay" loop>
	<source src="Roshan.mp4" type="video/mp4" />
</video>
<div class="start-timers-modal">
	<h1>Welcome to Dota Timer!</h1>
	<span
		>We help you fine-tune your senses to Bloodseeker levels!<br /> Dive into the Dota 2 universe
		with our game-changing timer tool that keeps you connected with every critical event,<br
		/>sharpening your gameplay and giving you the competitive edge.</span
	>
	<br />
	<span class="subHeading">Set the starting time of the timer:</span>
	<div class="timeInput">
		<input type="text" bind:value={startMinutes} on:input={handleOnChange} placeholder="-1" />
		<span class="semiColon">:</span>
		<input type="text" bind:value={startSeconds} on:input={handleOnChange} placeholder="00" />
	</div>
	<span>Tip: set the timer to -01:00 so you have time to fight for bountys</span>

	<span>Use the settings menu in the lower right corner to edit settings for the timers</span>
	<!-- <span>Please enter your desired start time:</span>
	<br />
	<div class="startingTimeInputs">
		<label for="minutes">Minutes</label>
		<label for="minutes">Seconds</label>
		<input type="number" pattern="[0-9]" bind:value={startMinutes} id="minutes" />
		<input type="number" pattern="[0-9]" bind:value={startSeconds} id="seconds" />
	</div> -->
	<!-- <div class="timers">
		{#each $timerConfig as timer, index}
			<div class="timer">
				<span>{timer.title}</span>
				<div style="display:flex;align-items:center;">
					<Slider onChange={() => toggleTimer(index)} disabled={false} checked={timer.enabled} />
				</div>
				<div class="reminder">
					<span style="margin-right:0.5em;">Reminder:</span>
					<input
						on:input={(evt) => setTimerReminder(parseInt(evt?.target?.value), index)}
						placeholder={timer.notifySecondsBefore.toString()}
					/>
				</div>
			</div>
		{/each}
	</div> -->
	<div>
		<span />
	</div>
	<button on:click={onStartTimer}>Start timers</button>
</div>

<style>
	video {
		position: fixed;
		right: 0;
		bottom: 0;
		min-width: 100%;
		min-height: 100%;
		z-index: -1;
	}
	.start-timers-modal {
		width: 70vw;
		padding: 1rem;
		border-radius: 12px;
		display: flex;
		flex-direction: column;

		align-items: center;
		text-align: center;
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
	}

	h1 {
		margin-top: 0;
		font-size: 3rem;
		color: rgb(226, 218, 206);
	}
	span {
		color: rgb(226, 218, 206);
	}
	.semiColon {
		font-size: 2rem;
	}
	.startingTimeInputs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-content: center;
		align-content: center;
	}
	.startingTimeInputs input {
		max-width: 20px;
		margin: 0 auto;
		text-align: center;
	}

	.startingTimeInputs label {
		margin: 0 0.5em;
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
	.timers {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin: 1rem 0;
	}
	.timer {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 10px;
		color: black;

		background: rgba(255, 255, 255, 0.2);
		border-radius: 16px;
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		border: 1px solid rgba(0, 0, 0, 0.3);
		border-radius: 5px;
		box-shadow: -5px -5px 9px rgba(0, 0, 0, 0.45), 5px 5px 9px rgba(94, 104, 121, 0.3);
	}
	.reminder {
		display: flex;
		align-items: center;
		margin: 0.5em 0;
	}
	.reminder input {
		width: 20px;
		text-align: center;
	}
</style>
