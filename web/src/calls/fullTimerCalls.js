import axios from 'axios';
import api from '../api';

export const createFullTimer = async(username) => {
    const resp = await axios.post(api.createFullTimer, {
        username: username 
    });
    return resp;
}