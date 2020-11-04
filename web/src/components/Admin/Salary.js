import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';

const Salary = ({ name, month, year }) => {
  const [salary, setSalary] = useState({"results" : [] });

  const getSalary = async e => {
    e.preventDefault();
    try {
      const monthYear = "month=" + month + '-' + year;
      const response = await fetch(
        `http://localhost:8888/api/caretaker/expectedSalary/${name}?${monthYear}`
      );
      const jsonData = await response.json();
      console.log(jsonData.results);
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
        Salary for {name}: 
        {salary.results.map((row, i) => (
          <div key={i}>{row.salary}</div>
        ))}
      </h3>
    </Fragment>
  );
};

export default Salary;
