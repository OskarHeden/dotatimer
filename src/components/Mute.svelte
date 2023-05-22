<script lang="ts">
	import { config } from '../stores/config';
	$: console.log($config);
	$: soundEnabled = $config.soundEnabled;
</script>

<button
	on:click={() => {
		console.log('button works');
		config.update((s) => ({ ...s, soundEnabled: !s.soundEnabled }));
	}}
>
	<div class="container" />

	<div class="iconContainer">
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
	</div>
</button>

<style>
	button {
		border: none;
		color: transparent;
		background-color: transparent;
	}
	.iconContainer :hover {
		stroke: red;
	}

	.container {
		position: absolute;
		left: 0%;
		bottom: 0%;

		display: inline-block;
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 75px 0 0 75px;
		border-color: transparent transparent transparent #000000;
	}

	.iconContainer svg {
		position: absolute;
		stroke: white;
		bottom: 1%;
		left: 1%;
	}

	@media only screen and (min-width: 800px) {
		.container {
			border-width: 100px 0px 0px 100px;
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
