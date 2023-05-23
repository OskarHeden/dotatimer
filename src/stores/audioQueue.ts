import { writable } from 'svelte/store';

const queue: HTMLAudioElement[] = [];
let currentAudio: HTMLAudioElement | undefined;

// Define the processQueue function
const processQueue = () => {
	if (currentAudio && !currentAudio.ended) {
		return;
	}

	if (queue.length > 0) {
		currentAudio = queue.shift();

		if (currentAudio) {
			currentAudio.onended = () => processQueue();
			currentAudio.play();
		}
	}
};

const customStore = () => {
	const { subscribe } = writable(queue);

	return {
		subscribe,
		addAudio: (audioElement: HTMLAudioElement) => {
			queue.push(audioElement);
			processQueue();
		}
	};
};

export const audioQueue = customStore();
