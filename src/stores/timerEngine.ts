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

				// Check if the timer should still skip rounds
				if (elapsedRounds < timer.initialSkip) {
					remainingSeconds =
						timer.interval * 60 * (timer.initialSkip - (negativeTime ? 0 : elapsedRounds)) +
						timer.interval * 60 -
						$gameTimer.time;
				} else {
					if (timer.static && timer.startTime) {
						remainingSeconds = 60 * timer.interval - ($gameTimer.time - timer.startTime);
						if (remainingSeconds === 0) {
							playSoundEffect(timer.audio);
							setTimeout(() => {
								aegis.reclaim();
							}, 2000);
						}

						// Don't show negative time during fade-out
						if (remainingSeconds < 0) {
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

				let flash = false;

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
	potentialRemainingSeconds?: number;
	potentialRemainingFormatted?: string;
	definiteRemainingSeconds?: number;
	definiteRemainingFormatted?: string;
	flash?: boolean;
}

export const roshanTimer: Readable<RoshanTimer> = derived(
	[gameTimer, config, roshan],
	([$gameTimer, $config, $roshan]): RoshanTimer => {
		if (!($roshan.activated && $roshan.killTime)) {
			return $roshan;
		}

		const killTime = $roshan.killTime;
		const definiteSpawnTime = $roshan.maxSpawn * 60 - (killTime - $gameTimer.time);
		const potentialSpawnTime = definiteSpawnTime - ($roshan.maxSpawn - $roshan.minSpawn) * 60;
		const gameTimeMinutes = Math.floor(definiteSpawnTime / 60);
		const gameTimeSeconds = definiteSpawnTime % 60;

		console.log({ gameTimeMinutes, gameTimeSeconds });

		return { ...$roshan };
	}
);
