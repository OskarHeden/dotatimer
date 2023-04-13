export function clickOutside(
	node: HTMLElement,
	{ callback, enabled }: { callback: any; enabled: boolean }
): any {
	function handleOutsideClick(ev: MouseEvent) {
		const isInside = node.contains(ev.target as HTMLElement);

		if (!isInside) {
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
