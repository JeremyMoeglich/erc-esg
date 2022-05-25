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
export function tfade(
	_: Element,
	{
		angle = 0,
		delay = 0,
		duration = 200,
		easing = (x: number) => x,
		x = 0,
		y = 0,
		scale = 1,
		opacity = 1
	}
) {
	return {
		duration,
		delay,
		css(t: number) {
			const eased = easing(t);
			return `transform: rotate(${(1 - eased) * angle}deg) opacity: ${
				eased * (1 - opacity) + opacity
			}); translate(${(1 - eased) * x}px, ${(1 - eased) * y}px) scale(${
				(1 - eased) * scale + scale
			})`;
		}
	};
}
export { send, receive };
