import React from 'react';
import { login } from '../../auth/authProvider';

export default function LoginButton() {
    return (
        <button value="login" onClick={login}>
            Login
        </button>
    );
}
