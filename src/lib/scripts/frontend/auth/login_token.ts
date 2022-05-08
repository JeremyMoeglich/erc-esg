import Cookies from 'js-cookie';

export function get_login_token(): string | undefined {
	return Cookies.get('login_token');
}

export function set_login_token(token: string): void {
	Cookies.set('login_token', token);
}

export function remove_login_token(): void {
	Cookies.remove('login_token');
}
