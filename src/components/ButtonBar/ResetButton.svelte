<script>
	import { modalOpen } from '../../stores/resetModal';

	const openModal = () => {
		modalOpen.set(true);
	};
</script>

<button class="reset" on:click={openModal}><img src="/icons/reset.svg" alt="reset" /></button>

<style>
	button {
		background-color: transparent;
		border: none;
		cursor: pointer;
	}
	.reset {
		color: white;
	}

	.reset img {
		height: 30px;
		width: 30px;
		fill: white;
	}
</style>
