import { INTUIT_CLIENT_ID, INTUIT_REDIRECT_URI, INTUIT_SCOPE } from '$env/dynamic/private';
// https://appcenter.intuit.com/app/connect/oauth2/authorize?client_id=ABZbmhpDTZaQfqp5ILnYLCIoHu2hEEhDmyfpX75VjexlVc0pMg&scope=com.intuit.quickbooks.accounting&redirect_uri=https://developer.intuit.com/v2/OAuth2Playground/RedirectUrl&response_type=code&state=PlaygroundAuth
/** @type {import('./$types').PageLoad} */
export function load() {
    return {
        authorizationUrl: `https://appcenter.intuit.com/app/connect/oauth2/authorize?client_id=${INTUIT_CLIENT_ID}&scope=${INTUIT_SCOPE}&redirect_uri=${INTUIT_REDIRECT_URI}&response_type=code&state=expected_state`
    };
}
 