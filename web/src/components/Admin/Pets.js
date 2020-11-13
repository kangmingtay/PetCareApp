import React, { Fragment, useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { fetchAllDays, fetchPets } from '../../../src/calls/adminCalls';
import AdminCard from './AdminCard';

const Pets = ({ month, year }) => {
  const [allDays, setAllDays] = useState();
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const getAllDays = async () => {
      try {
        const response = await fetchAllDays({ month: month + 1, year: year });
        setAllDays([...response.data.results[0].days]);
      } catch (err) {
        console.error(err.message);
      }
    };

    const getPets = async () => {
      try {
        const response = await fetchPets({ month: month, year: year });
        setPets([...response.data.results]);
      } catch (err) {
        console.error(err.message);
      }
    };

    getAllDays();
    getPets();
  }, [month, year]);

  return (
    <Fragment>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <AdminCard heading="Total Work Days" value={allDays} />
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <AdminCard heading="Number of Pets Cared For" value={pets.length} />
      </Grid>
    </Fragment>
  );
};

export default Pets;
