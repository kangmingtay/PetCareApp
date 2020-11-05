import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';

const PetJobs = ({ month, year }) => {
  const [petdays, setPetdays] = useState([0]);
  const [pets, setPets] = useState([]);

  const getPetdays = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8888/api/admin/petdays/${month}/${year}`
      );
      const jsonData = await response.json();
      setPetdays(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getPets = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8888/api/admin/pets/${month}/${year}`
      );
      const jsonData = await response.json();
      setPets(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Button variant="contained" value="pets" onClick={getPetdays}>
        Number of pet days
      </Button>
      <h3>
        Total pet days in month: {petdays[0].days}
        {/* {petdays.map((row, i) => (
          <div key={i}>{row.days}</div>
        ))} */}
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

export default PetJobs;
