import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import CatalogTable from '../components/CatalogTable';
import Toolbar from '../components/CareTakerToolbar';
import { fetchListOfCareTakers } from 'src/calls/catalogueCalls'
import { UserContext } from 'src/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const FindCareTakerPage = () => {
  const classes = useStyles();
  const [caretakers, setCaretakers] = useState([]);
  const { context } = useContext(UserContext)

  useEffect(() => {
    async function fetchData() {
      const resp = await fetchListOfCareTakers({ 
        startDate: '4-11-2020', 
        endDate: '4-11-2020', 
        petCategoryField: '%', 
        careTakerField: '%',
        addressField: '%',
        pName: context.username,
      });
      console.log(resp)
      setCaretakers([...caretakers, ...resp.data.results])
    }
    fetchData();
  }, [])

  const handleSelectCareTakers = async (values) => {
    try {
      let resp = await fetchListOfCareTakers(values);
      if (resp.data.success === true) {
          // navigate('/login', { replace: true });
          // alert("Account created successfully! Please login with your credentials!")
      }
    }
    catch(err) {
      // err.response.data.message -> to see actual error msg
      alert("Missing input fields")
    }
  }

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
      </Container>
      <Container maxWidth={false}>
        <Toolbar setCaretakers={setCaretakers} />
        <Box mt={3}>
          <CatalogTable caretakers={caretakers} />
        </Box>
      </Container>
    </Page>
  );
};

export default FindCareTakerPage;
