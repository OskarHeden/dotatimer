export const playSoundEffect = (src: string) => {
	const soundEffect = new Audio(src);
	soundEffect.play();
};

export async function enableAudio() {
	const AudioContext = window.AudioContext || window.webkitAudioContext;
	const audioContext = new AudioContext();

	if (audioContext.state === 'suspended') {
		try {
			await audioContext.resume();
			console.log('Audio context unlocked and ready for use.');
			// Your audio playback logic goes here
		} catch (error) {
			console.error('Failed to unlock audio context:', error);
		}
	}
}
