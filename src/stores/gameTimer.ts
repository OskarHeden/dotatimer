// src/lib/timerStore.js
import { writable } from 'svelte/store';

const initialState = {
	time: 0,
	isRunning: false
};

const timerStore = writable(initialState);

let interval: ReturnType<typeof setInterval>;

const start = () => {
	timerStore.update((state) => {
		if (!state.isRunning) {
			interval = setInterval(() => {
				timerStore.update((state) => ({ ...state, time: state.time + 1 }));
			}, 1000);
		}
		return { ...state, isRunning: true };
	});
};

const pause = () => {
	timerStore.update((state) => {
		clearInterval(interval);
		return { ...state, isRunning: false };
	});
};

const reset = () => {
	timerStore.set(initialState);
	clearInterval(interval);
};

const incrementOneSecond = () => {
	timerStore.update((state) => ({ ...state, time: state.time + 1 }));
};

const decrementOneSecond = () => {
	timerStore.update((state) => ({ ...state, time: state.time - 1 }));
};

const formatTimeString = (seconds: number, minutes: number) => {
	return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const formatTime = (time: number) => {
	const seconds = time % 60;
	const minutes = Math.floor(time / 60);

	return formatTimeString(seconds, minutes);
};

export default {
	subscribe: timerStore.subscribe,
	set: timerStore.set,
	update: timerStore.update,
	start,
	pause,
	reset,
	incrementOneSecond,
	decrementOneSecond,
	formatTime
};
