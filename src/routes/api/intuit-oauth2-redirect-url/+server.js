// https://developer.intuit.com/app/developer/qbo/docs/develop/authentication-and-authorization/oauth-2.0

// https://appcenter.intuit.com/app/connect/oauth2/authorize?client_id=ABZbmhpDTZaQfqp5ILnYLCIoHu2hEEhDmyfpX75VjexlVc0pMg&scope=com.intuit.quickbooks.accounting&redirect_uri=https://developer.intuit.com/v2/OAuth2Playground/RedirectUrl&response_type=code&state=PlaygroundAuth&realm_id=9341453542352650&locale=en-us

// production configuration: https://developer.api.intuit.com/.well-known/openid_configuration
// sandbox config: https://developer.api.intuit.com/.well-known/openid_sandbox_configuration

// Goal: Set an authorization cookie, and redirect the user to the app.
// /api/intuit-oauth2-redirect-url
import { createIntuitOAuthClient } from '$lib/utilities/intuitConnection.mjs';
import { execute } from '$lib/utilities/databaseExecutor.mjs';

import { user } from '$lib/utilities/user.mjs';

export async function GET({ request, url }){
    const parseRedirect = request.url,
        realmId = url.searchParams.get('realmId'),
        intuitOAuthClient = createIntuitOAuthClient(),
        authResponse = await intuitOAuthClient.createToken(parseRedirect),
        intuitToken = authResponse.getJson();

        // If Intuit sign in is successful.
        if (intuitToken.token_type === 'bearer'){
            const userInfo = await intuitOAuthClient.getUserInfo();
            // sub is an ID that is unique accross all Intuit products. 36 char string.
            const { sub, email, emailVerified } = userInfo.json;
            
            const token = await user.createSession({ intuitSubId: sub, userEmail: email});
            
            await execute({
                sql: `INSERT INTO User (intuitSubId, email, emailVerified, bearerAuth, refreshToken, bearerAuthExpiration, refreshTokenExpiration) VALUES (?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    intuitSubId = VALUES(intuitSubId),
                    email = VALUES(email),
                    emailVerified = VALUES(emailVerified),
                    bearerAuth = VALUES(bearerAuth),
                    refreshToken = VALUES(refreshToken),
                    bearerAuthExpiration = VALUES(bearerAuthExpiration),
                    refreshTokenExpiration = VALUES(refreshTokenExpiration)
                `,
                values: [sub, email, emailVerified, intuitToken.access_token, intuitToken.refresh_token, new Date(Date.now() + intuitToken.expires_in * 1000), new Date(Date.now() + intuitToken.x_refresh_token_expires_in * 1000)]
            });
            return new Response(null, {
                status: 302,
                headers: {
                    'Set-Cookie': `session_token=${token}; Max-Age=${60 * 60 * 24 * 60 /*60 days*/}; HttpOnly; Secure; Path =/; SameSite=Lax`,
                    'Location': '/?success=true'
                }
            });
        } else {
            return new Response(null, {
                status: 302,
                headers: {
                    'Location': '/?success=false'
                }
            });
        }
}
