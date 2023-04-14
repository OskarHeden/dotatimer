// src/lib/timerStore.js
import { writable } from 'svelte/store';

interface TimerState {
	start: number;
	time: number;
	isRunning: boolean;
}

const initialState: TimerState = {
	time: 0,
	start: 0,
	isRunning: false
};

const timerStore = writable(initialState);

let interval: ReturnType<typeof setInterval>;

const getElapsedTime = (from: number) => Math.round((new Date().getTime() - from) / 1000);

const start = () => {
	timerStore.update((state) => {
		if (!state.isRunning) {
			interval = setInterval(() => {
				timerStore.update((state) => ({ ...state, time: getElapsedTime(state.start) }));
			}, 1000);
		}
		return {
			...state,
			start: new Date().getTime(),
			isRunning: true
		};
	});
};

const reset = () => {
	timerStore.set(initialState);
	clearInterval(interval);
};

const incrementOneSecond = () => {
	timerStore.update((state) => ({ 
		...state,
		start: state.start - 1000,
		time: getElapsedTime(state.start - 1000)
	}));
};

const decrementOneSecond = () => {
	timerStore.update((state) => ({
		...state,
		start: state.start + 1000,
		time: getElapsedTime(state.start - 1000)
	}));
};

const formatTimeString = (minutes: number, seconds: number) => {
	return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const formatTime = (time: number) => {
	const seconds = time % 60;
	const minutes = Math.floor(time / 60);

	return formatTimeString(minutes, seconds);
};

export default {
	subscribe: timerStore.subscribe,
	set: timerStore.set,
	update: timerStore.update,
	start,
	reset,
	incrementOneSecond,
	decrementOneSecond,
	setTimer: (time: number) => {
		timerStore.update((state: TimerState): TimerState => {
			const newStart = new Date().getTime() - (time * 1000);

			return {
				...state,
				start: newStart,
				time: getElapsedTime(newStart)
			};
		});
	},
	formatTime
};
