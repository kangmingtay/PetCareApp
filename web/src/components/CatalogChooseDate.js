import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  makeStyles,
  Grid,
  FormHelperText
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import { format } from 'date-fns';
import { fetchListOfCareTakers, fetchListOfValidPets } from 'src/calls/catalogueCalls'
import { UserContext } from 'src/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const ChooseDate = (props) => {
  const classes = useStyles();
  const { context, setContext } = useContext(UserContext);

  const [values, setValues] = useState({
    startDate: new Date(),
    endDate: new Date(),
    // petCategoryField: '',
    // careTakerField: '',
    // addressField: '',
  });

  const handleSubmit = async () => {
    console.log('button pressed');
    props.setMainValues({...props.mainValues, startDate: values.startDate, endDate: values.endDate});
    try {
      let resp = await fetchListOfValidPets({...values, 
        pName: context.username,
        startDate: values.startDate,
        endDate: values.endDate
      });
      if (resp.data.success === true) {
          console.log('toolbar:', [...resp.data.results]);
          props.setListPets([...resp.data.results]);
          
          console.log('CCD:', props.mainValues);
      }
    }
    catch(err) {
      alert("Missing input fields " + err)
      console.log(err);
    }
  }

  const handleChange = (event) => {
    console.log(event.target.id, event.target.value);
    setValues({ ...values, [event.target.id]: event.target.value });
  };

  const disableStartDates = (date) => {
    const date1 = new Date(date);
    const date2 = new Date(values.startDate);
    const Difference_In_Time = date1.getTime() - date2.getTime();
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    if (Difference_In_Days < 0) {
      return true;
    }
    // return date < values.startDate;
  }

  return (
    <div>
      <Box mt={3}>
        <Card>
          <CardContent>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <form className={classes.root} noValidate autoComplete="off">
                <Grid container className={classes.root} direction="row" justify="space-evenly" alignItems="center">
                    <Grid item>
                        <KeyboardDatePicker
                          disableToolbar
                          // id="startDate"
                          label="Start Date"
                          value={values.startDate}
                          onChange={date => setValues({...values, startDate: date})}
                          format={"dd/MM/yyyy"}
                          // shouldDisableDate={disablePreviousDates}
                          disablePast
                          variant="inline"
                          margin="normal"
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                    </Grid>
                    <Grid item>
                        <KeyboardDatePicker
                          disableToolbar
                          // id="endDate"
                          label="End Date"
                          value={values.endDate}
                          onChange={date => setValues({...values, endDate: date})}
                          format={"dd/MM/yyyy"}
                          // shouldDisableDate={disableStartDates}
                          disablePast
                          variant="inline"
                          margin="normal"
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                    </Grid>
                </Grid>
                </form>
              </MuiPickersUtilsProvider>
          </CardContent>
        </Card>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        mt={3}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmit}
        >
          Select Dates
        </Button>
      </Box>
    </div>
  );
};

ChooseDate.propTypes = {
  className: PropTypes.string
};

export default ChooseDate;
