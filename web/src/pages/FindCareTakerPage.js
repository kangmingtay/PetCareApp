import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles,
  Button,
  Grid,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import CatalogTable from '../components/CatalogTable';
import ChooseDate from '../components/CatalogChooseDate';
import ChoosePet from '../components/CatalogChoosePet';
import { fetchListOfCareTakers, fetchListOfValidPets } from 'src/calls/catalogueCalls'
import { UserContext } from 'src/UserContext';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ModalUtil from 'src/components/ModalUtil';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const FindCareTakerPage = () => {
  const classes = useStyles();
  const { context } = useContext(UserContext)

  const [listPets, setListPets] = useState([]);

  const [selectedPet, setSelectedPet] = useState('');
  const [caretakers, setCaretakers] = useState([]);
  const [selectedCaretaker, setSelectedCaretaker] = useState('');
  // const [open, setOpen] = useState(false);
  const [open, isOpened] = useState(false);

  const [mainValues, setMainValues] = useState({
    startDate: new Date(),
    endDate: new Date(),
    petNameField: '',
    careTakerField: '',
    addressField: '',
  });
  
  useEffect(() => {
    async function fetchPets() {
      const resp = await fetchListOfValidPets({ 
        pName: context.username,
        startDate: new Date(),
        endDate: new Date(),
      });
      setListPets([...resp.data.results])
    }
    fetchPets();
  }, [])

  const modalInfo = (
    <Grid container xs={12}>
      <Grid item xs={12}>
        <Typography variant="h2" align="center">
            Select one of the sign-up options:
        </Typography>
      </Grid>
    </Grid>
  );

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      {/* Title */}
      <Container maxWidth={false}>
        <Typography variant="h2" align="center" color="textPrimary">
          Select your Ideal Caretaker here!
        </Typography>
      </Container>
      {/* (1) Selecting date range for pets to be taken care of  */}
      <Container maxWidth={false}>
        <Box mt={3}>
          <Typography variant="h3" align="left" color="textPrimary">
            Step 1: Select your Date Range
          </Typography>
          <ChooseDate 
            // setCaretakers={setCaretakers}
            setListPets={setListPets}
            setMainValues={setMainValues}
            mainValues={mainValues}
          />
        </Box>
      </Container>
      {/* (2) Select pet_name, caretaker and area if needed */}
      <Container maxWidth={false}>
        <Box mt={3}>
          <Typography variant="h3" align="left" color="textPrimary">
            Step 2: Select your pet [Optional: Filter by caretaker, area]
          </Typography>
          <ChoosePet
            listPets={listPets}
            setMainValues={setMainValues}
            mainValues={mainValues}
            setCaretakers={setCaretakers}
          />
        </Box>
      </Container>
      {/* (3) Select caretaker => (4) Will pop up model to confirm paymentAmt and transactionType*/}
      <Container>
        <Box mt={3}>
          <CatalogTable caretakers={caretakers} setSelectedCaretaker={setSelectedCaretaker} isOpened={isOpened} />
        </Box>
      </Container>
      <ModalUtil open={open}>
        {modalInfo}
      </ModalUtil>
    </Page>
  );
};

export default FindCareTakerPage;
