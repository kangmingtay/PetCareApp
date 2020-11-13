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
          <Pets month={month} year={year} />
          <Salary month={month} year={year} />
        </Grid>
      </Container>
      <AdminChart month={month} year={year} monthList={monthList} />
      <Typography variant="h4" align="center">
        Caretakers
      </Typography>
      <CaretakerPieChart month={month} year={year} />
      {/* <CaretakerTable month={month} year={year} /> */}
    </Fragment>
  );
};

export default Admin;
