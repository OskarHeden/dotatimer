<script lang="ts">
	import { config } from '../../stores/config';
	$: soundEnabled = $config.soundEnabled;

	const updateSoundEnabled = () => {
		config.update((s) => ({ ...s, soundEnabled: !s.soundEnabled }));
	};
</script>

<button on:click={updateSoundEnabled}>
	{#if soundEnabled}
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
			class="feather feather-volume-2"
			><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path
				d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"
			/></svg
		>
	{:else}
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
			class="feather feather-volume-x"
			><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line
				x1="23"
				y1="9"
				x2="17"
				y2="15"
			/><line x1="17" y1="9" x2="23" y2="15" /></svg
		>
	{/if}
</button>

<style>
	button {
		border: none;
		cursor: pointer;
		background-color: transparent;
	}

	svg {
		color: white;
		height: 30px;
		width: 30px;
	}
</style>
