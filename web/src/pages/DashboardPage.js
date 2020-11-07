import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Budget from '../components/DashboardCard';
import CareTakerSchedule from 'src/components/CareTakerSchedule';
import CareTakerPrefersSelector from 'src/components/CareTakerPrefersSelector';
import ChooseLeavesAvailability from 'src/components/CareTakerChooseLeavesAvailability';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const DashboardPage = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      {/* <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid>          
        </Grid>
      </Container> */}
        <ChooseLeavesAvailability/>
        <CareTakerPrefersSelector/>
        <CareTakerSchedule/>
    </Page>
  );
};

export default DashboardPage;
