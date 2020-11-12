import React, { Fragment, useState } from 'react';
import { Container, makeStyles, Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Pets from './Pets';
// import Months from './Months';
import Salary from './Salary';
import Chart from './AdminChart';
import CaretakerTable from './CaretakerTable';

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
      <Container maxWidth={false}>
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
      </Container>
      <Chart month={month} year={year} />
      <Typography variant="h4" align="center">
        Caretakers
      </Typography>
      <CaretakerTable month={month} year={year} />
      {/* <Months year={year} /> */}
    </Fragment>
  );
};

export default Admin;
