import { writable } from 'svelte/store';

interface Config {
	defaultReminder: number;
	soundEnabled: boolean;
}

const initialState: Config = {
	defaultReminder: 15,
	soundEnabled: true
};

export const config = writable(initialState);
