<script lang="ts">
	export let onChange = (evt: Event) => {};
	export let checked: boolean;
	export let disabled: boolean;
</script>

<label class="switch">
	<input type="checkbox" on:change={onChange} {checked} {disabled} />
	<span class="slider round" />
</label>

<style>
	/* The switch - the box around the slider */
	.switch {
		position: relative;
		display: inline-block;
		width: 42px; /* 42px */
		height: 24px; /* 24px */
		margin-bottom: 5px;
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
		height: 18px; /* 18px */
		width: 18px;
		left: 3px;
		bottom: 3px;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .slider {
		background-color: var(--red);
	}

	input:focus + .slider {
		box-shadow: 0 0 1px var(--red);
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(18px);
		-ms-transform: translateX(18px);
		transform: translateX(18px);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 24px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
</style>
