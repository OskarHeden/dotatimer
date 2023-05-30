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
		background-color: #1e1e1e;
		padding: 1rem;
		bottom: 0;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-top: white solid 1px;
		border-left: white solid 1px;
		border-right: white solid 1px;
	}
	.button-bar > :global(button) {
		margin: 0.5rem 2rem;
	}
	@media (max-width: 468px) {
		.button-bar {
			max-height: 20px;
			max-width: 90vw;
		}
		.button-bar > :global(button) {
			margin: 1rem 1.5rem;
		}
	}
</style>
