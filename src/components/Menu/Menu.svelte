<script lang="ts">
	import { onMount } from 'svelte';
	import { clickOutside } from '../../helpers/clickOutside';
	import { menuButton, menuOpen } from '../../stores/menu';
	import AboutUs from './AboutUs.svelte';
	import Settings from './Settings.svelte';

	interface Tab {
		id: string;
		title: string;
	}

	onMount(() => {
		const menuButton = document.getElementById('menuButton');
		if (menuButton) {
			buttonRef = menuButton;
		}
	});

	let tabs: Tab[] = [
		{ id: 'settings', title: 'Settings' },
		{ id: 'about', title: 'About us' }
	];

	let activeTab: Tab = tabs[0];
	const setActiveTab = (tab: Tab) => {
		activeTab = tab;
	};

	const closeMenu = () => {
		menuOpen.set(false);
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			closeMenu();
		}
	};
	$: visible = $menuOpen;

	let buttonRef: HTMLElement | undefined;
	menuButton.subscribe((val) => (buttonRef = val));
	$: exceptions = [buttonRef];
</script>

{#if visible}
	<div
		class="menuContainer"
		use:clickOutside={{
			enabled: visible,
			callback: closeMenu,
			exceptions
		}}
	>
		<div class="tabs">
			{#each tabs as tab}
				<button
					class:active={tab.id === activeTab.id}
					class="tab"
					on:click={() => setActiveTab(tab)}>{tab.title}</button
				>
			{/each}
		</div>
		<div class="content">
			<div class="close" on:click={() => menuOpen.set(false)} on:keydown={handleKeyDown}>
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
					class="feather feather-x"
					><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg
				>
			</div>
			{#if activeTab.id === 'settings'}
				<Settings />
			{:else if activeTab.id === 'about'}
				<AboutUs />
			{/if}
		</div>
	</div>
{/if}

<style>
	svg {
		stroke: white;
	}
	.close svg {
		cursor: pointer;
		position: absolute;
		stroke: white;
		top: 2%;
		left: 90%;
	}
	.menuContainer {
		width: 85vw;
		max-width: 800px;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		background-color: rgba(0, 0, 0, 0.904);
	}
	.tabs {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 10vh;
	}
	.tab {
		margin: 1rem;
		border: none;
		font-size: 24px;
		color: white;
		background-color: transparent;
		cursor: pointer;
	}
	.tab.active {
		color: var(--red);
	}

	.content {
		display: flex;
		flex-direction: column;
		height: 90vh;
		overflow: scroll;
		padding: 0 5%;
	}
</style>
