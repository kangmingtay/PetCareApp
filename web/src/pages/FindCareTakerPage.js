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
import { fetchListOfCareTakers } from 'src/calls/catalogueCalls'
import { UserContext } from 'src/UserContext';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
  const [open, setOpen] = useState(false);

  const [mainValues, setMainValues] = useState({
    startDate: new Date(),
    endDate: new Date(),
    petNameField: '',
    careTakerField: '',
    addressField: '',
  });
  
  useEffect(() => {
    async function fetchData() {
      const resp = await fetchListOfCareTakers({ 
        startDate: '4-11-2020', 
        endDate: '4-11-2020', 
        petCategoryField: 'x', 
        careTakerField: 'x',
        addressField: 'x',
        pName: context.username,
      });
      // console.log('resp:', resp)
      setCaretakers([...caretakers, ...resp.data.results])
    }
    fetchData();
    // console.log('selected:', selectedCaretaker);
  }, [])

  const handleOpen = () => {
    setOpen(true);
    console.log('selected cname:', selectedCaretaker);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <CatalogTable caretakers={caretakers} setSelectedCaretaker={setSelectedCaretaker} handleOpen={handleOpen} />
        </Box>
      </Container>
      {/* <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Transition modal</h2>
              <p id="transition-modal-description">react-transition-group animates me.</p>
            </div>
          </Fade>
        </Modal>
      </div> */}
    </Page>
  );
};

export default FindCareTakerPage;
