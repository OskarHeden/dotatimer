<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import UITimer from './UITimer.svelte';

	let timer: NodeJS.Timer;
	let seconds = 0;
	let minutes = 0;

	const formatTime = (value: number) => value.toString().padStart(2, '0');

	const updateTime = () => {
		seconds++;
		if (seconds === 60) {
			minutes++;
			seconds = 0;
		}
	};

	onMount(() => {
		timer = setInterval(updateTime, 1000);

		return () => {
			clearInterval(timer);
		};
	});

	onDestroy(() => {
		clearInterval(timer);
	});
</script>

<UITimer title="stacking">
	<p>{formatTime(minutes)}:{formatTime(seconds)}</p>
</UITimer>
