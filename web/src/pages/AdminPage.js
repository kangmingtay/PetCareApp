import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Container, makeStyles, Typography, Box } from '@material-ui/core';
import Page from 'src/components/Page';
import { UserContext } from 'src/UserContext';
// import AdminTable from '../components/Admin/AdminTable';
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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
      {/* <AdminTable /> */}
    </Page>
  );
};



export default AdminPage;
