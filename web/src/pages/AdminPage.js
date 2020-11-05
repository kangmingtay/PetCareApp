import React, { useContext, useState } from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import Page from 'src/components/Page';
import data from '../utils/CareTakerData';
import AdminTable from '../components/AdminTable';
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

const AdminView = () => {
  const classes = useStyles();
  const [users, setUsers] = useState(data);
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

export default AdminView;
