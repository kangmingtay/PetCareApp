import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  TextField,
  Card,
  CardContent,
  Button,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import PetOwnerToolbar from '../components/PetOwnerToolbar';
import PetCard from '../components/PetCard';
import data from '../utils/PetOwnerData';
import { fetchPets, updatePet, createPet, deletePet, getPetCategories } from 'src/calls/petCalls';
import { UserContext } from 'src/UserContext';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  },
  floatinBtn: {
    position: 'absolute',
    right: 20,
    bottom: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const [ pets, setPets ] = useState(); //second argument is a function
  const { context } = useContext(UserContext)
  const [description, setDescription] = React.useState('Description');
  const [image, setImage] = React.useState('Image');
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState('Fox');
  const [petName, setPetName] = React.useState('Name');
  const pname = context.username;

  const handleCategorySelect = (event) => {
    setCategory(event.target.value);
  };

  const handleChange = (event) => {
    setDescription(event.target.value);
  }

  const handleNameChange = (event) => {
    setPetName(event.target.value);
  }

  const handleImageChange = (event) => {
    setImage(event.target.value);
  }

  useEffect(() => {
    async function fetchData() {
      const resp = await getPetCategories(props);
      setCategories([...resp.data.results]);
    }
    fetchData();
  }, []);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    let resp = await createPet({"care_req": description, "pname": pname, "category": category, "petName": petName, "image": image});
    if(resp.data.success === true){     
      window.location.reload(false);
    } else {
      alert('failed!')
    }
  }

  console.log(petName)

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth={true}>
      <DialogTitle id="simple-dialog-title">Add new Pet</DialogTitle>
      <Card className={classes.root}>
        <CardContent>
          <div style={{ textAlign: 'center', padding: 8, margin: '24px -24px -24px -24px' }}>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField style={{ width: '300px', padding: 12}}
                value={petName}
                onChange={handleNameChange}
                id="outlined-required"
                label="Pet Name"
                variant="outlined"
              />
              <FormControl variant="outlined" className={classes.formControl} style={{padding: 12}}>
                <InputLabel id="demo-simple-select-outlined-label">Pet Type</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={category}
                  onChange={handleCategorySelect}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.category} value={category.category}>{category.category}</MenuItem>
                  ))}
                </Select>
              </FormControl> <br/>
              <TextField style={{ width: '400px', padding: 12, paddingTop: 10}}
                value={description}
                onChange={handleChange}
                id="outlined-multiline-static"
                label="Care Requirements"
                multiline
                rows={4}
                variant="outlined"
              /> <br/>
              <TextField
                style={{ width: '400px', padding: 12, paddingTop: 10}}
                value={image}
                onChange={handleImageChange}
                id="outlined-required"
                label="Image"
                variant="outlined"
              /> <br/>
              <Button 
                onClick={() => handleListItemClick(props)}
                size="small" color="primary"
                type="submit">
                Done
              </Button>
            </form>
            </div>
        </CardContent>
      </Card>
    </Dialog>
  );
}

const PetOwnerPage = () => {
  const classes = useStyles();
  const [ pets, setPets ] = useState([]); //second argument is a function
  const { context } = useContext(UserContext)
  const pname = context.username;
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  useEffect(() => {
    async function fetchData() {
      const resp = await fetchPets(pname);
      console.log(resp);
      setPets([...resp.data.results]);
    }
    fetchData();
  }, []);

  return (
    <Page
      className={classes.root}
    >
      <Container maxWidth={false}
      style={useStyles.container}> 
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {pets.map((pet) => (
              <Grid
                item
                key={pet.pet_name}
                lg={4}
                md={6}
                xs={12}
              >
                <PetCard
                  className={classes.productCard}
                  pet={pet}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          {/* <Pagination
            color="primary"
            count={3}
            size="small"
          /> */}
        </Box>
        <Fab color="primary" aria-label="add" style={useStyles.floatinBtn} onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
        <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
      </Container>
    </Page>
  );
};

export default PetOwnerPage;
