import OAuthClient from 'intuit-oauth';
import { INTUIT_CLIENT_ID, INTUIT_REDIRECT_URI, INTUIT_STAGE, INTUIT_CLIENT_SECRET } from '$env/static/private';

const createIntuitOAuthClient = (tokenData = null) => {
    return new OAuthClient({
        clientId: INTUIT_CLIENT_ID,
        clientSecret: INTUIT_CLIENT_SECRET,
        environment: INTUIT_STAGE,
        redirectUri: INTUIT_REDIRECT_URI,
        token: tokenData  // Pass user-specific token data
    });
}

const intuitOAuthClient = new OAuthClient({
    clientId: INTUIT_CLIENT_ID,
    clientSecret: INTUIT_CLIENT_SECRET,
    environment: INTUIT_STAGE,
    redirectUri: INTUIT_REDIRECT_URI
});

export { intuitOAuthClient, createIntuitOAuthClient };