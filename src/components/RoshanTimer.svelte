<script lang="ts">
	import '@fontsource/orbitron';
	import { gameTimer } from '../stores/gameTimer';
	import type { DynamicTimer } from '../stores/timerEngine';
	import { roshan } from '../stores/timerConfig';

	export let timer: DynamicTimer;

	let editingTime: boolean;
	let minutes: string;
	let seconds: string;

	const editTime = () => {
		editingTime = true;
	};

	const closeEditTime = () => {
		editingTime = false;
	};

	const closeAndSave = () => {
		const secondsFromMinutes: number = parseInt(minutes) * 60;
		const totalSeconds =
			secondsFromMinutes < 0
				? +(secondsFromMinutes - parseInt(seconds))
				: +(secondsFromMinutes + parseInt(seconds));
		roshan.activate(totalSeconds);
		closeEditTime();
	};

	const startCountDown = () => {
		if (!$roshan.activated) {
			roshan.activate($gameTimer.time);
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			closeAndSave();
		} else if (event.key === 'Escape') {
			closeEditTime();
		}
	};

	$: subtitle = `Click to ${timer.activated ? 'Restart' : 'Start'}`;
	$: flash = timer.flash;

	$: if (timer.shouldReset) {
		roshan.reset();
	}
</script>

<button class="timerContainer" class:flash on:click={startCountDown}>
	{#if !timer.activated && timer.location}
		<div class="location">
			<span>Location:</span>
			<span class="pit">{timer.location}</span>
		</div>
	{/if}
	{#if timer.activated}
		<div class="startingTime">
			<div>
				<span>Start time:</span>
				{#if editingTime}
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
				{:else}
					<span class="countDowns">{timer.killTimeFormatted}</span>
				{/if}
			</div>
			{#if !editingTime}
				<button on:click={editTime}>EDIT TIME</button>
			{/if}
		</div>
	{/if}
	<div class="content">
		{#if timer.definiteRemainingFormatted}
			<div>
				<p>Definitive spawn:</p>
				<p class="countDowns">{timer.definiteRemainingFormatted}</p>
			</div>
		{/if}
		{#if timer.potentialRemainingFormatted}
			<div>
				<p>Potential spawn:</p>
				<p class="countDowns">{timer.potentialRemainingFormatted}</p>
			</div>
		{/if}
	</div>
	<img class="roshanPic" src="../roshan.webp" alt="roshan" />

	<slot />
	{#if !timer.activated}
		<span class="title" class:flash>Roshan Timer</span>
		<span class="subtitle" class:flash>{subtitle}</span>
	{/if}
</button>

<style>
	.startingTime {
		display: flex;
		flex-direction: row;
		font-size: 1.5em;
	}
	.startingTime > div {
		display: flex;
		flex-direction: column;
	}
	.content {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.content > div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		margin: 1em;
		font-size: 1.2em;
	}

	.countDowns {
		font-family: 'Orbitron', sans-serif;
		margin-top: 0px;
	}
	p {
		margin-bottom: 3px;
	}
	.roshanPic {
		position: absolute;
		top: 40px;
		right: 0%;
		max-width: 160px;
		filter: brightness(0);
		pointer-events: none;
	}
	.timerContainer {
		background: rgb(133, 133, 133);
		background: linear-gradient(
			324deg,
			rgba(133, 133, 133, 1) 0%,
			rgba(71, 71, 71, 1) 34%,
			rgba(110, 111, 110, 1) 100%
		);
		box-shadow: 5px 5px 5px black;
		border-radius: 5px;
		position: relative;
		overflow: hidden;
		width: 100%;
		height: 100%;
		min-height: 25svh;
		cursor: pointer;
		border: none;
		color: black;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.timerContainer.flash {
		animation: colorSwap 3s infinite;
	}
	.title {
		color: white;
	}
	.title.flash {
		animation: reverseColorSwap 3s infinite;
	}
	.flash .roshanPic {
		animation: blink 1s forwards;
	}
	@keyframes colorSwap {
		from {
			background-color: white;
		}
		to {
			background-color: grey;
		}
	}
	@keyframes reverseColorSwap {
		from {
			color: grey;
		}
		to {
			color: white;
		}
	}
	@keyframes blink {
		from {
			filter: brightness(0);
		}
		to {
			filter: brightness(1);
		}
	}

	@media only screen and (max-width: 600px) {
		.roshanPic {
			top: unset;
			bottom: 0%;
			right: 0%;
			max-width: 80px;
		}
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

	/* Hide input arrows */
	.editTimeInputs input::-webkit-outer-spin-button,
	.editTimeInputs input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	input[type='number'] {
		-moz-appearance: textfield;
	}

	.location {
		position: absolute;
		top: 1rem;
		left: 1rem;
		display: flex;
		flex-direction: column;
	}
	.location .pit {
		font-size: 1.6em;
	}
</style>
