<script lang="ts">
	import type { DynamicTimer } from '../stores/timerEngine';
	import { setLocalStorage, dynamicConfig } from '../stores/timerConfig';
	import { gameTimer } from '../stores/gameTimer';

	export let timer: DynamicTimer;
	export let big: boolean = false;

	export const toggleTimer = () => {
		if (!timer.remainingFormatted) {
			$dynamicConfig[timer.index].killTime = $gameTimer.time;
		} else {
			$dynamicConfig[timer.index].enabled = !timer.enabled;
		}
	};

	export const toggleTimerSound = () => {
		$dynamicConfig[timer.index].soundEnabled = !timer.soundEnabled;
		setLocalStorage();
	};
</script>

<button
	class="timerContainer"
	class:big
	class:flash={timer.flash}
	class:disabled={!timer.enabled}
	on:click={toggleTimer}
>
	{#if !timer.soundEnabled}
		<button class="soundDisabled" on:click|stopPropagation={toggleTimerSound}>
			<img src="/soundDisabled.svg" alt="sound-disabled-icon" />
		</button>
	{/if}
	{#if timer.remainingFormatted}
		<p class="countdown">{timer.remainingFormatted}</p>
	{/if}
	{#if timer.icon}
		<img class="iconImage" src={timer.icon} alt="icon" />
	{/if}
	<span class="title" class:ready={!timer.remainingFormatted}>{timer.title}</span>
	{#if !timer.remainingFormatted}
		<p>Click to start</p>
	{/if}
</button>

<style>
	.countdown {
		font-family: 'Orbitron', sans-serif;
		font-size: 1.3rem;
		margin-bottom: 3px;
	}

	.iconImage {
		max-height: 100%;
		filter: brightness(0);
		position: absolute;
		bottom: 50;
		right: 0px;
	}
	.flash .iconImage {
		animation: blink 1s forwards;
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
		flex-direction: column;
		align-items: center;
		justify-content: start;
	}
	.disabled {
		opacity: 0.2;
	}
	.big .countdown {
		font-size: 2.3rem;
		margin-bottom: 0px;
		margin-top: 10px;
	}
	.big .title {
		font-size: 1.2rem;
	}

	.timerContainer.flash {
		animation: colorSwap 3s infinite;
	}
	.title {
		color: #b1a6a6;
	}
	.title.ready {
		margin-top: 1em;
	}
	.flash .title {
		animation: reverseColorSwap 3s infinite;
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

	.soundDisabled {
		position: absolute;
		top: 0;
		left: 0;
		background: transparent;
		border: none;
	}
	.soundDisabled img {
		height: 20px;
		width: 20px;
	}

	@media (max-width: 468px) {
		.iconImage {
			max-height: 50%;
		}
	}
</style>
