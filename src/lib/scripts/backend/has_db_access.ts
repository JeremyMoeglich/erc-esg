import type { Role } from '@prisma/client';

export function has_db_access(role: Role) {
	if (role === 'admin' || role === 'root' || role === 'linus') {
		return true;
	}
	return false;
}
