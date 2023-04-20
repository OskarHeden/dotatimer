// timersStore.ts
import { get, writable, type Writable } from 'svelte/store';

export interface TimerConfig {
	enabled: boolean;
	title: string;
	interval: number; // in minutes
	initialSkip: number;
	icon: string;
	audioSrc: string;
	audio?: HTMLAudioElement;
	notifySecondsBefore: number;
}

const prepareAudio = (timer: TimerConfig) =>
	typeof window === 'undefined'
		? timer
		: {
				...timer,
				audio: new Audio(`/sound/Joey/${timer.audioSrc}`)
		  };

const initialTimers: TimerConfig[] = [
	{
		enabled: false,
		title: 'Power Rune',
		interval: 2, // in minutes
		initialSkip: 2,
		icon: 'powerRune.webp',
		audioSrc: 'powerRuneSpawn.mp3',
		notifySecondsBefore: 15
	},
	{
		enabled: false,
		title: 'Bounty Rune',
		interval: 3, // in minutes
		initialSkip: 0,
		icon: 'Bountyrune.png',
		audioSrc: 'bountyRuneSpawn.mp3',
		notifySecondsBefore: 15
	},
	{
		enabled: false,
		title: 'Stacking',
		interval: 1, // in minutes
		initialSkip: 1,
		icon: 'Centaurcreep.webp',
		audioSrc: 'timeToStack.mp3',
		notifySecondsBefore: 15
	},
	{
		enabled: false,
		title: 'Catapult Wave',
		interval: 5, // in minutes
		initialSkip: 0,
		icon: 'Catapult.webp',
		audioSrc: 'catapultWave.mp3',
		notifySecondsBefore: 15
	}
].map((timer) => prepareAudio(timer));

export const setLocalStorage = () => {
	if (typeof window !== 'undefined') {
		const timers = get(timerConfig);
		localStorage.timers = JSON.stringify(timers);
	}
};

export const setTimerReminder = (value: number, index: number) => {
	const timers = get(timerConfig);
	timers[index].notifySecondsBefore = value;
	setLocalStorage();
};

export const toggleTimer = (index: number) => {
	const timers = get(timerConfig);
	timers[index].enabled = !timers[index].enabled;
	setLocalStorage();
};

export const restoreTimers = () => {
	if (typeof window !== 'undefined') {
		const storedTimers = localStorage.getItem('timers');
		if (storedTimers) {
			const restoredTimers = JSON.parse(storedTimers).map((timer: TimerConfig) =>
				prepareAudio(timer)
			);
			timerConfig.set(restoredTimers);
		}
	}
};

export const timerConfig: Writable<TimerConfig[]> = writable(initialTimers);
