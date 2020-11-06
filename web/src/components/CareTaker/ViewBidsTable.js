import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const ViewBidsTable = ({ className, customers, ...rest }) => {
  const classes = useStyles();

  return (
    <div>
      View Bids Table
    </div>
  );
};

ViewBidsTable.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default ViewBidsTable;
