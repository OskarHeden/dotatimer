// timersStore.ts
import { writable, type Writable } from "svelte/store";

export interface TimerConfig {
  enabled: boolean;
  title: string;
  interval: number; // in minutes
  initialSkip: number;
  icon: string;
  audio: string;
}

const initialTimers: TimerConfig[] = [
  {
    enabled: false,
    title: "Power Rune Timer",
    interval: 2, // in minutes
    initialSkip: 1,
    icon: "powerRune.webp",
    audio: "powerRuneSpawn.mp3"
  },
  {
    enabled: false,
    title: "Bounty Rune Timer",
    interval: 2, // in minutes
    initialSkip: 0,
    icon: "Bountyrune.png",
    audio: "bountyRuneSpawn.mp3"
  },
  {
    enabled: false,
    title: "Stacking Timer",
    interval: 2, // in minutes
    initialSkip: 1,
    icon: "Centaurcreep.webp",
    audio: "timeToStack.mp3"
  },
  {
    enabled: false,
    title: "Catapult Wave",
    interval: 5, // in minutes
    initialSkip: 0,
    icon: "Catapult.webp",
    audio: "catapultWave.mp3"
  },
  {
    enabled: false,
    title: "Catapult Wave",
    interval: 5, // in minutes
    initialSkip: 0,
    icon: "Catapult.webp",
    audio: "catapultWave.mp3"
  },
  {
    enabled: false,
    title: "Catapult Wave",
    interval: 5, // in minutes
    initialSkip: 0,
    icon: "Catapult.webp",
    audio: "catapultWave.mp3"
  }
];

export const timerConfig: Writable<TimerConfig[]> = writable(initialTimers);
