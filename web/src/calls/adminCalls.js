import axios from 'axios';
import api from '../api';

export const fetchAllDays = async data => {
  const { month, year } = data;
  const resp = await axios.get(api.getAllDays, {
    params: {
      month: month,
      year: year
    }
  });
  return resp;
};

export const fetchPetDays = async data => {
  const { month, year } = data;
  const resp = await axios.get(api.getPetDays, {
    params: {
      month: month,
      year: year
    }
  });
  return resp;
};

export const fetchPets = async data => {
  const { month, year } = data;
  const resp = await axios.get(api.getPets, {
    params: {
      month: month,
      year: year
    }
  });
  return resp;
};


export const fetchRevenue = async data => {
    const { month, year } = data;
    const resp = await axios.get(api.getRevenue, {
      params: {
        month: month,
        year: year
      }
    });
    return resp;
  };

  export const fetchRating = async () => {
    const resp = await axios.get(api.getRating);
    return resp;
  };
  
  