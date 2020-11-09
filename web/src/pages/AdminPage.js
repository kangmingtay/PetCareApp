import React, { useContext } from 'react';
import { Container, makeStyles, Typography, Grid } from '@material-ui/core';
import Page from 'src/components/Page';
import AdminTable from '../components/Admin/AdminTable';
import { UserContext } from 'src/UserContext';
import Admin from '../components/Admin/Admin';
import AdminCard from '../components/Admin/AdminCard';
import Pets from '../components/Admin/Pets';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const AdminPage = () => {
  const classes = useStyles();
  const { context } = useContext(UserContext);

  return (
    <Page className={classes.root} title="Administrator">
      <Container maxWidth={false}>
        <Admin />
        <Typography variant="h2" align="center">
          Hello Admin, {context.username}
        </Typography>
      </Container>
      <AdminTable />
    </Page>
  );
};

export default AdminPage;
