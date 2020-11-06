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
import TextField from '@material-ui/core/TextField';
import { fetchListOfCareTakers } from 'src/calls/catalogueCalls'
import { UserContext } from 'src/UserContext';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 60,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ChoosePet = (props) => {
  const classes = useStyles();
  const { context, setContext } = useContext(UserContext);

  const [values, setValues] = useState({
    pet_name: '',
    careTakerField: '',
    addressField: '',
  });

  const handleSubmit = async () => {
    console.log('2nd button pressed');
    props.setMainValues({...props.mainValues, 
      petNameField: values.pet_name, 
      careTakerField: values.careTakerField,
      addressField: values.addressField,
    });
    console.log('CCP:', props.mainValues);
    try {
      let resp = await fetchListOfCareTakers({...props.mainValues,
         pName: context.username,
         petNameField: values.pet_name,
         careTakerField: values.careTakerField,
         addressField: values.addressField,
        });
      if (resp.data.success === true) {
          console.log('CCP results: ', [...resp.data.results]);
          props.setCaretakers([...resp.data.results]);
      }
    }
    catch(err) {
      alert("Missing input fields")
      console.log(err);
    }
  }

  const ctFieldChanger = (event) => {
    setValues({ ...values, careTakerField: event.target.value});
  };
  const addrFieldChanger = (event) => {
    setValues({ ...values, addressField: event.target.value});
  };
  const petChanger = (event) => {
    console.log(event.target);
    setValues({...values, pet_name: event.target.value});
  };

  return (
    <Container maxWidth={false}>
      <Box mt={3}>
        <Typography variant="h3" align="left" color="textPrimary">
          Step 2: Select your pet [Optional: Filter by caretaker, area]
        </Typography>
        <div>
          <Box mt={3}>
            <Card>
              <CardContent align="center">
                <FormControl className={classes.formControl}>
                  <InputLabel id="simple-select-label">Pet Name</InputLabel>
                  <Select
                    labelId="select-pet-name-label"
                    id="pet_name"
                    value={values.pet_name}
                    onChange={petChanger}
                  >
                    {props.listPets.map((option) => (
                      <MenuItem
                        key={option.pet_name}
                        value={option.pet_name}
                      >
                        {option.pet_name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Grid container className={classes.root} spacing={3}>
                      <Grid item>
                          <TextField 
                            id="careTakerField"
                            value={values.careTakerField}
                            onChange={ctFieldChanger}
                            // endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                            aria-describedby="standard-weight-helper-text"
                            inputProps={{
                              'aria-label': 'weight',
                            }}
                            margin="normal"
                            placeholder="Care Taker"
                          />
                        </Grid>
                      <Grid item>
                          <TextField 
                            id="addressField"
                            value={values.addressField}
                            onChange={addrFieldChanger}
                            // endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                            aria-describedby="standard-weight-helper-text"
                            inputProps={{
                              'aria-label': 'weight',
                            }}
                            margin="normal"
                            placeholder="Area"
                          />
                      </Grid>
                  </Grid>
                </FormControl>
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
              Select
            </Button>
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
