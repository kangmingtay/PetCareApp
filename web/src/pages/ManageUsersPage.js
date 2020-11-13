import React, { useState, useContext } from 'react';
import { Container, makeStyles, Typography, Box } from '@material-ui/core';
import Page from 'src/components/Page';
import { UserContext } from 'src/UserContext';
import AdminTable from '../components/Admin/AdminTable';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    padding: theme.spacing(2),
  },
  tabs: {
    justifyContent: "space-evenly",
    alignContent: "center",
  }
}));

const ManageUsersPage = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { context } = useContext(UserContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page className={classes.root} title="Administrator">
      <Container maxWidth={false}>
        <Typography variant="h2" align="center">
          Hello Admin, {context.username}
        </Typography>
      </Container>
      
      <AdminTable />
    </Page>
  );
};



export default ManageUsersPage;
