import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Typography
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableUtil from '../UI/TableUtil';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { fetchAllBids } from 'src/calls/bidsCalls'
import { UserContext } from 'src/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  table: {
    minWidth: 650,
  },
}));

const ViewBidsTable = ({ className, customers, ...rest }) => {
  const classes = useStyles();

  const [ pendingBids, setPendingBids ] = useState([])
  const [ selectedBids, setSelectedBids ] = useState([])

  const {context} = useContext(UserContext);

  useEffect(() => {
    async function fetchPendingBids() {
      const resp = await fetchAllBids({
        username: context.username,
        is_selected: false,
      })
      setPendingBids([...resp.data.results])
    }
    async function fetchSelectedBids() {
      const resp = await fetchAllBids({
        username: context.username,
        is_selected: true,
      })
      setSelectedBids([...resp.data.results])
    }
    fetchPendingBids();
    fetchSelectedBids();
  }, [])

  const handleOnNext = async() => {
    console.log("Next page")
  }

  const handleOnPrev = async() => {
    console.log("Previous page")
  }

  const tableContent = (bids) => {
    return (
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
              {["Pet Owner", "Pet Name", "Start Date", "End Date", "Review"].map(item => {
                  return <TableCell key={item} align="right">{item}</TableCell>
              })}
          </TableRow>
        </TableHead>
        <TableBody>
          {bids.map((bid) => (
            <TableRow key={bid} hover>
              <TableCell component="th" scope="row">
                {bid.pname}
              </TableCell>
              <TableCell align="right">{bid.pet_name}</TableCell>
              <TableCell align="right">{bid.start_date.slice(0,10)}</TableCell>
              <TableCell align="right">{bid.end_date.slice(0, 10)}</TableCell>
              <TableCell align="right">{bid.review}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }


  return (
    <React.Fragment>
      <Typography variant="h2" align="center">
        View your bids
      </Typography>
      <Typography variant="h3" align="center">
        Pending
      </Typography>
      <TableUtil
        handleOnNext={handleOnNext} 
        handleOnPrev={handleOnPrev} 
        hasNext={pendingBids.length}
        hasPrev={0}
      >
        {tableContent(pendingBids)}
      </TableUtil>
      <Typography variant="h3" align="center">
        Selected
      </Typography>
      <TableUtil
        handleOnNext={handleOnNext} 
        handleOnPrev={handleOnPrev} 
        hasNext={selectedBids.length}
        hasPrev={0}
      >
        {tableContent(selectedBids)}
      </TableUtil>
    </React.Fragment>
    
  );
};

// ViewBidsTable.propTypes = {
//   className: PropTypes.string,
//   customers: PropTypes.array.isRequired
// };

export default ViewBidsTable;
