import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  TextField
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import PetOwnerToolbar from '../components/PetOwnerToolbar';
import PetCard from '../components/PetCard';
import data from '../utils/PetOwnerData';
import { fetchPets, updatePet, createPet, deletePet } from 'src/calls/petCalls';
import { UserContext } from 'src/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const PetOwnerPage = () => {
  const classes = useStyles();
  const [ pets, setPets ] = useState([]); //second argument is a function
  const [products] = useState(data);
  const { context } = useContext(UserContext)
  const pname = context.username
  const [ params, setParams] = useState({
    offset: 0,
    limit: 10,
    sort_category: "username",
    sort_direction: "+",
  });

  useEffect(() => {
    async function fetchData() {
      const resp = await fetchPets(pname);
      console.log(resp);
      setPets([...resp.data.results]);
    }
    fetchData();
  }, []);

  return (
    <Page
      className={classes.root}
      title="Your Pets"
    >
      <Container maxWidth={false}>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="standard-basic" label="Pet Name" />
        </form>
      </Container>
      <Container maxWidth={false}>
        Your pets
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {pets.map((pet) => (
              <Grid
                item
                key={pet.pet_name}
                lg={4}
                md={6}
                xs={12}
              >
                <PetCard
                  className={classes.productCard}
                  pet={pet}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Page>
  );
};

export default PetOwnerPage;
