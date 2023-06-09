<script lang="ts">
	import { config } from '../../stores/config';
	import {
		timerConfig,
		setTimerReminder,
		setSoundOption,
		soundOptions,
		toggleTimer
	} from '../../stores/timerConfig';

	const handleSoundRadio = (option: 'sfx' | 'voice', index: number) => {
		setSoundOption(option, index);
	};

	$: openTimers = $timerConfig.reduce((acc, val) => {
		if (val.enabled) {
			return [...acc, val.title];
		}
		return acc;
	}, [] as string[]);
</script>

<h2 class="menuHeading">Global settings</h2>
<div class="global-settings">
	<div class="setting">
		<h3>Sound</h3>
		<label class="switch">
			<input type="checkbox" bind:checked={$config.soundEnabled} />
			<span class="slider round" />
		</label>
	</div>
</div>
<h2 class="menuHeading">Timers</h2>
<div class="timers">
	{#each $timerConfig as timer, index}
		<div class="timer">
			<div class="info">
				<div style="display:flex;flex-direction:row;align-items:center;">
					{#if timer.icon}
						<img class="iconImage" src={timer.icon} alt="icon" />
					{/if}
					<h3>{timer.title}</h3>
				</div>
				<label class="switch">
					<input type="checkbox" bind:checked={timer.enabled} />
					<span class="slider round" />
				</label>
			</div>
			{#if openTimers.includes(timer.title)}
				<div class="divider" />
				<div class="options">
					<div class="option-container">
						<span>Sound</span>
						<label class="switch">
							<input type="checkbox" bind:checked={timer.soundEnabled} />
							<span class="slider round" />
						</label>
					</div>

					<div class="option-container">
						<span>Sound effect</span>
						<div class="sound-effect-options">
							{#each soundOptions as { id, label }}
								<div class="option">
									<label for={id}>{label}</label>
									<input
										type="radio"
										name="sound-{index}"
										checked={timer.preferredSound === id}
										{id}
										value={id}
										on:change={() => handleSoundRadio(id, index)}
									/>
								</div>
							{/each}
						</div>
					</div>

					<div class="option-container">
						<span>Reminder time</span>
						<input class="timerSetting" type="number" bind:value={timer.notifySecondsBefore} />
					</div>
				</div>
			{/if}
		</div>
	{/each}
	<div class="mobileFiller" />
</div>

<style>
	h2,
	h3 {
		color: white;
	}

	/* The switch - the box around the slider */
	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 34px;
	}

	/* Hide default HTML checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .slider {
		background-color: var(--red);
	}

	input:focus + .slider {
		box-shadow: 0 0 1px var(--red);
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(26px);
		-ms-transform: translateX(26px);
		transform: translateX(26px);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
	.timerSetting {
		max-width: 60px;
		height: 40px;
		font-size: 1.5rem;
		text-align: center;
		background-color: black;
		color: white;
		border: 1px solid white;
		border-radius: 5px;
		font-family: 'Orbitron', sans-serif;
	}

	.timerSetting::-webkit-outer-spin-button,
	.timerSetting::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	input[type='number'] {
		-moz-appearance: textfield;
	}

	.option-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		padding: 0 0.5rem;
	}
	.option-container span {
		text-align: center;
		font-size: 0.9em;
		padding-bottom: 0.5em;
	}

	.sound-effect-options {
		display: grid;
		grid-template-columns: repeat(2, 35px); /* CHANGED */
		align-items: center;
		justify-items: center;
		margin: auto;
		grid-gap: 20px; /* ADDED */
	}
	.option {
		display: flex;
		flex-direction: column;
		color: white;
		position: relative;
	}
	.sound-effect-options .option:after {
		/* ADDED */
		content: '';
		position: absolute;
		border-left: 1px solid white;
		right: -15px; /* adjust this */
		top: 0;
		height: 120%; /* adjust this */
	}

	.sound-effect-options .option:last-child:after {
		/* ADDED */
		display: none; /* Hide the divider for the last block */
	}

	.timers {
		display: flex;
		flex-direction: column;
	}

	.timer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		padding: 1rem;
		margin: 1rem 0;

		background: #1e1e1e;
		color: rgb(255, 255, 255);
		border: ridge 2px black;
		box-shadow: 5px 5px 5px black;
		border-radius: 5px;
		position: relative;
		overflow: hidden;
	}

	.timer .iconImage {
		height: 50px;
		width: 50px;
		margin-right: 1em;
	}
	.timer .info,
	.timer .options {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
		width: 100%;
	}
	.timer .info {
		align-items: center;
	}
	.divider {
		height: 0;
		width: 100%;
		border-top: 1px solid #3e3e3e;
		padding-top: 1em;
	}
	.mobileFiller {
		display: none;
	}
	@media (max-width: 600px) {
		.mobileFiller {
			display: block;
			height: 4rem;
			width: 100%;
		}
	}
</style>
