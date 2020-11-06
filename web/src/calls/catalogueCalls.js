import axios from 'axios';
import api from '../api';
import { format } from 'date-fns';


export const fetchListOfCareTakers = async(data) => {
    let { startDate, endDate, petCategoryField, careTakerField, pName, addressField, petNameField } = data;
    
    startDate = format(new Date(startDate), 'dd/MM/yyyy');
    endDate = format(new Date(endDate), 'dd/MM/yyyy');
    petCategoryField = petCategoryField === '' ? '%' : petCategoryField;
    careTakerField = careTakerField === '' ? '%' : careTakerField;
    addressField = addressField === '' ? '%' : addressField;
    console.log(startDate, endDate, petCategoryField, careTakerField, pName, addressField, petNameField);
    const resp = await axios.get(api.getListOfValidCareTakers, {params: {
        startDate: startDate,
        endDate: endDate,
        petCategory: petCategoryField,
        cName: careTakerField,
        pName: pName,
        address: addressField,
        petName: petNameField,
      }
    } );
    return resp;
}

export const fetchListOfValidPets = async(data) => {
  let { startDate, endDate, pName } = data;
  startDate = format(new Date(startDate), 'dd/MM/yyyy');
  endDate = format(new Date(endDate), 'dd/MM/yyyy');
  console.log(startDate, endDate, pName);
  const resp = await axios.get(api.getPetsForDateRange(pName), {params: {
      startDate: startDate,
      endDate: endDate,
    }
  } );
  return resp;
}

export const insertNewBid = async(data) => {
  let { startDate, endDate, pName, petNameField, paymentAmt, transactionType, cName } = data;
  startDate = format(new Date(startDate), 'dd/MM/yyyy');
  endDate = format(new Date(endDate), 'dd/MM/yyyy');
  console.log('insertBid', startDate, endDate, pName, petNameField, paymentAmt, transactionType, cName);
  const resp = await axios.post(api.insertBid(cName), {
    startDate: startDate,
    endDate: endDate,
    pName: pName,
    petName: petNameField,
    paymentAmt: paymentAmt,
    transactionType: transactionType,
  });
  return resp;
}

