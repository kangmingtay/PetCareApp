import React, { useState, useContext, useEffect } from 'react';
import {
  makeStyles,
  Typography, 
  Button,
  Grid
} from '@material-ui/core';
import Page from 'src/components/Page';
import { UserContext } from 'src/UserContext';
import { fetchUserType } from 'src/calls/userCalls';
import ModalUtil from 'src/components/UI/ModalUtil';
import ViewBidsTable from 'src/components/CareTaker/ViewBidsTable';
import { createFullTimer } from 'src/calls/fullTimerCalls';
import { createPartTimer } from 'src/calls/partTimerCalls';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  button: {
      margin: theme.spacing(2),
  }
}));

const BeCareTakerPage = () => {
  const classes = useStyles();
  const { context } = useContext(UserContext)
  const [isCareTaker, setCareTaker] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
        const resp = await fetchUserType(context.username) 
        if (parseInt(resp.data.results.isCareTaker) === 1) {
            setCareTaker(true)
        } else {
          setOpen(true)
        }
    }
    fetchData();
  }, [])

  const handleClick = async (type) => {
    // add api call here to create full-timer / part-timer account
      let resp = {data: {success: false}}
      switch(type) {
          case ("full-timer"):
              resp = await createFullTimer(context.username);
              break;
          case ("part-timer"):
              resp = await createPartTimer(context.username);
              break;
      }
      if (resp.data.success === true) {
        setCareTaker(true);
      }
      setOpen(false);
  }

  const modalInfo = (
    <Grid container xs={12}>
        <Grid item xs={12}>
            <Typography variant="h2" align="center">
                Select one of the sign-up options:
            </Typography>
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={3}>
            <Button 
                className={classes.button}
                variant="contained" 
                onClick={() => handleClick("full-timer")}
            >
                Full-Timer
            </Button>
        </Grid>
        <Grid item xs={3}>
            <Grid container justify="flex-end">
                <Button 
                    className={classes.button}
                    variant="contained" 
                    onClick={() => handleClick("part-timer")}
                >
                    Part-Timer
                </Button>
            </Grid>
        </Grid>
        <Grid item xs={3} />
    </Grid>
  )

  return (
    <Page
      className={classes.root}
      title="Caretaker"
    >
      <ViewBidsTable/>
      <ModalUtil open={open} handleClose={handleClick}>
        {modalInfo}
      </ModalUtil>
    </Page>
  );
};

export default BeCareTakerPage;
