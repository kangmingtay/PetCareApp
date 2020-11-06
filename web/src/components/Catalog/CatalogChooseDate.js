import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  makeStyles,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { fetchListOfValidPets } from 'src/calls/catalogueCalls'
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

  return (
    <Container maxWidth={false}>
      <Box mt={3}>
        <Typography variant="h3" align="left" color="textPrimary">
          Step 1: Select your Date Range
        </Typography>
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
                              label="Start Date"
                              value={values.startDate}
                              onChange={date => setValues({...values, startDate: date})}
                              format={"dd/MM/yyyy"}
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
                              label="End Date"
                              value={values.endDate}
                              onChange={date => setValues({...values, endDate: date})}
                              format={"dd/MM/yyyy"}
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
      </Box>
    </Container>
  );
};

ChooseDate.propTypes = {
  className: PropTypes.string
};

export default ChooseDate;
