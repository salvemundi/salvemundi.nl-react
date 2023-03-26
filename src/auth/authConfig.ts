import { Configuration } from '@azure/msal-browser';
import { APP_CONFIG } from '../../Config';

export const msalConfig: Configuration = {
    auth: {
        clientId: APP_CONFIG.REACT_APP_CLIENT_ID,
        authority: 'https://login.microsoftonline.com/' + APP_CONFIG.REACT_APP_TENANT,
        redirectUri: APP_CONFIG.REACT_APP_REDIRECT_URL,
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false,
    },
};
