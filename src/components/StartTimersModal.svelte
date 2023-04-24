<script lang="ts">
	import { timerConfig, setTimerReminder, toggleTimer } from '../stores/timerConfig';
	import Slider from './Slider.svelte';

	export let onStartTimer = () => {};

	let startMinutes: number;
	let startSeconds: number;
</script>

<div class="start-timers-modal">
	<h1>Welcome to Dota Timer!</h1>
	<span>The home of Dota time</span>
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
		<span> Here you can chose which timers you want: </span>
		<div class="timers">
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
		</div>
	</div>
	<button on:click={onStartTimer}>Start timers</button>
</div>

<style>
	.start-timers-modal {
		width: 70vw;
		padding: 1rem;
		border-radius: 12px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		background: rgb(133, 133, 133);
		background: linear-gradient(
			135deg,
			rgba(133, 133, 133, 1) 7%,
			rgba(0, 0, 0, 1) 8%,
			rgba(106, 106, 106, 1) 8%,
			rgba(71, 71, 71, 1) 34%,
			rgba(76, 76, 76, 1) 35%,
			rgba(129, 129, 129, 1) 59%,
			rgba(0, 0, 0, 1) 60%,
			rgba(91, 91, 91, 1) 61%,
			rgba(78, 78, 78, 1) 75%,
			rgba(79, 79, 79, 1) 79%,
			rgba(110, 111, 110, 1) 100%
		);
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
		box-shadow: 0px 0px 5px 2px #ff6046;
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
