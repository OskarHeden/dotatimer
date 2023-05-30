<script>
	import { gameTimer } from '../../stores/gameTimer';
	import Menu from '../Menu.svelte';
	import Mute from '../Mute.svelte';
	import Pause from './Pause.svelte';
	import Reset from './Reset.svelte';
</script>

{#if $gameTimer.hasStarted}
	<div class="button-bar">
		<Mute />
		<Pause />
		<Reset />
		<Menu />
	</div>
{/if}

<style>
	.button-bar {
		position: fixed;
		background-color: aliceblue;
		padding: 1rem;
		bottom: 0;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.button-bar > :global(button) {
		margin: 1rem 2rem;
	}
</style>
