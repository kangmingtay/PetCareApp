import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PetJobs from './PetJobs';
import Months from './Months';
import Salary from './Salary';
import Underperform from './Underperform';

const Jobs = () => {
  const [name, setName] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const [salary, setSalary] = useState({ results: [] });

  const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch'
      }
    }
  }));
  const classes = useStyles();

  return (
    <Fragment>
      <h3>
        Salary
        {salary.results.map((row, i) => (
          <div key={i}>{row.salary}</div>
        ))}
      </h3>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Employee name:"
          onChange={e => setName(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Month:"
          onChange={e => setMonth(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Year:"
          onChange={e => setYear(e.target.value)}
        />
      </form>
      <PetJobs month={month} year={year} />
      <Months year={year} />
      <Salary name={name} month={month} year={year} />
    </Fragment>
  );
};

export default Jobs;
