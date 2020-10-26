import axios from 'axios';
import api from '../api';

export const fetchLoginInfo = async(data) => {
    const { username, password, isAdmin } = data;
    const resp = await axios.post(api.getLoginInfo, {
        username: username,
        password: password,
        isAdmin: isAdmin,
    });
    return resp;
}

export const createUserAccount = async(data) => {
    const { username, password, email, isAdmin } = data;
    const resp = await axios.post(api.createUser, {
        username: username,
        password: password,
        email: email,
        isAdmin: isAdmin,
    });
    return resp;
}

