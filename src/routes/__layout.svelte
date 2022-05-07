<script lang="ts">
	import '../global.scss';
	import Header from '$lib/components/site/route/layout/header/head.svelte';
	import { page } from '$app/stores';
	import { in_auth_action } from '$lib/scripts/frontend/auth_state';

	const auth_pages = ['/login', '/register', '/profile'];

	page.subscribe((current_page) => {
		if (auth_pages.includes(current_page.url.pathname)) {
			in_auth_action.set(true);
		} else {
			in_auth_action.set(false);
		}
	});
</script>

<Header />
<slot />

