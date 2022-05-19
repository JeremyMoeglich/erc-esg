import { quintOut } from 'svelte/easing';
import { crossfade } from 'svelte/transition';
const [send, receive] = crossfade({
	duration: (d) => Math.sqrt(d * 300),
	fallback(node) {
		const style = getComputedStyle(node);
		const transform = style.transform === 'none' ? '' : style.transform;

		return {
			duration: 600,
			easing: quintOut,
			css: (t) => `
                transform: ${transform} scale(${t});
                opacity: ${t}
            `
		};
	}
});
export function fadeScale(
	node: Element,
	{ delay = 0, duration = 200, easing = (x: number) => x, baseScale = 0 }
) {
	const o = +getComputedStyle(node).opacity;
	const m = getComputedStyle(node).transform.match(/scale\(([0-9.]+)\)/);
	const s = m ? parseFloat(m[1]) : 1;
	const is = 1 - baseScale;

	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = easing(t);
			return `opacity: ${eased * o}; transform: scale(${eased * s * is + baseScale})`;
		}
	};
}

export { send, receive };
