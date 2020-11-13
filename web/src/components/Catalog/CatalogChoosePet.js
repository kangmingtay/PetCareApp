import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  makeStyles,
  Grid,
  Typography,
  Container,
  FormHelperText
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { fetchListOfCareTakers } from 'src/calls/catalogueCalls';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const ChoosePet = props => {
  const classes = useStyles();

  const handleSubmit = async event => {
    console.log(
      '2nd field box changed!',
      event.target.name,
      event.target.value
    );
    props.setMainValues({
      ...props.mainValues,
      [event.target.name]: event.target.value
    });
    try {
      let resp = await fetchListOfCareTakers({
        ...props.mainValues,
        [event.target.name]: event.target.value
      });
      if (resp.data.success === true) {
        // console.log('CCP results: ', [...resp.data.results]);
        props.setCaretakers([...resp.data.results]);
      }
    } catch (err) {
      alert('Missing input fields', err);
      console.log(err);
    }
  };

  return (
    <Container maxWidth={false}>
      <Box mt={3}>
        <Typography variant="h3" align="left" color="textPrimary">
          Step 2: Select your pet
        </Typography>
        <div>
          <Box mt={3}>
            <Card>
              <CardContent align="center">
                <FormControl required className={classes.formControl}>
                  <InputLabel id="simple-select-label">Pet Name</InputLabel>
                  <Select
                    labelId="select-pet-name-label"
                    id="petNameField"
                    name={'petNameField'}
                    value={props.mainValues.petNameField}
                    onChange={handleSubmit}
                    required
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {props.listPets.map(option => (
                      <MenuItem key={option.pet_name} value={option.pet_name}>
                        {option.pet_name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
                <Grid
                  container
                  className={classes.root}
                  spacing={3}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <TextField
                      id="careTakerField"
                      name={'careTakerField'}
                      value={props.mainValues.careTakerField}
                      onChange={handleSubmit}
                      aria-describedby="standard-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight'
                      }}
                      margin="normal"
                      placeholder="Care Taker"
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="addressField"
                      name={'addressField'}
                      value={props.mainValues.addressField}
                      onChange={handleSubmit}
                      aria-describedby="standard-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight'
                      }}
                      margin="normal"
                      placeholder="Area"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </div>
      </Box>
    </Container>
  );
};

ChoosePet.propTypes = {
  className: PropTypes.string
};

export default ChoosePet;
