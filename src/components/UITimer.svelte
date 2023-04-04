<script lang="ts">
	export let title: string;
</script>

<div class="timerContainer">
	<span class="title">{title}</span>
	<slot />
</div>

<style>
	.timerContainer {
		background-color: grey;
		box-shadow: 5px 5px 5px black;
		border-radius: 5px;
	}
	.title {
		color: white;
	}
</style>
