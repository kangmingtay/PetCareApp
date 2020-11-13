import axios from 'axios';
import api from '../api';

export const fetchAllPreferences = async (data) => {
    const resp = await axios.get(api.getAllCareTakerPreferences);
    return resp;
}

export const fetchSingleCareTakerPreferences = async (username) => {
    const resp = await axios.get(api.getCareTakerPreference(username));
    return resp;
}

export const updateSingleCareTakerPreferences = async (data) => {
    let { username, categories } = data;
    console.log(categories);
    const resp = await axios.post(api.createCareTakerPreference(username), {
        categories: categories
    });
    console.log(resp);
    return resp;
}

export const fetchExpectedSalary = async (data) => {
    let { username, month } = data;
    const resp = await axios.get(api.getExpectedSalary(username), {
        params: {
            month: month
        }
    });
    return resp;
}

export const deleteNotWorkingDays = async (data) => {
    let { username, dates } = data;
    const resp = await axios.delete(api.deleteNotWorking(username), {
        params: {
            dates: dates
        }
    });
    return resp;
}

export const postNotWorkingDays = async (data) => {
    let { username, dates } = data;
    const resp = await axios.post(api.postNotWorking(username), {
        dates: dates
    });
    return resp;
}

export const fetchCareTakerCalendar = async (data) => {
    let { username, month } = data;
    const resp = await axios.get(api.getCareTakerCalendar(username), {
        params: {
            month: month
        }
    });
    return resp;
}

export const fetchCareTakerNotWorking = async (data) => {
    let { username, month } = data;
    const resp = await axios.get(api.getLeaves(username), {
        params: {
            month: month
        }
    });
    return resp;
}

export const fetchCareTakerRating = async (username) => {
    const resp = await axios.get(api.getCareTakerRating(username));
    return resp;
}
