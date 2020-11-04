import axios from 'axios';
import api from '../api';

export const fetchAllUsersInfo = async(data) => {
    const { offset, limit, sort_category, sort_direction } = data;
    const resp = await axios.get(api.getAllUsers, { params: {
        offset: offset,
        limit: limit,
        sort_category: sort_category,
        sort_direction: sort_direction
    }});
    return resp;
}

export const fetchSingleUserInfo = async(username) => {
    const resp = await axios.get(api.getUser(username));
    return resp;
}

export const updateSingleUserInfo = async(data) => {
    const { username, email, address} = data;
    const resp = await axios.put(api.updateUser(username), {
        email: email,
        address: address
    });
    return resp;
}