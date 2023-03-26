import { logout } from '../../auth/authProvider';
import React from 'react';

export default function LogoutButton() {
    return (
        <button value="Logout" onClick={logout}>
            Logout
        </button>
    );
}
