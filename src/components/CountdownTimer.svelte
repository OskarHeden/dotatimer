<script lang="ts">
	import type { Timer } from '../stores/timerEngine';
	import { timerConfig } from '../stores/timerConfig';

	export let timer: Timer;

	const toggleTimer = () => $timerConfig[timer.index].enabled = !timer.enabled;
</script>

<button class="timerContainer" class:flash={timer.flash} class:disabled={!timer.enabled} on:click={toggleTimer} style="--flash-color: {timer.flashColor}">
	<p class="countdown">{timer.remainingFormatted}</p>
	{#if timer.icon}
		<img class="iconImage" src={timer.icon} alt="icon" />
	{/if}
	<span class="title">{timer.title}</span>
</button>

<style>
	.countdown {
		font-family: 'Orbitron', sans-serif;
		font-size: 1.3rem;
	}

	.iconImage {
		max-width: 40px;
		filter: brightness(0);
		position: absolute;
		bottom: 50;
		right: 0px;
	}
	.flash .iconImage {
		animation: blink 0.5s ease alternate infinite;
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
		cursor: pointer;
		border: none;
		color: black;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;
	}
	.disabled {
		opacity: 0.2;
	}

	.timerContainer.flash {
		animation: colorSwap 0.5s ease alternate infinite;
	}
	.title {
		color: white;
	}
	.flash .title {
		animation: reverseColorSwap 3s infinite;
	}
	@keyframes colorSwap {
		from {
			background-color: white;
			box-shadow: inset 0 0 0px 0px var(--flash-color);
		}
		to {
			background-color: grey;
			box-shadow: inset 0 0 8px 2px var(--flash-color);
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
</style>
