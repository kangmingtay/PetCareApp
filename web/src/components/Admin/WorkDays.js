import React, { useState, useEffect } from 'react';
import { fetchAllDays } from 'src/calls/adminCalls';
import AdminCard from './AdminCard';

const WorkDays = ({ month, year }) => {
  const [allDays, setAllDays] = useState();

  useEffect(() => {
    getAllDays();
  });

  const getAllDays = async () => {
    try {
      const response = await fetchAllDays({ month: month, year: year });
      console.log(...response.data.results[0].days);
      setAllDays([...response.data.results[0].days]);
    } catch (err) {
      console.error(err.message);
    }
  };

  return <AdminCard heading="Total Work Days" value={allDays} />;
};
export default WorkDays;
