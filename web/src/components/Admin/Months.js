import React, { Fragment, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { fetchAllDays } from 'src/calls/adminCalls';

const Months = ({ year }) => {
  const [busyMonth, setBusyMonth] = useState([]);

  const getMonth = async e => {
    e.preventDefault();
    try {
      var monthList = [];
      for (var i = 1; i <= 12; i++) {
        const response = await fetchAllDays({ month: i, year: year });
        monthList[i] = response.data.results[0].days;
      }
      var maxDays = 0;
      var maxMonth = [];
      for (var i = 1; i <= 12; i++) {
        var days = parseInt(monthList[i]);
        if (maxDays < days) {
          maxDays = days;
          maxMonth = [];
          maxMonth.push(i);
        } else if (maxDays === days) {
          maxMonth.push(i);
        }
      }
      setBusyMonth(maxMonth);
    } catch (err) {
      console.error(err.message);
    }
  };

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
