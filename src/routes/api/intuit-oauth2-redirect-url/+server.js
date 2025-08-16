// https://developer.intuit.com/app/developer/qbo/docs/develop/authentication-and-authorization/oauth-2.0

// https://appcenter.intuit.com/app/connect/oauth2/authorize?client_id=ABZbmhpDTZaQfqp5ILnYLCIoHu2hEEhDmyfpX75VjexlVc0pMg&scope=com.intuit.quickbooks.accounting&redirect_uri=https://developer.intuit.com/v2/OAuth2Playground/RedirectUrl&response_type=code&state=PlaygroundAuth&realm_id=9341453542352650&locale=en-us

// production configuration: https://developer.api.intuit.com/.well-known/openid_configuration
// sandbox config: https://developer.api.intuit.com/.well-known/openid_sandbox_configuration

export function GET(){
    return new Response(4, {
        'Content-Type': 'application/json'
    });
}