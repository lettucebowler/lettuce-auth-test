import { sequence } from '@sveltejs/kit/hooks';
import { type Handle, type RequestEvent } from '@sveltejs/kit';
import { createAuthClient } from '$lib/auth.server';
import { subjects } from '$lib/auth.server';

const authHandler: Handle = async ({ event, resolve }) => {
	const authClient = createAuthClient(event);
	const verified = await authClient.verify(subjects, event.cookies.get('access_token')!, {
		refresh: event.cookies.get('refresh_token') || undefined
	});
	console.log('verified', verified);
	return await resolve(event);
};

export const handle = sequence(authHandler);
