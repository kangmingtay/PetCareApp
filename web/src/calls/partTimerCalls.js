import axios from 'axios';
import api from '../api';

export const createPartTimer = async(username) => {
    const resp = await axios.post(api.createPartTimer, {
        username: username 
    });
    return resp;
}