// derivedTimersStore.ts
import { derived } from 'svelte/store';
import type { Readable } from 'svelte/store';
import { timerConfig, type TimerConfig } from './timerConfig';
import { gameTimer } from './gameTimer'; // Assuming this store already exists
import { playSoundEffect } from '../helpers/sound';

const FLASH_WHEN_LESS_THAN = 15;

export interface Timer extends TimerConfig {
	index: number;
	remainingSeconds: number;
	remainingFormatted: string;
	flash: boolean;
}

const formatTime = (value: number) => value.toString().padStart(2, '0');

export const timerEngine: Readable<Timer[]> = derived(
	[timerConfig, gameTimer],
	([$timerConfigs, $gameTimer]): Timer[] => {
		return $timerConfigs.map((timer, index) => {
			let remainingSeconds: number;

			// Calculate the total elapsed rounds for the current game timer value
			const elapsedRounds = Math.floor($gameTimer.time / (timer.interval * 60));

			// Check if the timer should still skip rounds
			if (elapsedRounds < timer.initialSkip) {
				remainingSeconds =
					timer.interval * 60 * (timer.initialSkip - elapsedRounds) +
					timer.interval * 60 -
					$gameTimer.time;
			} else {
				// Calculate the remaining seconds for the current round
				const timeInCurrentRound = $gameTimer.time % (timer.interval * 60);
				remainingSeconds = timer.interval * 60 - timeInCurrentRound;
			}

			const minutesLeft = Math.floor(remainingSeconds / 60);
			const secondsLeft = remainingSeconds % 60;
			const remainingFormatted = `${formatTime(minutesLeft)}:${formatTime(secondsLeft)}`;

			const flash = remainingSeconds < FLASH_WHEN_LESS_THAN;

			if (remainingSeconds === 1) playSoundEffect(new Audio(`/sound/Joey/${timer.audio}`));

			return {
				...timer,
				index,
				remainingSeconds,
				remainingFormatted,
				flash
			};
		});
	}
);
