import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';

const Salary = ({ month, year }) => {
  const [data, setData] = useState([]);
  const [salary, setSalary] = useState([]);
  const [revenue, setRevenue] = useState([]);

  const getSalary = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8888/api/admin/revenue/${month}/${year}`
      );
      const jsonData = await response.json();
      setData(jsonData);
      var sumSalary = 0;
      var sumRevenue = 0;
      jsonData.forEach(element => {
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
          <li key={i}>{row.cname} : {row.salary}</li>
        ))}
      </h3>
      <h3>Total salary: {salary}</h3>
      <h3>Total revenue: {revenue}</h3>
      <h3>Total profit: {revenue - salary}</h3>
    </Fragment>
  );
};

export default Salary;
