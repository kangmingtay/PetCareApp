import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';

const Salary = ({ month, year }) => {
  const [salary, setSalary] = useState([]);

  const getSalary = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8888/api/admin/revenue/${month}/${year}`
      );
      const jsonData = await response.json();
      setSalary(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Button variant="contained" value="salary" onClick={getSalary}>
        Get salary for care taker
      </Button>
      <h3>
        Salary for each caretaker:
        {salary.map((row, i) => (
          <div key={i}>{row.salary}</div>
        ))}
      </h3>
    </Fragment>
  );
};

export default Salary;
