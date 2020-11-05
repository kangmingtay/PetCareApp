import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';

const Months = ({ year }) => {
  const [busyMonth, setBusyMonth] = useState([]);

  const getMonth = async e => {
    e.preventDefault();
    try {
      var monthList = [];
      for (var i = 1; i <= 12; i++) {
        const response = await fetch(
          `http://localhost:8888/api/admin/petdays/${i}/${year}`
        );
        const jsonData = await response.json();
        monthList[i] = jsonData;
      }
      getBusiestMonth(monthList);
    } catch (err) {
      console.error(err.message);
    }
  };

  async function getBusiestMonth(monthList) {
    var maxDays = 0;
    var maxMonth = [];
    for (var i = 1; i <= 12; i++) {
      var days = parseInt(monthList[i].map(row => row.days)[0]);
      if (maxDays < days) {
        maxDays = days;
        maxMonth = [];
        maxMonth.push(i);
      } else if (maxDays === days) {
        maxMonth.push(i);
      }
    }
    setBusyMonth(maxMonth);
  }

  return (
    <Fragment>
      <Button variant="contained" value="month" onClick={getMonth}>
        Get month with the most of jobs
      </Button>
      <h3>
        Month with most jobs:
        {busyMonth.map((row, i) => (
          <li key={i}>{row}</li>
        ))}
      </h3>
    </Fragment>
  );
};

export default Months;
