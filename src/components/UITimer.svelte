<script lang="ts">
	export let title: string;
</script>

<div class="timerContainer">
	<span class="title">{title}</span>
	<slot />
</div>

<style>
	.timerContainer {
		background-color: hotpink;
		box-shadow: 5px 5px 5px grey;
	}
	.title {
		color: white;
	}
</style>
