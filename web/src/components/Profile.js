import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import { UserContext } from 'src/UserContext';
import { fetchUserType } from 'src/calls/userCalls';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({});
  const { context } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      const resp = await fetchUserType(context.username);
      setValues({
        ...resp.data.results
      });
    }
    fetchData();
  }, []);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} src={user.avatar} />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {context.isAdmin === 'true'
              ? `Administrator: ${context.username}`
              : `User: ${context.username}`}
          </Typography>
          {Object.keys(values).map(key => {
            let name = '';
            switch (key) {
              case 'isPetOwner':
                name = 'Pet Owner';
                break;
              case 'isCareTaker':
                name = 'Care Taker';
                break;
              case 'isFullTimer':
                name = 'Full-Timer';
                break;
              case 'isPartTimer':
                name = 'Part-Timer';
                break;
            }
            return (
              <Typography key={name} color="textPrimary" variant="h6">
                {name}: {parseInt(values[key]) === 1 ? 'Yes' : 'No'}
              </Typography>
            );
          })}
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
