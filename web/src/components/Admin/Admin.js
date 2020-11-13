import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core';
import Underperform from './Underperform';

const Admin = (props) => {
  const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch'
      }
    }
  }));
  const classes = useStyles();

  return (
    <Fragment>
      <Underperform month={props.month} year={props.year} />
    </Fragment>
  );
};

export default Admin;
