import { writable } from 'svelte/store';

interface Config {
	soundEnabled: boolean;
}

const initialState: Config = {
	soundEnabled: true
};

export const config = writable(initialState);
