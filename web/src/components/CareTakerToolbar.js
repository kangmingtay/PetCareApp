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
import { fetchListOfCareTakers } from 'src/calls/catalogueCalls'
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

const Toolbar = (props) => {
  const classes = useStyles();
  const { context, setContext } = useContext(UserContext);

  const [values, setValues] = React.useState({
    startDate: new Date(),
    endDate: new Date(),
    petCategoryField: '',
    careTakerField: '',
    addressField: '',
  });

  const handleSubmit = async () => {
    console.log('button pressed');

    try {
      let resp = await fetchListOfCareTakers({...values, pName: context.username});
      if (resp.data.success === true) {
          console.log([...resp.data.results]);
          props.setCaretakers([...resp.data.results]);
      }
    }
    catch(err) {
      alert("Missing input fields")
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
                <Grid container className={classes.root} spacing={2}>
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
                    <Grid item>
                        <TextField 
                          id="petCategoryField"
                          value={values.petCategoryField}
                          onChange={handleChange}
                          // endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                          aria-describedby="standard-weight-helper-text"
                          inputProps={{
                            'aria-label': 'weight',
                          }}
                          margin="normal"
                        />
                        
                        <FormHelperText id="standard-weight-helper-text">Pet Category</FormHelperText>
                    </Grid>
                    <Grid item>
                        <TextField 
                          id="careTakerField"
                          value={values.careTakerField}
                          onChange={handleChange}
                          // endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                          aria-describedby="standard-weight-helper-text"
                          inputProps={{
                            'aria-label': 'weight',
                          }}
                          margin="normal"
                        />
                        <FormHelperText id="standard-weight-helper-text">Care Taker</FormHelperText>
                    </Grid>
                    <Grid item>
                        <TextField 
                          id="addressField"
                          value={values.addressField}
                          onChange={handleChange}
                          // endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                          aria-describedby="standard-weight-helper-text"
                          inputProps={{
                            'aria-label': 'weight',
                          }}
                          margin="normal"
                        />
                        <FormHelperText id="standard-weight-helper-text">Area</FormHelperText>
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
          Search
        </Button>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
