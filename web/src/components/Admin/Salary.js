import React, { Fragment, useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { fetchRevenue } from 'src/calls/adminCalls';
import AdminCard from './AdminCard';

const Salary = ({ month, year }) => {
  const [salary, setSalary] = useState([]);
  const [revenue, setRevenue] = useState([]);

  useEffect(() => {
    const getSalary = async () => {
      try {
        const response = await fetchRevenue({ month: month, year: year });
        var results = [...response.data.results];
        var sumSalary = 0;
        var sumRevenue = 0;
        sumSalary = parseInt(results[0].salary);
        sumRevenue = parseInt(results[0].revenue);
        setSalary(sumSalary);
        setRevenue(sumRevenue);
      } catch (err) {
        console.error(err.message);
      }
    };
    getSalary();
  }, [month, year]);

  return (
    <Fragment>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <AdminCard heading="Total Caretaker Cost" value={'$' + salary} />
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <AdminCard heading="Total Revenue" value={'$' + revenue} />
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <AdminCard heading="Profit" value={'$' + (revenue - salary)} />
      </Grid>
    </Fragment>
  );
};

export default Salary;
