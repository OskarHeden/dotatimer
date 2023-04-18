// timersStore.ts
import { writable, type Writable } from "svelte/store";

export interface TimerConfig {
  enabled: boolean;
  title: string;
  interval: number; // in minutes
  initialSkip: number;
  icon: string;
  audioSrc: string;
  audio?: HTMLAudioElement;
  notifySecondsBefore: number;
}

const initialTimers: TimerConfig[] = [
  {
    enabled: false,
    title: "Power Rune Timer",
    interval: 2, // in minutes
    initialSkip: 1,
    icon: "powerRune.webp",
    audioSrc: "powerRuneSpawn.mp3",
    notifySecondsBefore: 15
  },
  {
    enabled: false,
    title: "Bounty Rune Timer",
    interval: 2, // in minutes
    initialSkip: 0,
    icon: "Bountyrune.png",
    audioSrc: "bountyRuneSpawn.mp3",
    notifySecondsBefore: 15
  },
  {
    enabled: false,
    title: "Stacking Timer",
    interval: 2, // in minutes
    initialSkip: 1,
    icon: "Centaurcreep.webp",
    audioSrc: "timeToStack.mp3",
    notifySecondsBefore: 15
  },
  {
    enabled: false,
    title: "Catapult Wave",
    interval: 5, // in minutes
    initialSkip: 0,
    icon: "Catapult.webp",
    audioSrc: "catapultWave.mp3",
    notifySecondsBefore: 15
  },
  {
    enabled: false,
    title: "Catapult Wave",
    interval: 5, // in minutes
    initialSkip: 0,
    icon: "Catapult.webp",
    audioSrc: "catapultWave.mp3",
    notifySecondsBefore: 15
  },
  {
    enabled: false,
    title: "Catapult Wave",
    interval: 5, // in minutes
    initialSkip: 0,
    icon: "Catapult.webp",
    audioSrc: "catapultWave.mp3",
    notifySecondsBefore: 15
  }
].map(timer => typeof window === "undefined"
  ? timer
  : {
    ...timer,
    audio: new Audio(`/sound/Joey/${timer.audioSrc}`)
  });

export const timerConfig: Writable<TimerConfig[]> = writable(initialTimers);
