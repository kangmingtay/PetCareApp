import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';

const Underperform = ({ month, year }) => {
  const [caretakers, setCaretakers] = useState([]);
  const [lazy, setLazy] = useState([]);
  const [cheap, setCheap] = useState([]);
  const [useless, setuseless] = useState([]);

  const getCaretakers = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8888/api/admin/bids/${month}/${year}`
      );
      const jsonData = await response.json();
      setCaretakers(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Button variant="contained" value="caretaker" onClick={getCaretakers}>
        Get lazy caretakers
      </Button>
      <h3>
        Less than 30 pet days:
        {caretakers.map((row, i) => (
          <div key={i}>{row.cname}</div>
        ))}
      </h3>
      <h3>
        Revenue brought in less than $3000:
        {caretakers.map((row, i) => (
          <div key={i}>{row.cname}</div>
        ))}
      </h3>
      <h3>
        Rating less than 3:
        {caretakers.map((row, i) => (
          <div key={i}>{row.cname}</div>
        ))}
      </h3>
    </Fragment>
  );
};

export default Underperform;
