import React, { Fragment, useState, useEffect } from 'react';
import { Container, makeStyles, Grid, Typography } from '@material-ui/core';
import Pets from './Pets';
import Salary from './Salary';
import AdminChart from './AdminChart';
import SelectMonth from './SelectMonth';
import CaretakerTable from './CaretakerTable';

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
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const classes = useStyles();

  useEffect(() => {
    const date = new Date();
    setMonth(month === '' ? date.getMonth() : parseInt(month));
    setYear(year === '' ? date.getFullYear() : parseInt(year));
  }, [month, year]);

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
      <CaretakerTable month={month} year={year} />
    </Fragment>
  );
};

export default Admin;
