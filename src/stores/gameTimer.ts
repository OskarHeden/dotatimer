// src/lib/timerStore.js
import { writable } from 'svelte/store';
import { roshan } from './timerConfig';

interface TimerState {
	start: number;
	initialTime: number;
	time: number;
	isRunning: boolean;
	hasStarted: boolean;
}

const initialState: TimerState = {
	time: 0,
	initialTime: 0,
	start: 0,
	isRunning: false,
	hasStarted: false
};

const timerStore = writable(initialState);

let interval: ReturnType<typeof setInterval>;

const getElapsedTime = (from: number) => Math.round((new Date().getTime() - from) / 1000);

let elapsed = 0;

const start = () => {
	timerStore.update((state) => {
		clearInterval(interval);
		elapsed = 0; // reset elapsed time
		interval = setInterval(() => {
			timerStore.update((state) => {
				if (!state.isRunning) return state;
				return {
					...state,
					time: state.initialTime + getElapsedTime(state.start) + elapsed
				};
			});
		}, 1000);
		return {
			...state,
			time: state.initialTime,
			start: new Date().getTime(),
			isRunning: true,
			hasStarted: true
		};
	});
};

const pause = () => {
	timerStore.update((state) => {
		clearInterval(interval);
		elapsed += getElapsedTime(state.start); // update elapsed time
		return {
			...state,
			isRunning: false
		};
	});
};

const play = () => {
	timerStore.update((state) => {
		if (!state.isRunning) {
			state.start = new Date().getTime(); // reset start time
			state.isRunning = true;
			state.time = state.initialTime + getElapsedTime(state.start) + elapsed;
			interval = setInterval(() => {
				timerStore.update((state) => {
					if (state.isRunning) {
						return {
							...state,
							time: state.initialTime + getElapsedTime(state.start) + elapsed
						};
					}
					return state;
				});
			}, 1000);
		}
		return state;
	});
};

const reset = () => {
	clearInterval(interval);
	timerStore.set(initialState);
	roshan.reset();
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
	const showPrefixMinus = negative;
	return {
		minutes: `${showPrefixMinus ? '-' : ''}${Math.abs(minutes).toString().padStart(2, '0')}`,
		seconds: seconds.toString().padStart(2, '0')
	};
};

export const gameTimer = {
	subscribe: timerStore.subscribe,
	set: timerStore.set,
	update: timerStore.update,
	start,
	reset,
	pause,
	play,
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
