import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  makeStyles,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
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

  const handleSubmit = async (data) => {
    console.log('Date button pressed', data);
    props.setCaretakers([]);
    try {
      let resp = await fetchListOfValidPets({...props.mainValues, 
        ...data,
        pName: context.username,
      });
      if (resp.data.success === true) {
        console.log('CCD:', [...resp.data.results]);
        props.setListPets([...resp.data.results]);
        props.setMainValues({...props.mainValues, 
          ...data,
          petNameField: '',
          careTakerField: '',
          addressField: '',
        });
      }
    }
    catch (err) {
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
                <form className={classes.root} noValidate autoComplete="off">
                  <Grid container className={classes.root} direction="row" justify="space-evenly" alignItems="center">
                      <Grid item>
                          <DatePicker
                            disableToolbar
                            label="Start Date"
                            value={props.mainValues.startDate}
                            onChange={date => handleSubmit({startDate: date})}
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
                          <DatePicker
                            disableToolbar
                            label="End Date"
                            value={props.mainValues.endDate}
                            onChange={date => handleSubmit({endDate: date})}
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
              </CardContent>
            </Card>
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
