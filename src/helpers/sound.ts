export const playSoundEffect = (src: string) => {
	const soundEffect = new Audio(src);
	soundEffect.play();
};

export async function enableAudio(audioCtx: any) {
	if (audioCtx.state !== 'suspended') return;
	const b = document.body;
	const events = ['touchstart', 'touchend', 'mousedown', 'keydown'];
	events.forEach((e) => b.addEventListener(e, unlock, false));
	function unlock() {
		audioCtx.resume().then(clean);
	}
	function clean() {
		events.forEach((e) => b.removeEventListener(e, unlock));
	}
}

export function unlockSounds() {
	function unlockAll() {
		if (audiosWeWantToUnlock) {
			for (let audio of audiosWeWantToUnlock) {
				audio.play();
				audio.pause();
				audio.currentTime = 0;
			}
			audiosWeWantToUnlock = null;
			document.body.removeEventListener('touchstart', unlockAll);
		}
	}
	document.body.addEventListener('touchstart', unlockAll, false);

	const aegisRecalimed = new Audio('../../static/sound/Joey/aegisReclaimed.mp3');
	const bountyRune = new Audio('../../static/sound/Joey/bountyRuneSpawn.mp3');
	const catapulWave = new Audio('../../static/sound/Joey/catapultWave.mp3');
	const powerRune = new Audio('../../static/sound/Joey/powerRuneSpawn.mp3');
	const roshanHasSpawned = new Audio('../../static/sound/Joey/roshanHasSpawned.mp3');
	const roshanPotentialSpawn = new Audio('../../static/sound/Joey/roshanPotentialSpawn.mp3');
	const timeToStack = new Audio('../../static/sound/Joey/timeTostack.mp3');
	let audiosWeWantToUnlock = [
		aegisRecalimed,
		bountyRune,
		catapulWave,
		powerRune,
		roshanHasSpawned,
		roshanPotentialSpawn,
		timeToStack
	];
}
