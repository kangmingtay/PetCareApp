import React from 'react';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import CareTakerSchedule from 'src/components/CareTakerSchedule';
import CareTakerPrefersSelector from 'src/components/CareTakerPrefersSelector';

const useStyles = makeStyles(theme => ({
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
    <Page className={classes.root} title="Dashboard">
      <CareTakerPrefersSelector />
      <CareTakerSchedule />
    </Page>
  );
};

export default DashboardPage;
