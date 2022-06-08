import { hasProperty, typed_entries } from 'functional-utilities';

export function is_string(value: unknown): value is string {
	return typeof value === 'string';
}

export function is_number(value: unknown): value is number {
	return typeof value === 'number';
}

export function is_boolean(value: unknown): value is boolean {
	return typeof value === 'boolean';
}

export function is_object(value: unknown): value is object {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function has_keys<K>(value: unknown, k: K[]): value is Record<keyof K, unknown> {
	return is_object(value) && k.every((key) => key in value);
}

export function type_match<T>(value: unknown, example: T): value is T {
	if (is_object(value)) {
		return (
			is_object(example) &&
			typed_entries(value).every(
				([key, value]) => hasProperty(example, key) && type_match(value, example[key])
			)
		);
	} else if (Array.isArray(value)) {
		return (
			Array.isArray(example) &&
			value.length === example.length &&
			value.every((value, index) => type_match(value, example[index]))
		);
	} else {
		return typeof value === typeof example;
	}
}
