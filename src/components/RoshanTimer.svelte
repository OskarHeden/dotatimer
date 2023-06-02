<script lang="ts">
	import '@fontsource/orbitron';
	import { gameTimer } from '../stores/gameTimer';
	import type { DynamicTimer } from '../stores/timerEngine';
	import { roshan } from '../stores/timerConfig';

	export let timer: DynamicTimer;

	let editingTime: boolean;
	let minutes: string;
	let seconds: string;

	$: time = $gameTimer.time;
	const editTime = () => {
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
		} else {
			// If the potentialSpawntime has been surpassed, allow a reset
			if (!timer.potentialRemainingFormatted) {
				roshan.activate($gameTimer.time);
			}
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

	$: showLocation =
		(!timer.activated || (timer.activated && !timer.potentialRemainingFormatted)) && timer.location;
</script>

<button class="timerContainer" class:flash on:click={startCountDown}>
	{#if showLocation}
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
					<button on:click={editTime} class="countDowns">
						{timer.killTimeFormatted}
						{#if !editingTime}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="feather feather-edit-2"
								><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg
							>
						{/if}
					</button>
				{/if}
			</div>
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
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.content > div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		margin: 0.5em;
		font-size: 1.2em;
	}

	.countDowns {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-family: 'Orbitron', sans-serif;
		font-size: 1.1em;
		color: white;
		background-color: transparent;
		border: none;
		margin-top: 0px;
		cursor: pointer;
	}

	.countDowns svg {
		margin-left: 0.5em;
		stroke: white;
		width: 20px;
		height: 20px;
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
		background: #1e1e1e;
		color: rgb(255, 255, 255);
		border: ridge 2px black;
		box-shadow: 5px 5px 5px black;
		border-radius: 5px;
		position: relative;
		overflow: hidden;
		width: 100%;
		height: 100%;
		min-height: 25svh;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.timerContainer.flash {
		animation: colorSwap 3s forwards;
	}
	.title {
		color: white;
	}
	.title.flash {
		animation: reverseColorSwap 3s forwards;
	}
	.flash .roshanPic {
		animation: blink 1s forwards;
	}
	@keyframes colorSwap {
		from {
			background-color: white;
		}
		to {
			background-color: #1e1e1e;
		}
	}
	@keyframes reverseColorSwap {
		from {
			color: #1e1e1e;
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
			max-width: 40px;
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
