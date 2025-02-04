import { redirect } from '@sveltejs/kit';

import { createAuthClient } from '$lib/auth.server.js';

export async function GET(event) {
	const authClient = createAuthClient(event);
	const { url } = await authClient.authorize(`${event.url.origin}/callback`, 'code');
	redirect(302, url);
}
