import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Container, makeStyles, Typography, Grid } from '@material-ui/core';
import Page from 'src/components/Page';
import { UserContext } from 'src/UserContext';
import AdminTable from '../components/Admin/AdminTable';
import Admin from '../components/Admin/Admin';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Pets from 'src/components/Admin/Pets';
import Salary from 'src/components/Admin/Salary';
import { DatePicker } from '@material-ui/pickers';

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
  const [value, setValue] = useState(0);
  const [selectedDate, handleDateChange] = useState(new Date());
  const { context } = useContext(UserContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page className={classes.root} title="Administrator">
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <Typography variant="h2" align="center">
            Hello Admin, {context.username}
          </Typography>
        </Grid>
        <Grid item xs={4} />
        <Grid item xs={4} justify="center">
          <DatePicker
            className={{
              alignContent: "center"
            }}
            views={["year", "month"]}
            label="Select month"
            openTo="month"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </Grid>
        <Grid item xs={4} />
        <Grid item xs ={12}>
          <Grid container spacing={3}>
            <Pets month={selectedDate.getMonth() + 1} year={selectedDate.getFullYear()} />
            <Salary month={selectedDate.getMonth() + 1} year={selectedDate.getFullYear()} />
          </Grid>
        </Grid>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <Container>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Caretakers" {...a11yProps(0)} />
              <Tab label="All Users" {...a11yProps(1)} />
            </Tabs>
          </Container>
        </Grid>
        <Grid item xs={4} />
      </Grid>

      <TabPanel value={value} index={0}>
        <Admin month={selectedDate.getMonth() + 1} year={selectedDate.getFullYear()}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AdminTable />
      </TabPanel>
      {/* <CaretakerTable /> */}
    </Page>
  );
};



export default AdminPage;
