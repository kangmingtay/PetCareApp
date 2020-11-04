import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from '@material-ui/core';
import { UserContext } from 'src/UserContext';
import { fetchSingleUserInfo, updateSingleUserInfo } from 'src/calls/userCalls'
import ProfileTextField from './ProfileTextField';

const ProfileDetails = () => {
  const { context } = useContext(UserContext);

  const [values, setValues] = useState({
    email: '',
    address: '',
  });

  useEffect(() => {
    async function fetchData() {
      const resp = await fetchSingleUserInfo(context.username);
      setValues({
        ...values, 
        email: resp.data.results[0].email, 
        address: resp.data.results[0].address 
      })
    }
    fetchData();
  }, [])

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const data = {
        ...values,
        username: context.username
      }
      const resp = await updateSingleUserInfo(data);
      // replace with modal popup    
      alert(resp.data.message)
    } catch (err) {
      console.log(err.response)
      alert("Invalid fields")
    }
  }

  return (
    <form
      autoComplete="off"
      noValidate
    > 
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            {Object.keys(values).map(key => {
              return (
                <Grid
                  key={key}
                  item
                  md={6}
                  xs={12}
                >
                  <ProfileTextField 
                    name={key} 
                    handleChange={handleChange} 
                    value={values[key]} 
                  />
                </Grid>
              )
            })}
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
