import * as msal from '@azure/msal-browser';
import Cookies from 'universal-cookie';
import { msalConfig } from './authConfig';
import { APP_CONFIG } from '../../Config';

const msalInstance = new msal.PublicClientApplication(msalConfig);
const account = msalInstance.getAllAccounts()[0];
const cookies = new Cookies();
const scopes = APP_CONFIG.REACT_APP_SCOPES.split(',').map(
    (s) => `${APP_CONFIG.REACT_APP_AZURE_API_URL}/${s}`
);

export function tokenToCookie(token: string) {
    cookies.set('token', token, { path: '/' });
}

export async function tokenFromCookies(): Promise<string> {
    await setCookie();
    return cookies.get('token');
}

export async function setCookie() {
    await msalInstance
        .acquireTokenSilent({
            scopes,
            account,
        })
        .then((res) => cookies.set('token', res.accessToken))
        .catch(async (error) => {
            await msalInstance
                .handleRedirectPromise()
                .then((s) => {
                    if (s !== null) cookies.set('token', s.accessToken);
                })
                .catch((a: any) => {});
        });
}

export function logout() {
    cookies.remove('token');

    msalInstance.logoutRedirect({
        onRedirectNavigate: (url) => {
            // Return false if you would like to stop navigation after local logout
            return false;
        },
    });
}

export async function login(): Promise<any> {
    return await msalInstance
        .acquireTokenSilent({
            scopes,
            account,
        })
        .then((res) => cookies.set('token', res.accessToken))
        .catch(async (error) => {
            msalInstance
                .handleRedirectPromise()
                .then((s) => {
                    msalInstance.loginRedirect({ scopes, account });
                    cookies.set('token', s.accessToken);
                })
                .catch((a: any) => {});
        });
}

export default msalInstance;
