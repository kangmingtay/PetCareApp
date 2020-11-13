import React, { useContext, useEffect, useState } from 'react';
import {
  makeStyles, Typography
} from '@material-ui/core';
import { useToasts } from 'react-toast-notifications'
import Container from '@material-ui/core/Container';
import TableUtil from '../UI/TableUtil';
import PendingBids from './PendingBids';
import { fetchAllBids } from 'src/calls/bidsCalls'
import { UserContext } from 'src/UserContext';
import SelectedBids from './SelectedBids';
import { updateSingleBid } from 'src/calls/bidsCalls'

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  table: {
    minWidth: 650,
  },
}));

const ViewBidsTable = () => {
  const classes = useStyles();

  const { addToast } = useToasts()

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

  const handleRowClick = async(bid) => {
    const resp = await updateSingleBid({
      username: context.username,
      pname: bid.pname,
      pet_name: bid.pet_name,
      start_date: bid.start_date,
      end_date: bid.end_date,
    })
    const newPendingBids = pendingBids.filter(item => item !== bid);
    
    console.log(resp.data.message);
    if (resp.data.success === true) {
      addToast(`You have accepted ${bid.pname}'s bid!`, {
        appearance: 'success',
        autoDismiss: true,
      })
      setPendingBids([...newPendingBids]);
      setSelectedBids([...selectedBids, bid]);
    } else {
      addToast(`Something went wrong! ${resp.data.message}!`, {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }

  return (
    <React.Fragment>
      <Typography variant="h3" align="center">
        Pending Bids
      </Typography>
      <TableUtil
        handleOnNext={handleOnNext} 
        handleOnPrev={handleOnPrev} 
        hasNext={pendingBids.length}
        hasPrev={0}
      >
        <PendingBids bids={pendingBids} handleClick={handleRowClick}/>
      </TableUtil>
      <Typography variant="h3" align="center">
        Accepted Bids
      </Typography>
      <TableUtil
        handleOnNext={handleOnNext} 
        handleOnPrev={handleOnPrev} 
        hasNext={selectedBids.length}
        hasPrev={0}
      >
        <SelectedBids bids={selectedBids} />
      </TableUtil>
    </React.Fragment>
    
  );
};

export default ViewBidsTable;
