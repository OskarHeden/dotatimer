<script lang="ts">
	import { clickOutside } from '../helpers/clickOutside';
	import { config } from '../stores/config';
	import { timerConfig, toggleTimerSound, setTimerReminder } from '../stores/timerConfig';
	import Slider from './Slider.svelte';
	import LockScroll from './utility/LockScroll.svelte';

	let buttonRef: HTMLElement;
	let buttonIconRef: SVGSVGElement;

	let visible = false;
	const closeMenu = () => {
		visible = false;
	};

	const handleSliderOnChange = (index: number) => {
		toggleTimerSound(index);
	};

	const handleOnInput = (evt: Event, index: number) => {
		setTimerReminder(parseInt(evt?.target?.value), index);
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			closeMenu();
		}
	};
</script>

{#if visible}
	<LockScroll>
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
						<Slider
							onChange={() => handleSliderOnChange(index)}
							checked={timer.soundEnabled}
							disabled={false}
						/>
						<input
							class="timerSetting"
							type="number"
							value={timer.notifySecondsBefore.toString()}
							on:input={(evt) => handleOnInput(evt, index)}
						/>
					</div>
				{/each}
			</div>
		</div>
	</LockScroll>
{/if}

<div
	class="container"
	on:click={() => (visible = !visible)}
	bind:this={buttonRef}
	on:keydown={handleKeyDown}
/>
<div class="iconContainer">
	<svg
		on:keydown={handleKeyDown}
		bind:this={buttonIconRef}
		on:click={() => (visible = !visible)}
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
</div>

<style>
	.close svg {
		position: absolute;
		stroke: white;
		top: 2%;
		left: 90%;
	}
	.iconContainer :hover {
		stroke: red;
	}
	.menuContainer {
		padding: 1rem;
		margin-bottom: 30px;
		width: 85vw;
		max-width: 600px;
		height: 100vh;
		position: absolute;
		top: 0%;
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
	.container {
		position: absolute;
		bottom: 0%;
		right: 0%;
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 0 0 75px 75px;
		border-color: transparent transparent #000000 transparent;
	}
	.iconContainer svg {
		position: absolute;
		stroke: white;
		bottom: 1%;
		right: 1%;
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
	@media only screen and (min-width: 800px) {
		.container {
			border-width: 0 0 100px 100px;
		}
		.iconContainer svg {
			position: absolute;
			stroke: white;
			bottom: 1%;
			right: 1%;
			width: 35px;
			height: 35px;
		}
	}
</style>
