import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import { fetchRevenue } from 'src/calls/adminCalls';

const Salary = ({ month, year }) => {
  const [data, setData] = useState([]);
  const [salary, setSalary] = useState([]);
  const [revenue, setRevenue] = useState([]);

  const getSalary = async e => {
    e.preventDefault();
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
      <Button variant="contained" value="salary" onClick={getSalary}>
        Get salary and revenue
      </Button>
      <h3>
        Salary for each caretaker:
        {data.map((row, i) => (
          <li key={i}>
            {row.cname} : {row.salary}
          </li>
        ))}
      </h3>
      <h3>Total salary: {salary}</h3>
      <h3>Total revenue: {revenue}</h3>
      <h3>Total profit: {revenue - salary}</h3>
    </Fragment>
  );
};

export default Salary;
