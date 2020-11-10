import axios from 'axios';
import api from '../api';

export const fetchPets = async(username) => {
    const resp = await axios.get(api.getPet(username));
    return resp;
}

export const updatePet = async (data) => {
    const { pet_name, category, pname, care_req, image } = data;
    const resp = await axios.put(api.updatePet(pname, pet_name), null, { params: {
        category: category,
        care_req: care_req,
        image: image
    }});
    return resp; 
}

export const getPetCategories = async () => {
    const resp = await axios.get(api.getPetCategories);
    return resp;
}

export const deletePet = async (data) => {
    const { pname, pet_name } = data;
    const resp = await axios.delete(api.deletePet(pname, pet_name));
    return resp
}

export const createPet = async (data) => {
    const { petName, category, pname, care_req, image } = data;
    const resp = await axios.post(api.createPet(pname), null, { params: {
        petName: petName,
        category: category,
        care_req: care_req,
        image: image
    }});
    return resp;
}