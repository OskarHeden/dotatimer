<script lang="ts">
	export let title: string;
	export let subtitle: string = '';
	export let flash: boolean;
	export let onToggle: () => void;
	export let enabled = true;

	const toggleTimer = () => {
		onToggle();
	};
</script>

<button class="timerContainer" class:flash class:disabled={!enabled} on:click={toggleTimer}>
	<span class="title" class:flash>{title}</span>
	{#if subtitle}
		<span class="subtitle" class:flash>{subtitle}</span>
	{/if}
	<slot />
</button>

<style>
	.timerContainer {
		background-color: grey;
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
		justify-content: center;
	}
	.disabled {
		opacity: 0.2;
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
</style>
