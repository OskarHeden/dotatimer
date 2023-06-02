<script>
	import { modalOpen } from '../../stores/resetModal';

	const openModal = () => {
		modalOpen.set(true);
	};
</script>

<button class="reset" on:click={openModal}>
	<svg width="800" height="800" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"
		><g
			fill="none"
			fill-rule="evenodd"
			stroke="#fff"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			><path d="M3.578 6.487A8 8 0 1 1 2.5 10.5" /><path d="M7.5 6.5h-4v-4" /></g
		></svg
	>
</button>

<style>
	button {
		background-color: transparent;
		border: none;
		cursor: pointer;
	}
	.reset {
		color: white;
	}

	.reset svg {
		height: 30px;
		width: 30px;
	}
</style>
