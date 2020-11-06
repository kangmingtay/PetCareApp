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

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={pet.image}
          title={pet.pet_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {pet.pet_name}
          </Typography>
          <Typography variant="h6" color="textSecondary" component="h1">
            {pet.category}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {pet.care_req}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}

// const PetCard = ({ className, pet, ...rest }) => {
//   const classes = useStyles();
//   // console.log(pet)
//   return (
//     <Card
//       className={clsx(classes.root, className)}
//       {...rest}
//     >
//       <CardContent>
//         <CardMedia 
//           className={classes.media}           
//           image={pet.image}
//         />
//         <Typography
//           align="center"
//           color="textPrimary"
//           gutterBottom
//           variant="h4"
//         >
//           {pet.pet_name}
//         </Typography>
//         <Typography
//           align="center"
//           color="textPrimary"
//           variant="body1"
//         >
//           {pet.category}
//         </Typography>
//       </CardContent>
//       <Box flexGrow={1} />
//       <Divider />
//       <Box p={2}>
//         <Grid
//           container
//           justify="space-between"
//           spacing={2}
//         >
//         </Grid>
//       </Box>
//     </Card>
//   );
// };

PetCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default PetCard;
