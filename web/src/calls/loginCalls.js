import axios from 'axios';
import api from '../api';

export const fetchLoginInfo = async(username, password) => {
    const resp = await axios.post(api.getLoginInfo, {
        username: username,
        password: password,
    });
    return resp;
}

export const createUserAccount = async(username, password, email) => {
    const resp = await axios.post(api.createUser, {
        username: username,
        password: password,
        email: email,
    });
    return resp;
}

