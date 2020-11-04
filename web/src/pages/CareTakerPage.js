import React, { useState, useContext, useEffect } from 'react';
import {
  Container,
  makeStyles,
  Typography, 
  Button,
  Grid
} from '@material-ui/core';
import Page from 'src/components/Page';
import { UserContext } from 'src/UserContext';
import { fetchUserType } from 'src/calls/userCalls';
import ModalUtil from 'src/components/ModalUtil';

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

const CareTakerPage = () => {
  const classes = useStyles();
  const { context } = useContext(UserContext)
  const [isCareTaker, setCareTaker] = useState(false);

  useEffect(() => {
    async function fetchData() {
        const resp = await fetchUserType(context.username) 
        if (parseInt(resp.data.results.isCareTaker) === 1) {
            setCareTaker(true)
        }
    }
    fetchData();
  }, [])

  const handleClick = (type) => {
      console.log(type)
      // add api call here to create full-timer / part-timer account
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
      <Container maxWidth={false}>
          Welcome to the CareTaker Page!
          Caretaker status: {isCareTaker.toString()}
      </Container>
      <ModalUtil open={!isCareTaker}>
        {modalInfo}
      </ModalUtil>
    </Page>
  );
};

export default CareTakerPage;
