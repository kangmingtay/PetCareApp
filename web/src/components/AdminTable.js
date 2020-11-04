import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { fetchAllUsersInfo } from 'src/calls/userCalls';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import theme from 'src/theme';

const useStyles = makeStyles({
  root: {
    padding: theme.spacing(4),
  },
  table: {
    minWidth: 650,
  },
});

const AdminTable = () => {
  const classes = useStyles();

  const [ users, setUsers ] = useState([]);
  const [ params, setParams] = useState({
    offset: 0,
    limit: 10,
    sort_category: "username",
    sort_direction: "+",
  })

  useEffect(() => {
    async function fetchData() {
      const resp = await fetchAllUsersInfo(params)
      setUsers([...resp.data.results]);
    }
    fetchData();
  }, [])

  const handleOnNext = async() => {
    const resp = await fetchAllUsersInfo({...params, offset: params.offset+10});
    setParams({...params, offset: params.offset+10});
    setUsers([...resp.data.results]);
  }

  const handleOnPrev = async() => {
    const offsetVal = (params.offset-10 === 0) ? 0: params.offset-10
    const resp = await fetchAllUsersInfo({...params, offset: offsetVal});
    setParams({...params, offset: offsetVal});
    setUsers([...resp.data.results]);
  }

  return (
    <React.Fragment>
      <Grid className={classes.root} container spacing={2} alignContent="center">
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Address</TableCell>
                  <TableCell align="right">Date Created</TableCell>
                  <TableCell align="right">Account Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.username}>
                    <TableCell component="th" scope="row">
                      {user.username}
                    </TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.address}</TableCell>
                    <TableCell align="right">{user.date_created.slice(0, 10)}</TableCell>
                    <TableCell align="right">{user.is_admin.toString() === "true" ? "Administrator" : "User"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6}>
          <Grid container justify="flex-start">
            <Button 
              value="previous"
              variant="contained" 
              color="primary" 
              startIcon={<NavigateBeforeIcon/>}
              onClick={handleOnPrev}
              disabled={(params.offset === 0) ? true: false}
            >
              Previous
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={6} >
          <Grid container justify="flex-end">
            <Button 
              variant="contained" 
              color="primary" 
              endIcon={<NavigateNextIcon/>}
              onClick={handleOnNext}
              disabled={(users.length === 0) ? true: false}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AdminTable;