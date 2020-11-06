import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles,
  Button,
  Typography,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import Page from 'src/components/Page';
import CatalogTable from '../components/Catalog/CatalogTable';
import ChooseDate from '../components/Catalog/CatalogChooseDate';
import ChoosePet from '../components/Catalog/CatalogChoosePet';
import { insertNewBid, fetchListOfValidPets } from 'src/calls/catalogueCalls'
import { UserContext } from 'src/UserContext';
import ModalUtil from 'src/components/UI/ModalUtil';

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
  textfield: {
    margin: theme.spacing(2),
  },
}));

const FindCareTakerPage = () => {
  const classes = useStyles();
  const { context } = useContext(UserContext)

  const [listPets, setListPets] = useState([]);
  const [caretakers, setCaretakers] = useState([]);
  const [selectedCaretaker, setSelectedCaretaker] = useState('');
  const [open, isOpened] = useState(false);

  const [mainValues, setMainValues] = useState({
    pName: context.username,
    petNameField: '',
    startDate: new Date(),
    endDate: new Date(),
    careTakerField: '',
    addressField: '',
    paymentAmt: 0,
    transactionType: 'Credit Card',
  });
  
  useEffect(() => {
    fetchPets();
  }, [])

  const fetchPets = async () => {
    const resp = await fetchListOfValidPets({ 
      pName: context.username,
      startDate: new Date(),
      endDate: new Date(),
    });
    setListPets([...resp.data.results])
  }

  const handleBid = async () => {
    console.log('Bidding...');
    try {
      let resp = await insertNewBid({
        ...mainValues,
        cName: selectedCaretaker,
      });
      if (resp.data.success === true) {
        alert(resp.data.message);
        console.log([resp.data.message]);
        isOpened(false);
        
        // Clear the current catalog
        fetchPets();
        setCaretakers([]);
      }
    } catch(err) {
      console.log(err);
      alert("Insufficient Amount! Please Try Again");
    }
  }

  const transFieldChanger = (event) => {
    setMainValues({ ...mainValues, transactionType: event.target.value});
  };

  const amtFieldChanger = (event) => {
    setMainValues({ ...mainValues, paymentAmt: event.target.value});
  };

  const handleCloseModal = (event) => {
    isOpened(false);
  };

  const modalInfo = (
    <form className={classes.root} noValidate autoComplete="off">
      <Typography variant="h3" align="center" color="textPrimary">
        Payment Section
      </Typography>
      <Box justifyContent="space-evenly" display="flex">
        <TextField
          id="transactionType"
          label="Payment Type"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={transFieldChanger}
          value={mainValues.transactionType}
          placeholder="Type"
          className={classes.textfield}
        />
        <TextField
          id="amountPaid"
          label="Payment Amount"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={mainValues.paymentAmt}
          onChange={amtFieldChanger}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          className={classes.textfield}
        />
        <Button 
          className={classes.button}
          variant="outlined" 
          onClick={handleBid}
          className={classes.textfield}
        >
          Bid
        </Button>
      </Box> 
    </form>
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
      <ChooseDate 
        setListPets={setListPets}
        setMainValues={setMainValues}
        mainValues={mainValues}
      />
      {/* (2) Select pet_name, caretaker and area if needed */}
      <ChoosePet
        listPets={listPets}
        setMainValues={setMainValues}
        mainValues={mainValues}
        setCaretakers={setCaretakers}
      />
      {/* (3) Select caretaker => (4) Will pop up model to confirm paymentAmt and transactionType*/}
      <CatalogTable 
        caretakers={caretakers} 
        setSelectedCaretaker={setSelectedCaretaker} 
        isOpened={isOpened} 
      />
      <ModalUtil open={open} handleClose={handleCloseModal}>
        {modalInfo}
      </ModalUtil>
    </Page>
  );
};

export default FindCareTakerPage;
