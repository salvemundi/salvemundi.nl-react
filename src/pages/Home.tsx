import React, { useEffect, useState } from 'react';
import { Alert } from 'reactstrap';
import './Home.scss';
import {
    AuthenticatedTemplate,
    UnauthenticatedTemplate,
    useIsAuthenticated,
} from '@azure/msal-react';
import { setCookie, tokenFromCookies } from '../auth/authProvider';
import { getStuff } from '../api/gateway';
import LogoutButton from '../components/misc/LogoutButton';
import LoginButton from '../components/misc/LoginButton';

const Home = () => {
    const [data, setData] = useState(null);
    const isAuthenticated = useIsAuthenticated();

    useEffect(() => {
        if (isAuthenticated) {
            setCookie();
            tokenFromCookies().then((a) => {
                getStuff(a).then(setData);
            });
        }
    }, [isAuthenticated]);

    return (
        <>
            <div className="container-home">
                <Alert color="primary">Salve Mundi alert</Alert>
            </div>
            <div className="App">
                <AuthenticatedTemplate>
                    <LogoutButton />
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                    <LoginButton />
                    <p>You are not signed in! Please sign in.</p>
                </UnauthenticatedTemplate>
            </div>
        </>
    );
};

export default Home;
