import React, { useContext } from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import Page from 'src/components/Page';
import { UserContext } from 'src/UserContext';
import AdminTable from '../components/Admin/AdminTable';
import Admin from '../components/Admin/Admin';
import CaretakerTable from '../components/Admin/CaretakerTable';

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
        <Typography variant="h2" align="center">
          Hello Admin, {context.username}
        </Typography>
      </Container>
      <Admin />
      {/* <CaretakerTable /> */}
      <AdminTable />
    </Page>
  );
};

export default AdminPage;
