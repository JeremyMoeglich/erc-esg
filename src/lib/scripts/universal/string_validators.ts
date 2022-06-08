export function is_int(value: string | number): boolean {
	if (typeof value === 'number') {
		if (Number.isInteger(value)) {
			return true;
		}
		return false;
	}
	return /^\d+$/.test(value);
}
