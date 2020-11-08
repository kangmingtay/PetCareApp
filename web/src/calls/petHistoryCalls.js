import axios from 'axios';
import api from '../api';
import { format } from 'date-fns';

export const getReviewAndRating = async(data) => {
  let { pname, currDate } = data;
  currDate = format(new Date(currDate), 'dd/MM/yyyy');
  const resp = await axios.get(api.getReviewAndRating(pname), {params: {
    currDate: currDate,
  }} );
  return resp;
}

export const updateReviewAndRating = async(data) => {
  let { pname, pet_name, cname, startDate, endDate, rating, review } = data;
  startDate = format(new Date(startDate), 'dd/MM/yyyy');
  endDate = format(new Date(endDate), 'dd/MM/yyyy');
  console.log(pname, pet_name, cname, startDate, endDate, rating, review);
  const resp = await axios.put(api.updateReviewAndRating(pname), {
    review: review,
    rating: rating,
    cname: cname,
    pet_name: pet_name,
    start_date: startDate,
    end_date: endDate,
  });
  return resp;
}