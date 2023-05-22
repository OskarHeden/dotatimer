import { derived } from 'svelte/store';
import type { Readable } from 'svelte/store';
import { timerConfig, roshan, type TimerConfig, type RoshanConfig, aegis } from './timerConfig';
import { gameTimer } from './gameTimer'; // Assuming this store already exists
import { playSoundEffect } from '../helpers/sound';
import { config } from './config';
import type TimerState from '../components/GameTimer.svelte';

export interface Timer extends TimerConfig {
	index: number;
	order?: number;
	remainingSeconds: number;
	remainingFormatted: string;
	flash: boolean;
	startTimeFormatted?: string;
}

const formatTime = (value: number) => value.toString().padStart(2, '0');

export const timerEngine: Readable<Timer[]> = derived(
	[timerConfig, gameTimer, config, aegis],
	([$timerConfigs, $gameTimer, $config, $aegis]): Timer[] => {
		const allTimers = $aegis.enabled ? [...$timerConfigs, $aegis] : $timerConfigs;
		return allTimers
			.map((timer, index) => {
				let remainingSeconds: number;

				// Calculate the total elapsed rounds for the current game timer value
				const elapsedRounds = Math.floor($gameTimer.time / (timer.interval * 60));

				const negativeTime = $gameTimer.time < 0;

				let flash = false;

				// Check if the timer should still skip rounds
				if (elapsedRounds < timer.initialSkip) {
					remainingSeconds =
						timer.interval * 60 * (timer.initialSkip - (negativeTime ? 0 : elapsedRounds)) +
						timer.interval * 60 -
						$gameTimer.time;
				} else {
					if (timer.static && timer.startTime) {
						remainingSeconds = 60 * timer.interval - ($gameTimer.time - timer.startTime);
						flash = remainingSeconds <= timer.notifySecondsBefore;
						if (remainingSeconds === 0) {
							playSoundEffect(timer.audio);
						}

						// Don't show negative time during fade-out
						if (remainingSeconds <= 0) {
							aegis.reclaim();
							remainingSeconds = 0;
						}
					} else {
						// Calculate the remaining seconds for the current round
						const timeInCurrentRound = $gameTimer.time % (timer.interval * 60);
						remainingSeconds = timer.interval * 60 - timeInCurrentRound;
					}
				}

				const minutesLeft = Math.floor(remainingSeconds / 60);
				const secondsLeft = remainingSeconds % 60;
				const remainingFormatted = `${formatTime(minutesLeft)}:${formatTime(secondsLeft)}`;

				if (timer.enabled && timer.soundEnabled && $config.soundEnabled && !timer.static) {
					flash = remainingSeconds <= timer.notifySecondsBefore;
					if ($config.soundEnabled && remainingSeconds === timer.notifySecondsBefore && timer.audio)
						playSoundEffect(timer.audio);
				}

				return {
					...timer,
					index,
					remainingSeconds,
					remainingFormatted,
					flash
				};
			})
			.sort((a, b) =>
				a.enabled !== b.enabled
					? b.enabled
						? 1
						: -1
					: a.remainingSeconds > b.remainingSeconds
					? 1
					: -1
			)
			.map((timer, index) => ({
				...timer,
				order: index
			}));
	}
);

export interface RoshanTimer extends RoshanConfig {
	potentialRemainingFormatted?: string | null;
	definiteRemainingFormatted?: string | null;
	killTimeFormatted?: string;
	location?: string | null;
	flash?: boolean;
	shouldReset?: boolean;
}

export const roshanTimer: Readable<RoshanTimer> = derived(
	[gameTimer, config, roshan],
	([$gameTimer, $config, $roshan]): RoshanTimer => {
		if (!($roshan.activated && $roshan.killTime)) {
			const gameTimeMinutes = Math.floor($gameTimer.time / 60);
			console.log({ gameTimeMinutes, stuff: (gameTimeMinutes / 5) % 2 });
			const location = Math.floor(gameTimeMinutes / 5) % 2 === 1 ? 'Top' : 'Bot';
			return { ...$roshan, location };
		}

		const killTime = $roshan.killTime;
		const killTimeMinutes = Math.floor(killTime / 60);
		const killTimeSeconds = killTime % 60;
		const killTimeFormatted = `${formatTime(killTimeMinutes)}:${formatTime(killTimeSeconds)}`;

		let definiteSpawnTime = $roshan.maxSpawn * 60 - ($gameTimer.time - killTime);
		const definiteMinutes = Math.floor(definiteSpawnTime / 60);
		const definiteSeconds = definiteSpawnTime % 60;
		let definiteRemainingFormatted: string | null = `${formatTime(definiteMinutes)}:${formatTime(
			definiteSeconds
		)}`;

		let potentialSpawnTime = definiteSpawnTime - ($roshan.maxSpawn - $roshan.minSpawn) * 60;
		const potentialMinutes = Math.floor(potentialSpawnTime / 60);
		const potentialSeconds = potentialSpawnTime % 60;
		let potentialRemainingFormatted: string | null = `${formatTime(potentialMinutes)}:${formatTime(
			potentialSeconds
		)}`;

		const flash = definiteSeconds <= $roshan.notifySecondsBefore;

		if ($roshan.soundEnabled && $config.soundEnabled) {
			if (potentialSpawnTime === $roshan.notifySecondsBefore)
				playSoundEffect($roshan.potentialSpawnAudio);
			if (definiteSpawnTime === $roshan.notifySecondsBefore)
				playSoundEffect($roshan.definiteSpawnAudio);
		}

		let shouldReset = false;
		if (definiteSpawnTime <= 0) {
			shouldReset = false;
			roshan.reset();
		}

		if (definiteSpawnTime < 0) {
			definiteRemainingFormatted = null;
			definiteSpawnTime = 0;
		}
		if (potentialSpawnTime < 0) {
			potentialRemainingFormatted = null;
			potentialSpawnTime = 0;
		}

		return {
			...$roshan,
			location: null,
			definiteRemainingFormatted,
			potentialRemainingFormatted,
			killTimeFormatted,
			flash,
			shouldReset
		};
	}
);
