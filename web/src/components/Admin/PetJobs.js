import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import { fetchAllDays, fetchPets  } from 'src/calls/adminCalls'

const Pets = ({ month, year }) => {
  const [allDays, setAllDays] = useState();
  const [pets, setPets] = useState([]);

  const getAllDays = async e => {
    e.preventDefault();
    try {
      const response = await fetchAllDays({ month: month, year: year});
      setAllDays([...response.data.results[0].days]);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getPets = async e => {
    e.preventDefault();
    try {
      const response = await fetchPets({ month: month, year: year});
      setPets([...response.data.results]);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Button variant="contained" value="pets" onClick={getAllDays}>
        Number of pet days
      </Button>
      <h3>
        Total pet days in month: {allDays}
      </h3>
      <Button variant="contained" value="pets" onClick={getPets}>
        Pets cared for
      </Button>
      <h3>
        Pets in month: {pets.length}
        {pets.map((row, i) => (
          <li key={i}>{row.pet_name}</li>
        ))}
      </h3>
    </Fragment>
  );
};

export default Pets;
