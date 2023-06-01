import { writable } from 'svelte/store';

export const menuOpen = writable(false);

export const menuButton = writable<HTMLElement>();
