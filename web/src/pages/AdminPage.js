import React, { useContext, useState } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import data from '../utils/CareTakerData';
import { UserContext } from 'src/UserContext';
import Jobs from '../components/Jobs';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const AdminView = () => {
  const classes = useStyles();
  const { context, setContext } = useContext(UserContext);

  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        This is the admin page.
        <p>Admin status: {context.isAdmin.toString()}</p>
        <p>Login status: {context.isLoggedIn.toString()}</p>
        <br></br>
        <Jobs />
      </Container>
    </Page>
  );
};

export default AdminView;
