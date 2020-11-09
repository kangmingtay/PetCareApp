import React, { Fragment, useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { fetchRevenue } from 'src/calls/adminCalls';
import AdminCard from './AdminCard';

const Salary = ({ month, year }) => {
  const [data, setData] = useState([]);
  const [salary, setSalary] = useState([]);
  const [revenue, setRevenue] = useState([]);

  useEffect(() => {
    getSalary();
  }, [month, year]);

  const getSalary = async () => {
    try {
      const response = await fetchRevenue({ month: month, year: year });
      var results = [...response.data.results];
      setData(results);
      var sumSalary = 0;
      var sumRevenue = 0;
      results.forEach(element => {
        sumSalary += parseInt(element.salary);
        sumRevenue += parseInt(element.revenue);
      });
      setSalary(sumSalary);
      setRevenue(sumRevenue);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      {/* <Button variant="contained" value="salary" onClick={getSalary}>
        Get salary and revenue
      </Button>
      <h3>
        Salary for each caretaker:
        {data.map((row, i) => (
          <li key={i}>
            {row.cname} : {row.salary}
          </li>
        ))}
      </h3> */}
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
