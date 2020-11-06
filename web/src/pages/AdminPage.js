import React, { useContext } from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import Page from 'src/components/Page';
import AdminTable from '../components/Admin/AdminTable';
import { UserContext } from 'src/UserContext';
import Jobs from '../components/Admin/Jobs';

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
      <Jobs />
      <Container maxWidth={false}>
        <Typography variant="h2" align="center">
          Hello Admin, {context.username}
        </Typography>
      </Container>
      <AdminTable />
    </Page>
  );
};

export default AdminPage;
