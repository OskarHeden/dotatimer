// timersStore.ts
import { get, writable, type Writable } from 'svelte/store';
import { gameTimer } from './gameTimer';

export interface TimerConfig {
	enabled: boolean;
	soundEnabled: boolean;
	title: string;
	interval: number; // in minutes
	initialSkip: number;
	icon: string;
	audioSrc: string;
	audio?: HTMLAudioElement;
	notifySecondsBefore: number;
	static?: boolean;
	startTime?: number;
}

const prepareRoshanAudio = (timer: RoshanConfig) =>
	typeof window === 'undefined'
		? timer
		: {
				...timer,
				potentialSpawnAudio: new Audio(`/sound/Joey/${timer.potentialSpawnAudioSrc}`),
				definiteSpawnAudio: new Audio(`/sound/Joey/${timer.definiteSpawnAudioSrc}`)
		  };

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
		soundEnabled: true,
		title: 'Wisdom Rune',
		interval: 7, // in minutes
		initialSkip: 0,
		icon: 'Wisdom.webp',
		audioSrc: 'powerRuneSpawn.mp3',
		notifySecondsBefore: 15
	},
	{
		enabled: false,
		soundEnabled: true,
		title: 'Tormentor',
		interval: 20, // in minutes
		initialSkip: 0,
		icon: 'Tormentor.webp',
		audioSrc: 'powerRuneSpawn.mp3',
		notifySecondsBefore: 15
	},
	{
		enabled: false,
		soundEnabled: true,
		title: 'Lotus',
		interval: 3, // in minutes
		initialSkip: 0,
		icon: 'Lotus.png',
		audioSrc: 'bountyRuneSpawn.mp3',
		notifySecondsBefore: 15
	},
	{
		enabled: false,
		soundEnabled: true,
		title: 'Power Rune',
		interval: 2, // in minutes
		initialSkip: 2,
		icon: 'powerRune.webp',
		audioSrc: 'powerRuneSpawn.mp3',
		notifySecondsBefore: 15
	},
	{
		enabled: false,
		soundEnabled: true,
		title: 'Bounty Rune',
		interval: 3, // in minutes
		initialSkip: 0,
		icon: 'Bountyrune.png',
		audioSrc: 'bountyRuneSpawn.mp3',
		notifySecondsBefore: 15
	},
	{
		enabled: false,
		soundEnabled: true,
		title: 'Stacking',
		interval: 1, // in minutes
		initialSkip: 1,
		icon: 'Centaurcreep.webp',
		audioSrc: 'timeToStack.mp3',
		notifySecondsBefore: 15
	},
	{
		enabled: false,
		soundEnabled: true,
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

export const toggleTimerSound = (index: number) => {
	const timers = get(timerConfig);
	timers[index].soundEnabled = !timers[index].soundEnabled;
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

export const timers: Writable<TimerConfig[]> = writable(initialTimers);

const aegisTimer = {
	enabled: true,
	soundEnabled: true,
	title: 'Aegis',
	interval: 6,
	initialSkip: 0,
	icon: 'roshan.webp',
	audioSrc: 'aegisReclaimed.mp3',
	notifySecondsBefore: 30,
	static: true
};

export const timerConfig = {
	set: timers.set,
	update: timers.update,
	subscribe: timers.subscribe,
	addAegisTimer: (startTime: number) => {
		timers.update((s) => [...s, { ...aegisTimer, startTime }]);
	},
	removeAegisTimer: () => {
		timers.update((timers) => timers.filter((timer) => timer.title !== 'Aegis'));
	}
};

export interface RoshanConfig {
	activated: boolean;
	soundEnabled: boolean;
	title: string;
	maxSpawn: number;
	minSpawn: number;
	icon: string;
	potentialSpawnAudioSrc: string;
	definiteSpawnAudioSrc: string;
	potentialSpawnAudio?: HTMLAudioElement;
	definiteSpawnAudio?: HTMLAudioElement;
	notifySecondsBefore: number;
	killTime?: number;
}

const roshanConfig: RoshanConfig = {
	activated: false,
	soundEnabled: true,
	title: 'Roshan',
	maxSpawn: 11,
	minSpawn: 8,
	icon: 'roshan.webp',
	potentialSpawnAudioSrc: 'roshanPotentialSpawn.mp3',
	definiteSpawnAudioSrc: 'roshanHasSpawned.mp3',
	notifySecondsBefore: 0
};
const roshanStore: Writable<RoshanConfig> = writable(prepareRoshanAudio(roshanConfig));

export const roshan = {
	set: roshanStore.set,
	update: roshanStore.update,
	subscribe: roshanStore.subscribe,
	activate: (killTime: number) => {
		roshanStore.update((s) => ({ ...s, activated: true, killTime }));
		const gameTime = get(gameTimer).time;
		timerConfig.addAegisTimer(gameTime);
	}
};
