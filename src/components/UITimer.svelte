<script lang="ts">
	export let title: string;
	export let flash: boolean;
</script>

<div class="timerContainer" class:flash>
	<span class="title" class:flash>{title}</span>
	<slot />
</div>

<style>
	.timerContainer {
		background-color: grey;
		box-shadow: 5px 5px 5px black;
		border-radius: 5px;
		position: relative;
		overflow: hidden;
		min-height: 20vh;
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
