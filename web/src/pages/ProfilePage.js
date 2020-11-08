import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from '../components/Profile';
import ProfileDetails from '../components/ProfileDetails';
import PastPets from 'src/components/CareHistory/PastPets';
import ModalUtil from 'src/components/UI/ModalUtil';
import { updateReviewAndRating } from 'src/calls/petHistoryCalls'
import { useToasts } from 'react-toast-notifications'
import { UserContext } from 'src/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  buttonField: {
    margin: theme.spacing(2),
  },
  textfield: {
    margin: theme.spacing(2),
    minWidth: 500,
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 180,
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const { context } = useContext(UserContext);
  const { addToast } = useToasts();

  const [open, isOpened] = useState(false);
  const [selectedReview, setSelectedReview] = useState({
    pname: context.username,
    pet_name: '',
    cname: '',
    startDate: new Date(),
    endDate: new Date(),
    rating: 0,
    review: '',
  });

  const handleSubmit = async () => {
    console.log('Submitting...');
    try {
      let resp = await updateReviewAndRating({
        ...selectedReview,
      });
      if (resp.data.success === true) {
        console.log([resp.data.message]);
        addToast(`Your review has been posted!`, {
          appearance: 'success',
          autoDismiss: true,
        })
      }
    } catch(err) {
      console.log(err);
      addToast(`There seems to be a problem with your review... ${err}`, {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }

  const ratingChanger = (event) => {
    setSelectedReview({...selectedReview, rating: event.target.value});
  };

  const reviewChanger = (event) => {
    setSelectedReview({...selectedReview, review: event.target.value});
  };

  const handleCloseModal = (event) => {
    isOpened(false);
  };

  const modalInfo = (
    <form className={classes.root} noValidate autoComplete="off">
      <Container maxWidth={false}>
        <Typography variant="h3" align="center" color="textPrimary">
          Give Us Your Feedback!
        </Typography>
      </Container>
      <Container maxWidth={false}>
      <TextField
          id="amountPaid"
          label="Review"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={reviewChanger}
          value={selectedReview.review}
          className={classes.textfield}
          multiline
          rows={2}
          rowsMax={4}
        />
      </Container>
      <Container maxWidth={false}>
        <Box justifyContent="space-evenly" display="flex">
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="simple-select-label">Rating</InputLabel>
              <Select
                labelId="select-pet-name-label"
                id="rating"
                name={"rating"}
                value={selectedReview.rating}
                onChange={ratingChanger}
                label="Rating"
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
          </FormControl>
          <Button 
            className={classes.button}
            variant="outlined" 
            onClick={handleSubmit}
            className={classes.buttonField}
          >
            Post!
          </Button>
        </Box> 
      </Container>
    </form>
  );

  return (
    <Page
      className={classes.root}
      title="Account"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Profile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails />
          </Grid>
        </Grid>
      </Container>
      <PastPets
        isOpened={isOpened}
        setSelectedReview={setSelectedReview}
        selectedReview={selectedReview}
      />
      <ModalUtil open={open} handleClose={handleCloseModal}>
        {modalInfo}
      </ModalUtil>
    </Page>
  );
};

export default ProfilePage;
