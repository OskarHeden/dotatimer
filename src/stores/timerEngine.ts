// derivedTimersStore.ts
import { derived } from "svelte/store";
import type { Readable } from "svelte/store";
import { timerConfig } from "./timerConfig";
import gameTimer from "./gameTimer"; // Assuming this store already exists

interface RemainingTime {
  name: string;
  remainingSeconds: number;
}

export const timerEngine: Readable<RemainingTime[]> = derived(
  [timerConfig, gameTimer],
  ([$timerConfigs, $gameTimer]): RemainingTime[] => {
    return $timerConfigs.map((timer) => {
      // Calculate the total elapsed rounds for the current game timer value
      const elapsedRounds = Math.floor($gameTimer.time / (timer.interval * 60));

      // Check if the timer should still skip rounds
      if (elapsedRounds < timer.initialSkip) {
        return {
          name: timer.name,
          remainingSeconds: (timer.interval * 60) * (timer.initialSkip - elapsedRounds) + (timer.interval * 60) - $gameTimer.time,
        };
      }

      // Calculate the remaining seconds for the current round
      const timeInCurrentRound = $gameTimer.time % (timer.interval * 60);
      const remainingSeconds = (timer.interval * 60) - timeInCurrentRound;

      return {
        name: timer.name,
        remainingSeconds,
      };
    });
  }
);
