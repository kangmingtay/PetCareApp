import React, { useContext } from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import Page from 'src/components/Page';
import { UserContext } from 'src/UserContext';
import Admin from '../components/Admin/Admin';

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
    </Page>
  );
};



export default AdminPage;
