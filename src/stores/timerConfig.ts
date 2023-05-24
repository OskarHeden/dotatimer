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
	preferredSound: 'sfx' | 'voice';
	audio?: HTMLAudioElement;
	notifySecondsBefore: number;
	static?: boolean;
	dynamic?: boolean;
	dynamicRespawn?: number;
	startTime?: number;
}

const prepareRoshanAudio = (timer: RoshanConfig) =>
	typeof window === 'undefined'
		? timer
		: {
				...timer,
				potentialSpawnAudio: new Audio(`/sound/effects/${timer.potentialSpawnAudioSrc}`),
				definiteSpawnAudio: new Audio(`/sound/effects/${timer.definiteSpawnAudioSrc}`)
		  };

const prepareAudio = (timer: TimerConfig) =>
	typeof window === 'undefined'
		? timer
		: {
				...timer,
				audio: new Audio(
					`/sound/${timer.preferredSound === 'sfx' ? 'effects' : 'voice'}/${timer.audioSrc}`
				)
		  };

export const soundOptions: { id: 'sfx' | 'voice'; label: string }[] = [
	{ id: 'sfx', label: 'SFX' },
	{ id: 'voice', label: 'Voice' }
];

const initialTimers: TimerConfig[] = [
	{
		enabled: false,
		soundEnabled: true,
		title: 'Stacking',
		interval: 1, // in minutes
		initialSkip: 1,
		icon: 'Centaurcreep.webp',
		preferredSound: 'sfx',
		audioSrc: 'Stack.mp3',
		notifySecondsBefore: 15
	},
	{
		enabled: false,
		soundEnabled: true,
		title: 'Wisdom Rune',
		interval: 7, // in minutes
		initialSkip: 0,
		icon: 'Wisdom.webp',
		preferredSound: 'sfx',
		audioSrc: 'Wisdom.mp3',
		notifySecondsBefore: 45
	},
	{
		enabled: false,
		soundEnabled: true,
		title: 'Tormentor',
		interval: 20, // in minutes
		initialSkip: 0,
		icon: 'Tormentor.webp',
		preferredSound: 'sfx',
		audioSrc: 'Tormentor.mp3',
		notifySecondsBefore: 0,
		dynamic: true,
		dynamicRespawn: 10
	},
	{
		enabled: false,
		soundEnabled: true,
		title: 'Lotus',
		interval: 3, // in minutes
		initialSkip: 0,
		icon: 'Lotus.png',
		preferredSound: 'sfx',
		audioSrc: 'Lotus.mp3',
		notifySecondsBefore: 15
	},
	{
		enabled: false,
		soundEnabled: true,
		title: 'Power Rune',
		interval: 2, // in minutes
		initialSkip: 2,
		icon: 'powerRune.webp',
		preferredSound: 'sfx',
		audioSrc: 'Power.mp3',
		notifySecondsBefore: 15
	},
	{
		enabled: false,
		soundEnabled: true,
		title: 'Bounty Rune',
		interval: 3, // in minutes
		initialSkip: 0,
		icon: 'Bountyrune.png',
		preferredSound: 'sfx',
		audioSrc: 'Bounty.mp3',
		notifySecondsBefore: 15
	},
	{
		enabled: false,
		soundEnabled: true,
		title: 'Catapult Wave',
		interval: 5, // in minutes
		initialSkip: 0,
		icon: 'Catapult.webp',
		preferredSound: 'sfx',
		audioSrc: 'Catapult.mp3',
		notifySecondsBefore: 30
	}
].map((timer) => prepareAudio(timer));

const updateAudioOptions = () => {
	timerConfig.update((timers) => timers.map((timer) => prepareAudio(timer)));
};

export const setLocalStorage = () => {
	if (typeof window !== 'undefined') {
		const timers = get(timerConfig);
		localStorage.timers = JSON.stringify(timers);
	}
};

export const setSoundOption = (value: 'sfx' | 'voice', index: number) => {
	const timers = get(timerConfig);
	timers[index].preferredSound = value;
	setLocalStorage();
	updateAudioOptions();
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

export const timerConfig: Writable<TimerConfig[]> = writable(initialTimers);

export interface RoshanConfig {
	activated: boolean;
	soundEnabled: boolean;
	title: string;
	maxSpawn: number;
	minSpawn: number;
	icon: string;
	preferredSound: 'sfx' | 'voice';
	potentialSpawnAudioSrc: string;
	definiteSpawnAudioSrc: string;
	potentialSpawnAudio?: HTMLAudioElement;
	definiteSpawnAudio?: HTMLAudioElement;
	notifySecondsBefore: number;
	killTime?: number | null;
}

const roshanConfig: RoshanConfig = {
	activated: false,
	soundEnabled: true,
	title: 'Roshan',
	maxSpawn: 11,
	minSpawn: 8,
	icon: 'roshan.webp',
	preferredSound: 'sfx',
	potentialSpawnAudioSrc: 'Roshan.mp3',
	definiteSpawnAudioSrc: 'Roshan.mp3',
	notifySecondsBefore: 0
};
const roshanStore: Writable<RoshanConfig> = writable(prepareRoshanAudio(roshanConfig));

export const roshan = {
	set: roshanStore.set,
	update: roshanStore.update,
	subscribe: roshanStore.subscribe,
	activate: (startTime: number) => {
		roshanStore.update((s) => ({ ...s, killTime: startTime, activated: true }));
		aegis.activate(startTime);
	},
	reset: () => {
		roshanStore.set(prepareRoshanAudio(roshanConfig));
	}
};

const aegisConfig: TimerConfig = {
	enabled: false,
	soundEnabled: true,
	title: 'Aegis',
	interval: 6,
	initialSkip: 0,
	icon: 'Aegis.png',
	preferredSound: 'sfx',
	audioSrc: 'Aegis.mp3',
	notifySecondsBefore: 0,
	static: true
};

const aegisStore: Writable<TimerConfig> = writable(prepareAudio(aegisConfig));

export const aegis = {
	set: aegisStore.set,
	update: aegisStore.update,
	subscribe: aegisStore.subscribe,
	reset: () => {
		aegisStore.set(prepareAudio(aegisConfig));
	},
	activate: (startTime: number) => {
		aegisStore.update((s) => ({ ...s, startTime, enabled: true }));
	},
	reclaim: () => {
		aegisStore.update((s) => ({ ...s, startTime: undefined, enabled: false }));
	}
};
