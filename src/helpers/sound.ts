export const playSoundEffect = (src: string) => {
	const soundEffect = new Audio(src);
	soundEffect.play();
};
