/* eslint-disable no-use-before-define */
import React , { Fragment, useEffect, useState, useContext, setState, useRef }from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  makeStyles,
  Grid,
  Typography,
  Container,
  TextField,
  Chip
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { UserContext } from 'src/UserContext';
import { useToasts } from 'react-toast-notifications'
import { fetchAllPreferences, fetchSingleCareTakerPreferences, updateSingleCareTakerPreferences } from 'src/calls/careTakerCalls'

const CareTakerPrefersSelector = () => {
  const { context, setContext } = useContext(UserContext);
  const [currentPetCategory, setCurrentPetCategory] = useState([{category:"-"}]);
  const [allPetCategory, setAllPetCategory] = useState([{category:"-"}]);
  const { addToast } = useToasts();
  const getPetCategory = async e => {
        try {
            const resp = await fetchSingleCareTakerPreferences(context.username);
            setCurrentPetCategory(resp.data.results);
        } catch (err) {
            console.error(err.message);
        }
  }

  const getAllPetCategory = async e => {
        try {
            const resp = await fetchAllPreferences();
            setAllPetCategory(resp.data.results);
        } catch (err) {
            console.error(err.message);
        }
  }

    async function resetPetCategory(newValue) {
      try {
        var newValueStr = '{'.concat((newValue.map(function(a){return a.category})).toString(),'}');
        console.log(newValueStr);
        const resp = await updateSingleCareTakerPreferences( {
          username: context.username,
          categories: newValueStr
        });
        console.log(resp);
        setCurrentPetCategory(newValue);
        addToast(`Successfuly updated pet categories to ${newValueStr}`, {
          appearance: 'success',
          autoDismiss: true,
        });
    } catch (err) {
        console.error(err.message);
        addToast(`Failed to update Pet Categories: ${err.message}`, {
          appearance: 'error',
          autoDismiss: true,
        });
    }
  }

  const classes = useStyles();

  useEffect(()=>{
        getAllPetCategory();
        getPetCategory();
    },[]);

  return (
    <Container maxWidth={false}>
      <Box mt={3}>
        <div>
          <Box mt={3}>
            <Card>
              <CardContent>
              <span className={classes.root}>
                      
                <Autocomplete
                  value={currentPetCategory}
                  onChange={(event, newValue) => {
                    if (newValue.length === 0) {
                      setCurrentPetCategory(currentPetCategory);
                      addToast("must have at least 1 pet", {
                        appearance: 'error',
                        autoDismiss: true,
                      });
                    }
                    else {
                      resetPetCategory(newValue);
                    }
                  }}
                  multiple
                  id="tags-outlined"
                  options={allPetCategory}
                  getOptionLabel={(option) => option.category}
                  getOptionSelected={(option, value) => option.category === value.category}
                  filterSelectedOptions = {true}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Prefered Pet Categories"
                      placeholder=""
                    />
                  )}
                />
              </span>
            </CardContent>
          </Card>
        </Box>
       </div>
      </Box>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

export default CareTakerPrefersSelector;