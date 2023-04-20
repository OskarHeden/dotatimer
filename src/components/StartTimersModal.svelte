<script lang="ts">
	import { timerConfig, setTimerReminder, toggleTimer } from '../stores/timerConfig';
	import Slider from './Slider.svelte';

	export let onStartTimer = () => {};

	let startMinutes: number;
	let startSeconds: number;
</script>

<div class="start-timers-modal">
	<h1>Welcome to Dota Timer!</h1>
	<span>{'<insert cool catch phrase here>'}</span>
	<br />
	<!-- <span>Please enter your desired start time:</span>
	<br />
	<div class="startingTimeInputs">
		<label for="minutes">Minutes</label>
		<label for="minutes">Seconds</label>
		<input type="number" pattern="[0-9]" bind:value={startMinutes} id="minutes" />
		<input type="number" pattern="[0-9]" bind:value={startSeconds} id="seconds" />
	</div> -->

	<div>
		<h3>Timers</h3>
		<span> Here you can chose which timers you want: </span>
		<div class="timers">
			{#each $timerConfig as timer, index}
				<div class="timer">
					<span>{timer.title}</span>
					<div style="display:flex;align-items:center;">
						<span style="margin-right:0.5em;">Enabled:</span>
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
		</div>
	</div>
	<button on:click={onStartTimer}>Start timers</button>
</div>

<style>
	.start-timers-modal {
		width: 70vw;
		height: 70vh;
		padding: 1rem;
		border-radius: 12px;
		background-color: white;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	h1 {
		margin-top: 0;
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
		background-color: #000;
		border-radius: 4px;
		box-shadow: 10px 5px 6px 2px #ff6046;
	}
	.timers {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin: 1rem 0;
	}
	.timer {
		display: flex;
		flex-direction: column;
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
