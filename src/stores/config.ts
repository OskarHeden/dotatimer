import { writable } from 'svelte/store';

interface Config {
	timers: any[];
	defaultReminder: number;
	soundEnabled: boolean;
}

const initialState: Config = {
	timers: [],
	defaultReminder: 15,
	soundEnabled: true
};

const config = writable(initialState);

export default {
	subscribe: config.subscribe,
	set: config.set,
	update: config.update
};
