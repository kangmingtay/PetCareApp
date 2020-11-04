import axios from 'axios';
import api from '../api';
import { format } from 'date-fns';


export const fetchListOfCareTakers = async(data) => {
    let { startDate, endDate, petCategoryField, careTakerField, pName, addressField } = data;
    
    startDate = format(new Date(startDate), 'dd/MM/yyyy');
    endDate = format(new Date(endDate), 'dd/MM/yyyy');
    petCategoryField = petCategoryField === '' ? '%' : petCategoryField;
    careTakerField = careTakerField === '' ? '%' : careTakerField;
    addressField = addressField === '' ? '%' : addressField;
    console.log(startDate, endDate, petCategoryField, careTakerField, pName, addressField);
    const resp = await axios.get(api.getListOfValidCareTakers, {params: {
        startDate: startDate,
        endDate: endDate,
        petCategory: petCategoryField,
        cName: careTakerField,
        pName: pName,
        address: addressField,
      }
    } );
    return resp;
}

