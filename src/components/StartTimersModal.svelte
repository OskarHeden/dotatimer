<script lang="ts">
	import { onMount } from 'svelte';
	import { gameTimer } from '../stores/gameTimer';
	import '@fontsource/orbitron';

	export let onStartTimer = () => {};
	let disclaimerModal = false;
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

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			onStartTimer();
		}
	};

	onMount(() => {
		handleOnChange();
	});
</script>

<video autoplay muted loop playsinline>
	<track kind="captions" />
	<source src="Roshan.mp4" type="video/mp4" />
</video>
<div class="start-timers-modal">
	<h1>Welcome to Dota Timer!</h1>
	<span>We help you fine-tune your senses to Bloodseeker levels!</span>
	<br />
	<span class="subHeading">Set the current game time:</span>
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
	</div>
	<span class="tip">Tip:</span><span>
		Set the timer to -01:00 so you have time to fight for bountys</span
	>

	<div>
		<span />
	</div>
	<button on:click={onStartTimer}>Start timers</button>

	<div class="disclaimerContainer" on:click={() => (disclaimerModal = !disclaimerModal)}>
		<span class="disclaimer"
			>We do not encourage this tool to be used in any competitive nature <svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-info"
				><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line
					x1="12"
					y1="8"
					x2="12.01"
					y2="8"
				/></svg
			></span
		>
	</div>
	{#if disclaimerModal === true}
		<div class="disclaimerModalOpen" on:click={() => (disclaimerModal = !disclaimerModal)}>
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
			<span>
				This tool is meant to be a help to mostly, but not exclusively, newer and / or returning
				players. <br /> Over time, DotA has grown more complex in terms of macro gameplay and we
				feel like there might be people out there who could benefit - ourselves included.
				<br /> Along those lines, we do not encourage this tool to be used in any competitive nature,
				as we do value & respect the integrity of the Dota scene and the skill the players put into getting
				to their level of gameplay.
			</span>
		</div>
	{/if}
</div>

<style>
	.disclaimerModalOpen {
		max-width: 400px;
		min-width: 300px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, 0);
		background-color: black;
		padding: 20px;
		border-radius: 10px;
		border: solid 1px white;
	}
	.disclaimerModalOpen svg {
		position: absolute;
		right: 1px;
		top: 1px;
		stroke: white;
		cursor: pointer;
	}
	.disclaimer {
		color: #f7e47b;

		padding: 15px;
	}

	.disclaimerContainer {
		display: flex;
		align-items: center;
		background-color: #00000082;
		border-radius: 10px;
		padding: 10px;
		cursor: pointer;
	}
	.disclaimerContainer svg {
		width: 15px;
		height: 15px;
	}

	video {
		position: fixed;
		right: 0;
		bottom: 0;
		min-width: 100%;
		min-height: 100%;
		z-index: var(--zIndexBackground);
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
		font-family: 'Orbitron', sans-serif;
	}
	.tip {
		font-weight: bold;
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
	button {
		border: none;
		font-size: 24px;
		padding: 0.5em 1em;
		color: #fff;
		border-radius: 4px;
		background-color: black;
		margin-top: 1rem;
		border: 2px solid rgb(226, 218, 206);
		margin-bottom: 2rem;
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
