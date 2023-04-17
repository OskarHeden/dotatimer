export const playSoundEffect = (audio: any) => {
	audio.play();
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
