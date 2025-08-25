import { intuitOAuthClient } from '$lib/utilities/intuitConnection.mjs';
import { user } from '$lib/utilities/user';

import OAuthClient from 'intuit-oauth';

export function GET(event) {
    // If the user already has a valid session, skip the Intuit auth and go directly to the app.
    if (event.locals.session){
        return new Response(null, {
            status: 302,
            headers: {
                Location: '/import'
            }
        });
    }

    var authorizationUrl = intuitOAuthClient.authorizeUri({ scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId, OAuthClient.scopes.Email ], state: 'expected-state' });
    return new Response(null, {
        status: 302,
        headers: {
            Location: authorizationUrl
        }
    });
}