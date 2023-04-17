// timersStore.ts
import { writable, type Writable } from "svelte/store";

interface TimerConfig {
  name: string;
  interval: number; // in minutes
  initialSkip: number;
  icon: string;
  audio: string;
}

const initialTimers: TimerConfig[] = [
  {
    name: "Power Rune Timer",
    interval: 2, // in minutes
    initialSkip: 1,
    icon: "powerRune.webp",
    audio: "powerRuneSpawn.mp3"
  },
  {
    name: "Bounty Rune Timer",
    interval: 2, // in minutes
    initialSkip: 0,
    icon: "Bountyrune.webp",
    audio: "bountyRuneSpawn.mp3"
  },
  {
    name: "Stacking Timer",
    interval: 2, // in minutes
    initialSkip: 1,
    icon: "Centaurcreep.webp",
    audio: "timeToStack.mp3"
  },
  {
    name: "Catapult Wave",
    interval: 5, // in minutes
    initialSkip: 0,
    icon: "Catapult.webp",
    audio: "catapultWave.mp3"
  },
  {
    name: "Catapult Wave",
    interval: 5, // in minutes
    initialSkip: 0,
    icon: "Catapult.webp",
    audio: "catapultWave.mp3"
  },
  {
    name: "Catapult Wave",
    interval: 5, // in minutes
    initialSkip: 0,
    icon: "Catapult.webp",
    audio: "catapultWave.mp3"
  }
];

export const timerConfig: Writable<TimerConfig[]> = writable(initialTimers);
