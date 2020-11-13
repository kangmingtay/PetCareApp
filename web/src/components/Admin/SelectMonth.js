import React from 'react';
import {
  Box,
  Card,
  makeStyles,
  Grid,
  Typography,
  Container
} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  text: {
    margin: theme.spacing(1),
    padding: theme.spacing(2)
  }
}));

const SelectMonth = props => {
  const classes = useStyles();
  const [month, setMonth] = React.useState('');
  const [year, setYear] = React.useState('');
  const date = new Date().getFullYear();

  const handleChangeMonth = event => {
    props.setMonth(event.target.value);
    setMonth(event.target.value);
  };
  const handleChangeYear = event => {
    props.setYear(event.target.value);
    setYear(event.target.value);
  };

  return (
    <Container maxWidth={false}>
      <Box mt={3}>
        <Card>
          <Grid container className={classes.root} justify="space-between">
            <Grid item>
              <Typography
                className={classes.text}
                variant="h5"
                color="textPrimary"
              >
                Summary for the month of {props.monthList[props.month]}
              </Typography>
            </Grid>
            <Grid item>
              <div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="month-label">Month</InputLabel>
                  <Select
                    labelId="month-label"
                    id="month-id"
                    value={month}
                    onChange={handleChangeMonth}
                    label="month"
                  >
                    <MenuItem value="">
                      <em>Current</em>
                    </MenuItem>
                    <MenuItem value={0}>{props.monthList[0]}</MenuItem>
                    <MenuItem value={1}>{props.monthList[1]}</MenuItem>
                    <MenuItem value={2}>{props.monthList[2]}</MenuItem>
                    <MenuItem value={3}>{props.monthList[3]}</MenuItem>
                    <MenuItem value={4}>{props.monthList[4]}</MenuItem>
                    <MenuItem value={5}>{props.monthList[5]}</MenuItem>
                    <MenuItem value={6}>{props.monthList[6]}</MenuItem>
                    <MenuItem value={7}>{props.monthList[7]}</MenuItem>
                    <MenuItem value={8}>{props.monthList[8]}</MenuItem>
                    <MenuItem value={9}>{props.monthList[9]}</MenuItem>
                    <MenuItem value={10}>{props.monthList[10]}</MenuItem>
                    <MenuItem value={11}>{props.monthList[11]}</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="year-label">Year</InputLabel>
                  <Select
                    labelId="year-label"
                    id="year-id"
                    value={year}
                    onChange={handleChangeYear}
                    label="year"
                  >
                    <MenuItem value="">
                      <em>Current</em>
                    </MenuItem>
                    <MenuItem value={date - 5}>{date - 5}</MenuItem>
                    <MenuItem value={date - 4}>{date - 4}</MenuItem>
                    <MenuItem value={date - 3}>{date - 3}</MenuItem>
                    <MenuItem value={date - 2}>{date - 2}</MenuItem>
                    <MenuItem value={date - 1}>{date - 1}</MenuItem>
                    <MenuItem value={date}>{date}</MenuItem>
                    <MenuItem value={date + 1}>{date + 1}</MenuItem>
                    <MenuItem value={date + 2}>{date + 2}</MenuItem>
                    <MenuItem value={date + 3}>{date + 3}</MenuItem>
                    <MenuItem value={date + 4}>{date + 4}</MenuItem>
                    <MenuItem value={date + 5}>{date + 5}</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Container>
  );
};

export default SelectMonth;
