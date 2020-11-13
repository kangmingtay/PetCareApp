import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
  makeStyles,
  CardActionArea,
  CardActions,
  Button,
  List,
  ListItem,
  DialogTitle,
  Dialog
} from '@material-ui/core';

import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { fetchPets, updatePet, getPetBids, deletePet } from 'src/calls/petCalls';
import { withRouter } from 'react-router'
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  media: {
    height: 250,
  }
}));

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 140,
//   },
// });

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open , pname, petName} = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleDelete = async (event) => {
    event.preventDefault()
    let resp = await deletePet({"pname": pname, "pet_name": petName});
    if(resp.data.success === true){     
      window.location.reload(false);
    } else {
      alert('failed!')
    }
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Are you sure?</DialogTitle>
        <List>
            <ListItem button onClick={handleDelete}>
              <Button>
                Yes
              </Button>
            </ListItem>
            <ListItem button onClick={handleClose}>
              <Button>
                No
              </Button>
            </ListItem>
        </List>
      </Dialog>
  );
}

function PetCard({ className, pet, ...rest }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [description, setDescription] = React.useState(pet.care_req);
  const [image, setImage] = React.useState(pet.image);
  const [canDelete, setDelete] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const petName = pet.pet_name;
  const pname = pet.pname;

  useEffect(() => {
    async function fetchData() {
      const resp = await getPetBids({"pname": pname, "petName": petName})
      setDelete(!resp.data.results)
    }
    fetchData();
  }, []);

  const handleChange = (event) => {
    setDescription(event.target.value);
  }
  
  const handleImageChange = (event) => {
    setImage(event.target.value);
  }

  console.log(description);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    let resp = await updatePet({"care_req": description, "pname": pname, "pet_name": petName, "image": image});
    if (resp.data.success === true) {
      console.log(resp.data);
      setDescription(description);
      window.location.reload(false);
    }
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardHeader
          title={pet.pet_name}
          subheader={pet.category}
        />
        <CardMedia
          className={classes.media}
          image={pet.image === "undefined" ? 'https://piotrkowalski.pw/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png' : pet.image}
          title={pet.pet_name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {pet.care_req}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button 
          size="small" color="primary"
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more">
          Edit
        </Button>
        <IconButton aria-label="delete" disabled={canDelete} onClick={handleClickOpen}>
          <DeleteOutlinedIcon />
        </IconButton>
        <SimpleDialog open={open} onClose={handleClose} pname={pname} petName={petName}/>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField 
              value={description}
              onChange={handleChange}
              id="outlined-multiline-static"
              label="Care Requirements"
              multiline
              rows={4}
              variant="outlined"
            /> <br />
            <TextField
              value={image}
              onChange={handleImageChange}
              id="outlined-required"
              label="Image"
              variant="outlined"
            /> <br/>
            <Button 
              size="small" color="primary"
              type="submit">
              Done
            </Button>
          </form>
        </CardContent>
      </Collapse>
    </Card>
  );
}

PetCard.propTypes = {
  className: PropTypes.string
};

export default PetCard;
