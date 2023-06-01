<script lang="ts">
	import { menuOpen } from '../../stores/menu';

	let buttonIconRef: SVGSVGElement;

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			menuOpen.set(false);
		}
	};
</script>

<button on:keydown={handleKeyDown} on:click={() => menuOpen.set(!$menuOpen)}>
	<svg
		bind:this={buttonIconRef}
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		><circle cx="12" cy="12" r="3" /><path
			d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
		/></svg
	>
</button>

<style>
	button {
		background-color: transparent;
		border: none;
	}

	svg {
		stroke: white;
	}
	.close svg {
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
	.content {
		display: grid;
		grid-template-columns: 100%;
		overflow: scroll;
	}

	h2 {
		color: white;
	}
	h3 {
		color: white;
		width: 120px;
		text-align: start;
	}
	.menuItem {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		align-items: center;
		justify-items: center;
	}

	/* The switch - the box around the slider */
	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 34px;
	}

	/* Hide default HTML checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .slider {
		background-color: #f32121;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px #f32121;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(26px);
		-ms-transform: translateX(26px);
		transform: translateX(26px);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
	.timerSetting {
		max-width: 3rem;
	}

	.sound-options {
		display: grid;
		grid-template-columns: repeat(2, 35px); /* CHANGED */
		align-items: center;
		justify-items: center;
		margin: auto;
		grid-gap: 20px; /* ADDED */
	}
	.option {
		display: flex;
		flex-direction: column;
		color: white;
		position: relative;
	}
	.sound-options .option:after {
		/* ADDED */
		content: '';
		position: absolute;
		border-left: 1px solid white;
		right: -15px; /* adjust this */
		top: 0;
		height: 120%; /* adjust this */
	}

	.sound-options .option:last-child:after {
		/* ADDED */
		display: none; /* Hide the divider for the last block */
	}
</style>
