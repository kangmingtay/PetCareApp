import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { fetchAllUsersInfo } from 'src/calls/userCalls';
import { fetchCaretakers } from 'src/calls/adminCalls';
import theme from 'src/theme';
import TableUtil from 'src/components/UI/TableUtil';

const useStyles = makeStyles({
  root: {
    padding: theme.spacing(4)
  },
  table: {
    minWidth: 650
  },
  hover: {},
  rowNormal: {
    color: 'green'
  },

  rowHighlight: {
    color: 'red'
  }
});

const CaretakerTable = props => {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const [caretakers, setCaretakers] = useState([]);
  const [params, setParams] = useState({
    offset: 0,
    limit: 10,
    sort_category: 'username',
    sort_direction: '+'
  });

  useEffect(() => {
    async function fetchData() {
      const resp = await fetchAllUsersInfo(params);
      setUsers([...resp.data.results]);
      const response = await fetchCaretakers({
        month: props.month,
        year: props.year
      });
      setCaretakers([...response.data.results]);
    }
    fetchData();
  }, [props]);

  const handleOnNext = async () => {
    const resp = await fetchAllUsersInfo({
      ...params,
      offset: params.offset + 10
    });
    setParams({ ...params, offset: params.offset + 10 });
    setUsers([...resp.data.results]);
  };

  const handleOnPrev = async () => {
    const offsetVal = params.offset - 10 === 0 ? 0 : params.offset - 10;
    const resp = await fetchAllUsersInfo({ ...params, offset: offsetVal });
    setParams({ ...params, offset: offsetVal });
    setUsers([...resp.data.results]);
  };

  const tableContent = (
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          {['Caretaker', 'Email', 'Salary', 'Revenue', 'Pet Days', 'Rating', 'Type'].map(item => {
            return (
              <TableCell key={item} align="right">
                {item}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {caretakers.map((user, i) => (
          <TableRow key={i} hover>
            <TableCell>{user.cname}</TableCell>
            <TableCell align="right">{user.email}</TableCell>
            <TableCell align="right">{Math.round(user.salary * 100) / 100}</TableCell>
            <TableCell align="right" className={user.revenue < 3000 && user.isfulltimer ? classes.rowHighlight : classes.rowNormal}>
              {Math.round(user.revenue * 100) / 100}
            </TableCell>
            <TableCell align="right" className={user.pet_days < 30 && user.isfulltimer ? classes.rowHighlight : classes.rowNormal}>
              {user.pet_days}
            </TableCell>
            <TableCell align="right"className={user.rating < 3000 && user.isfulltimer ? classes.rowHighlight : classes.rowNormal}>
              {user.rating}
            </TableCell>
            <TableCell align="right">{parseInt(user.isfulltimer) === 1 ? 'Full-Time' : 'Part-Time'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <TableUtil
      handleOnNext={handleOnNext}
      handleOnPrev={handleOnPrev}
      hasNext={users.length}
      hasPrev={params.offset}
    >
      {tableContent}
    </TableUtil>
  );
};

CaretakerTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default CaretakerTable;
