<script>
	import { onMount } from 'svelte';

	let audioContext;

	onMount(() => {
		const AudioContext = window.AudioContext || window.webkitAudioContext;
		audioContext = new AudioContext();
	});

	async function enableAudio() {
		if (audioContext.state === 'suspended') {
			try {
				await audioContext.resume();
				console.log('Audio context unlocked and ready for use.');
				// Your audio playback logic goes here
			} catch (error) {
				console.error('Failed to unlock audio context:', error);
			}
		}
	}
</script>

<div>
	<button on:click={enableAudio}>Enable Audio</button>
</div>
