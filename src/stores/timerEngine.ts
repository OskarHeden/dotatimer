import { derived } from 'svelte/store';
import type { Readable } from 'svelte/store';
import {
	timerConfig,
	roshan,
	type TimerConfig,
	aegis,
	dynamicConfig,
	type DynamicTimerConfig
} from './timerConfig';
import { gameTimer } from './gameTimer'; // Assuming this store already exists
import { playSoundEffect } from '../helpers/sound';
import { config } from './config';
import { audioQueue } from './audioQueue';

export interface Timer extends TimerConfig {
	index: number;
	order?: number;
	remainingSeconds: number;
	remainingFormatted: string | null;
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
							audioQueue.addAudio(timer.audio as HTMLAudioElement);
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
				const remainingFormatted: string | null = `${formatTime(minutesLeft)}:${formatTime(
					secondsLeft
				)}`;

				flash = remainingSeconds <= timer.notifySecondsBefore;
				if (timer.enabled && timer.soundEnabled && $config.soundEnabled && !timer.static) {
					if (
						$config.soundEnabled &&
						remainingSeconds === timer.notifySecondsBefore &&
						timer.audio
					) {
						audioQueue.addAudio(timer.audio as HTMLAudioElement);
					}
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

export interface DynamicTimer extends DynamicTimerConfig {
	index?: number;
	order?: number;
	potentialRemainingFormatted?: string | null;
	definiteRemainingFormatted?: string | null;
	remainingFormatted?: string | null;
	killTimeFormatted?: string;
	location?: string | null;
	flash?: boolean;
	shouldReset?: boolean;
}

let tormentorInitialSpawn = false;

export const dynamicTimers: Readable<DynamicTimer[]> = derived(
	[gameTimer, config, dynamicConfig, roshan],
	([$gameTimer, $config, $dynamicConfig, $roshan]): DynamicTimer[] => {
		return [$roshan, ...$dynamicConfig]
			.map((timer, index) => {
				if (timer.roshan) {
					let remainingSeconds;
					const gameTimeMinutes = Math.floor($gameTimer.time / 60);
					const location = Math.floor(gameTimeMinutes / 5) % 2 === 1 ? 'Top' : 'Bot';
					if (!(timer.activated && timer.killTime) && timer.maxSpawn) {
						return { ...timer, location, flash: true, remainingSeconds: timer.maxSpawn * 60 };
					} else {
						const killTime = timer.killTime;
						let definiteRemainingFormatted: string | null | undefined,
							potentialRemainingFormatted: string | null | undefined,
							flash = false,
							killTimeFormatted: string | undefined,
							shouldReset = false;
						if (killTime && timer.maxSpawn && timer.minSpawn) {
							const negativeTime = killTime < 0;
							let killTimeMinutes, killTimeSeconds;
							if (negativeTime) {
								const negativeMinutes = killTime < -59;
								killTimeMinutes = `${negativeMinutes ? '-' : ''}${Math.floor(
									Math.abs(killTime) / 60
								)}`;
								killTimeSeconds = `${negativeMinutes ? '' : '-'}${Math.abs(killTime) % 60}`;
							} else {
								killTimeMinutes = `${Math.floor(killTime / 60)}`;
								killTimeSeconds = `${killTime % 60}`;
							}
							killTimeFormatted = `${formatTime(killTimeMinutes)}:${formatTime(killTimeSeconds)}`;

							let definiteSpawnTime = timer.maxSpawn * 60 - ($gameTimer.time - killTime);
							const definiteMinutes = Math.floor(definiteSpawnTime / 60);
							const definiteSeconds = definiteSpawnTime % 60;
							definiteRemainingFormatted = `${formatTime(definiteMinutes)}:${formatTime(
								definiteSeconds
							)}`;

							let potentialSpawnTime = definiteSpawnTime - (timer.maxSpawn - timer.minSpawn) * 60;
							const potentialMinutes = Math.floor(potentialSpawnTime / 60);
							const potentialSeconds = potentialSpawnTime % 60;
							potentialRemainingFormatted = `${formatTime(potentialMinutes)}:${formatTime(
								potentialSeconds
							)}`;

							remainingSeconds = definiteSeconds;

							flash = definiteSeconds <= timer.notifySecondsBefore;

							if (timer.soundEnabled && $config.soundEnabled) {
								if (
									potentialSpawnTime === timer.notifySecondsBefore ||
									definiteSpawnTime === timer.notifySecondsBefore
								) {
									playSoundEffect(timer.audio);
								}
							}

							shouldReset = false;
							if (definiteSpawnTime <= 0) {
								shouldReset = true;
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
						}
						return {
							...timer,
							index,
							location,
							remainingSeconds,
							definiteRemainingFormatted,
							potentialRemainingFormatted,
							killTimeFormatted,
							flash,
							shouldReset
						};
					}
				} else {
					let remainingSeconds: number;

					// Calculate the total elapsed rounds for the current game timer value
					const elapsedRounds = Math.floor($gameTimer.time / (timer.interval * 60));

					const negativeTime = $gameTimer.time < 0;

					let flash = false;
					let shouldPlayAudio = false;

					// Mark of initial spawn
					if ($gameTimer.time >= timer.interval * 60) {
						// If it has been activated
						if (timer.killTime && timer.dynamicRespawn) {
							if ($gameTimer.time - timer.killTime < timer.dynamicRespawn * 60) {
								remainingSeconds = timer.dynamicRespawn * 60 - ($gameTimer.time - timer.killTime);
							} else {
								if ($gameTimer.time === timer.killTime + timer.dynamicRespawn * 60) {
									shouldPlayAudio = true;
								}
								remainingSeconds = 0;
							}
						} else {
							// Play first spawn sound
							if (!tormentorInitialSpawn && $gameTimer.time === timer.interval * 60) {
								shouldPlayAudio = true;
								tormentorInitialSpawn = true;
							}
							remainingSeconds = 0;
						}
					} else {
						// Still counting down for first respawn
						const timeInCurrentRound = $gameTimer.time % (timer.interval * 60);
						remainingSeconds = timer.interval * 60 - timeInCurrentRound;
					}

					const minutesLeft = Math.floor(remainingSeconds / 60);
					const secondsLeft = remainingSeconds % 60;
					let remainingFormatted: string | null = `${formatTime(minutesLeft)}:${formatTime(
						secondsLeft
					)}`;
					if (remainingSeconds === 0) {
						remainingFormatted = null;
					}

					flash = remainingSeconds <= timer.notifySecondsBefore;

					if (shouldPlayAudio && timer.enabled && timer.soundEnabled && $config.soundEnabled) {
						if (
							$config.soundEnabled &&
							remainingSeconds === timer.notifySecondsBefore &&
							timer.audio
						) {
							audioQueue.addAudio(timer.audio as HTMLAudioElement);
						}
					}

					return {
						...timer,
						index,
						remainingSeconds,
						remainingFormatted,
						flash
					};
				}
			})
			.sort((a, b) => {
				if (a.activated && b.activated) {
					if (a?.remainingSeconds === b?.remainingSeconds) {
						// If time is the same - Roshan is tiebreaker, else don't swap

						if (a.title === 'Roshan' || b.title === 'Roshan') {
							return a.title === 'Roshan' ? -1 : 1;
						}
						return -1;
					}
					if (a?.remainingSeconds < b?.remainingSeconds) {
						return a.remainingSeconds < b.remainingSeconds ? 1 : -1;
					}
				} else {
					//If the first is activated and the second isn't - swap them
					if (a.activated !== b.activated) {
						if (a.activated) {
							return 1;
						}
						if (a?.remainingSeconds !== b?.remainingSeconds) {
							return a.remainingSeconds > b.remainingSeconds ? 1 : -1;
						}
					}

					// Second tie breaker
					// ROSHAN BOSHAN
					if (a.title === 'Roshan' || b.title === 'Roshan') {
						return a.title === 'Roshan' ? -1 : 1;
					}
					return 1;
				}
			})
			.map((timer, index) => ({
				...timer,
				index,
				order: index
			}));
	}
);
