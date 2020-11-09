import React, { Fragment, useState } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Pets from './Pets';
import WorkDays from './WorkDays';
import Months from './Months';
import Salary from './Salary';
import Underperform from './Underperform';

const Admin = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

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
      <form className={classes.root} noValidate autoComplete="off">
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
      <Grid container spacing={3}>
        <Pets month={month} year={year} />
        <Salary month={month} year={year} />
      </Grid>

      {/* <Months year={year} />
      <Underperform month={month} year={year} /> */}
    </Fragment>
  );
};

export default Admin;
