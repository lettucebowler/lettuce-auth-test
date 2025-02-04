import { createClient } from '@openauthjs/openauth/client';
import type { RequestEvent } from '@sveltejs/kit';
export { subjects } from '$lib/subjects.server';

export function createAuthClient(event: RequestEvent) {
	return createClient({
		clientID: 'lettuce-auth-test',
		issuer: 'https://auth.terminal.shop',
		fetch: (url: string, options = {}) => {
			console.log('fetch', url);
			return event.fetch(url, options);
		}
	});
}

export function setTokens(event: RequestEvent, access: string, refresh: string) {
	event.cookies.set('refresh_token', refresh, {
		httpOnly: true,
		sameSite: 'lax',
		path: '/',
		maxAge: 34560000
	});
	event.cookies.set('access_token', access, {
		httpOnly: true,
		sameSite: 'lax',
		path: '/',
		maxAge: 34560000
	});
}
