import { parse } from 'cookie';
import { redirect } from '@sveltejs/kit';
import { user } from '$lib/utilities/user.mjs';

// The /import path is considered the "app." Therefore, we should run middleware to make sure that the user has a valid session before resolving.
// If they do not have a valid session, they should be redirected to the homepage.

export async function handle({ event, resolve }) {
    const cookies = parse(event.request.headers.get('cookie') || '');
    event.locals.session = await user.getSession(cookies?.session_token?.split('.')[0]);
    
    if (event.url.pathname.startsWith('/import') && !event.locals.session) {
        throw redirect(302, '/api/intuit-authorization');
    }
    
    return resolve(event);
}

