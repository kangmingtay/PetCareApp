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
import { useToasts } from 'react-toast-notifications'

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
  const { addToast } = useToasts();
  const { context } = useContext(UserContext);
  
  const [listPets, setListPets] = useState([]);
  const [caretakers, setCaretakers] = useState([]);
  const [open, isOpened] = useState(false);

  // const [selectedCaretaker, setSelectedCaretaker] = useState('');
  const [selectedCaretaker, setSelectedCaretaker] = useState({
    cname: '',
    minprice: 0,
  });

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
        cName: selectedCaretaker.cname,
      });
      if (resp.data.success === true) {
        console.log([resp.data.message]);
        addToast(`Your bid for ${mainValues.careTakerField} has been submitted!`, {
          appearance: 'success',
          autoDismiss: true,
        })
        setMainValues({
          ...mainValues,
          petNameField: '',
        });

        isOpened(false);

        // Clear the current catalog
        fetchPets();
        setCaretakers([]);
      }
    } catch(err) {
      console.log(err);
      // alert("Insufficient Amount! Please Try Again");
      addToast(`Your bid of $${mainValues.paymentAmt} is insufficient... Please bid at least $${selectedCaretaker.minprice}`, {
        appearance: 'error',
        autoDismiss: true,
      })
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
    setMainValues({
      ...mainValues,
      paymentAmt: selectedCaretaker.minprice,
    });
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
          required
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
        setCaretakers={setCaretakers}
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
        mainValues={mainValues}
        setMainValues={setMainValues}
        isOpened={isOpened} 
      />
      <ModalUtil open={open} handleClose={handleCloseModal}>
        {modalInfo}
      </ModalUtil>
    </Page>
  );
};

export default FindCareTakerPage;
