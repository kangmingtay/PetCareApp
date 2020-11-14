import React, { Fragment, useState, useEffect } from 'react';
import { Container, makeStyles, Grid, Typography } from '@material-ui/core';
import Pets from './Pets';
import Salary from './Salary';
import AdminChart from './AdminChart';
import SelectMonth from './SelectMonth';
import CaretakerTable from './CaretakerTable';
import CaretakerPieChart from './CaretakerPieChart';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const monthList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const Admin = () => {
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());

  const classes = useStyles();

  return (
    <Fragment>
      <SelectMonth
        month={month}
        year={year}
        setMonth={setMonth}
        setYear={setYear}
        monthList={monthList}
      />
      <Container maxWidth={false} className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <AdminChart month={month} year={year} monthList={monthList} />
          </Grid>
          <Grid item xs={3}>
            <Grid container spacing={3} direction="column">
              <Pets month={month} year={year} />
              <Salary month={month} year={year} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Typography variant="h4" align="center">
        Caretakers
      </Typography>
      <CaretakerTable month={month} year={year} />
    </Fragment>
  );
};

export default Admin;
