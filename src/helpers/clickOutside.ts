export function clickOutside(
	node: HTMLElement,
	{
		callback,
		enabled,
		exceptions
	}: { callback: any; enabled: boolean; exceptions?: (HTMLElement | SVGSVGElement)[] }
): any {
	function handleOutsideClick(ev: MouseEvent) {
		const isInside = node.contains(ev.target as HTMLElement);
		const isInsideException = exceptions?.some((ele) => ele.contains(ev.target as HTMLElement));

		if (!isInside && !isInsideException) {
			callback();
		}
	}

	function update({ enabled }: { enabled: boolean }) {
		if (enabled) {
			window.addEventListener('click', handleOutsideClick);
		} else {
			window.removeEventListener('click', handleOutsideClick);
		}
	}

	update({ enabled });

	return {
		update,
		destroy() {
			window.removeEventListener('click', handleOutsideClick);
		}
	};
}
