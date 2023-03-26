import axios from 'axios';
import { APP_CONFIG } from '../../Config';

export async function getStuff(token: string) {
    const res = await axios.get(APP_CONFIG.REACT_APP_GATEWAY_URL + '/weather', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}
