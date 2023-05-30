<script lang="ts">
	import { clickOutside } from '../helpers/clickOutside';
	import { config } from '../stores/config';
	import {
		timerConfig,
		setTimerReminder,
		setSoundOption,
		soundOptions
	} from '../stores/timerConfig';

	let buttonRef: HTMLElement;
	let buttonIconRef: SVGSVGElement;

	let visible = false;
	const closeMenu = () => {
		visible = false;
	};

	const handleReminderInput = (evt: Event, index: number) => {
		setTimerReminder(parseInt(evt?.target?.value), index);
	};

	const handleSoundRadio = (option: 'sfx' | 'voice', index: number) => {
		setSoundOption(option, index);
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			closeMenu();
		}
	};
</script>

{#if visible}
	<div
		class="menuContainer"
		use:clickOutside={{
			enabled: visible,
			callback: closeMenu,
			exceptions: [buttonRef, buttonIconRef]
		}}
	>
		<div class="content">
			<div class="close" on:click={() => (visible = false)} on:keydown={handleKeyDown}>
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
					class="feather feather-x"
					><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg
				>
			</div>
			<h2 class="menuHeading">Timer settings</h2>
			<div class="menuItem">
				<h3>Sound</h3>
				<label class="switch">
					<input type="checkbox" bind:checked={$config.soundEnabled} />
					<span class="slider round" />
				</label>
			</div>
			<h2 class="menuHeading">Visable Timers</h2>
			<div class="menuItem">
				<h3>Name:</h3>
				<h3>Sound</h3>
				<h3>Reminder</h3>
			</div>

			{#each $timerConfig as timer, index}
				<div class="menuItem">
					<h3>{timer.title}</h3>
					<div class="sound-options">
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
					<input
						class="timerSetting"
						type="number"
						value={timer.notifySecondsBefore.toString()}
						on:input={(evt) => handleReminderInput(evt, index)}
					/>
				</div>
			{/each}
		</div>
	</div>
{/if}

<button on:keydown={handleKeyDown} bind:this={buttonRef} on:click={() => (visible = !visible)}>
	<svg
		bind:this={buttonIconRef}
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		><circle cx="12" cy="12" r="3" /><path
			d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
		/></svg
	>
</button>

<style>
	.close svg {
		position: absolute;
		stroke: white;
		top: 2%;
		left: 90%;
	}
	.menuContainer {
		width: 85vw;
		max-width: 800px;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		background-color: rgba(0, 0, 0, 0.904);
	}
	.content {
		display: grid;
		grid-template-columns: 100%;
		overflow: scroll;
	}

	h2 {
		color: white;
	}
	h3 {
		color: white;
		width: 120px;
		text-align: start;
	}
	.menuItem {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		align-items: center;
		justify-items: center;
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
		background-color: #f32121;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px #f32121;
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
		max-width: 3rem;
	}

	.sound-options {
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
	.sound-options .option:after {
		/* ADDED */
		content: '';
		position: absolute;
		border-left: 1px solid white;
		right: -15px; /* adjust this */
		top: 0;
		height: 120%; /* adjust this */
	}

	.sound-options .option:last-child:after {
		/* ADDED */
		display: none; /* Hide the divider for the last block */
	}
</style>
