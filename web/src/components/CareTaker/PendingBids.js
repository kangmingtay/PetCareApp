import React from 'react';
import { makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
}));

const PendingBids = (props) => {
    const classes = useStyles();
    const { bids, handleClick } = props;
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
                    <TableRow key={bid.pet_name} hover onClick={() => handleClick(bid)}>
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

export default PendingBids;