import React from 'react';
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
  Button
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
import { fetchPets, updatePet, createPet, deletePet } from 'src/calls/petCalls';
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

function PetCard({ className, pet, ...rest }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [description, setDescription] = React.useState(pet.care_req);
  const [image, setImage] = React.useState(pet.image);
  const petName = pet.pet_name;
  const pname = pet.pname;

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
          image={pet.image}
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
        <IconButton aria-label="add to favorites">
          <DeleteOutlinedIcon />
        </IconButton>
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
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default PetCard;
