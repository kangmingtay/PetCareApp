import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import {
  Box,
  Container,
  Typography,
} from '@material-ui/core';
import { UserContext } from 'src/UserContext';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableList: {
    marginTop: theme.spacing(3),
  },
}));

const columns = [
  {
    id: 'petName',
    label: 'Pet Name',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'cName',
    label: 'Caretaker Name',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'startDate',
    label: 'Start Date',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'endDate',
    label: 'End Date',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'review',
    label: 'Review',
    minWidth: 80,
    align: 'center',
  },
];


export default function PastPets(props) {
  const classes = useStyles();
  const { context } = useContext(UserContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [pets, setPets] = useState([]);

  const [values, setValues] = useState({
    petName: '',
    cName: '',
    startDate: new Date(),
    endDate: new Date(),
    review: '',
  });

  useEffect(() => {
    fetchPets();
  }, [])

  const fetchPets = async () => {
    // const resp = await fetchPetsUnderCare({ 
    //   pName: context.username,
    //   currDate: new Date(),
    // });
    // setPets([...resp.data.results])
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container maxWidth={false}>
      <Box mt={12}>
        <Typography variant="h3" align="center" color="textPrimary">
          Current Pets Under Care
        </Typography>
        <Paper className={classes.root, classes.tableList}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              {/* Head below */}
              <TableHead>
                <TableRow>
                 {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {/* Body below */}
              <TableBody>
                {pets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow 
                      hover 
                      role="checkbox" 
                      tabIndex={-1} 
                      key={row.cname}
                    >
                      {columns.map((column) => {
                        let value = row[column.id];
                        if (column.id === 'rating' && value == -1) {
                          value = '-';
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={1}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Container>
  );
}
