import { hasProperty } from 'functional-utilities';
import { writable, type Writable } from 'svelte/store';

export interface user_data {
	name: string;
	id: number;
	email: string;
	role: 'normal' | 'admin' | 'root';
}

export function is_user_data(data: unknown): data is user_data {
    if (typeof data !== 'object') {
        return false;
    }
    if (!data) {
        return false;
    }
    if (!hasProperty(data, 'name') || typeof data.name !== 'string') {
        return false;
    }
    if (!hasProperty(data, 'id') || typeof data.id !== 'number') {
        return false;
    }
    if (!hasProperty(data, 'email') || typeof data.email !== 'string') {
        return false;
    }
    if (!hasProperty(data, 'role') || typeof data.role !== 'string') {
        return false;
    }
    if (!['normal', 'admin', 'root'].includes(data.role)) {
        return false;
    }
    return true;
}

export const user_data: Writable<undefined | user_data> = writable(undefined);
