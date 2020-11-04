import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';

const PetJobs = ({ month, year }) => {
  const [petdays, setPetdays] = useState([]);
  const [pets, setPets] = useState([]);

  const getPetdays = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8888/api/admin/petdays/${month}/${year}`
      );
      const jsonData = await response.json();
      console.log(jsonData);
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
      console.log(jsonData);
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
        Total pet days in month:
        {petdays.map((row, i) => (
          <div key={i}>{row.days}</div>
        ))}
      </h3>
      <Button variant="contained" value="pets" onClick={getPets}>
        Pets cared for
      </Button>
      <h3>
        Pets in month: {pets.length}
        {pets.map((row, i) => (
          <div key={i}>{row.pet_name}</div>
        ))}
      </h3>
    </Fragment>
  );
};

export default PetJobs;
