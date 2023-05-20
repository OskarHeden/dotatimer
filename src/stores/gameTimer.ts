// src/lib/timerStore.js
import { writable } from 'svelte/store';

interface TimerState {
	start: number;
	initialTime: number;
	time: number;
	isRunning: boolean;
}

const initialState: TimerState = {
	time: 0,
	initialTime: 0,
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
				timerStore.update((state) => ({
					...state,
					time: state.initialTime + getElapsedTime(state.start)
				}));
			}, 1000);
		}
		return {
			...state,
			time: state.initialTime,
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
		time: state.initialTime + getElapsedTime(state.start - 1000)
	}));
};

const decrementOneSecond = () => {
	timerStore.update((state) => ({
		...state,
		start: state.start + 1000,
		time: state.initialTime + getElapsedTime(state.start - 1000)
	}));
};

const formatTime = (time: number) => {
	const negative = time < 0;
	const seconds = Math.abs(time) % 60;
	const minutes = negative ? Math.ceil(time / 60) : Math.floor(time / 60);
	const showPrefixMinus = minutes === 0 && negative;

	return {
		minutes: `${showPrefixMinus ? '-' : ''}${minutes.toString().padStart(2, '0')}`,
		seconds: seconds.toString().padStart(2, '0')
	};
};

export const gameTimer = {
	subscribe: timerStore.subscribe,
	set: timerStore.set,
	update: timerStore.update,
	start,
	reset,
	incrementOneSecond,
	decrementOneSecond,
	setTimer: (time: number) => {
		timerStore.update((state: TimerState): TimerState => {
			const newStart = new Date().getTime() - time * 1000;

			return {
				...state,
				start: new Date().getTime(),
				initialTime: time,
				time: getElapsedTime(newStart)
			};
		});
	},
	formatTime
};
