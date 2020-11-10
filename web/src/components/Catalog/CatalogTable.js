import React, { useState } from 'react';
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

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableList: {
    marginTop: theme.spacing(3),
  },
}));

const columns = [
  { id: 'cname', label: 'Caretaker Name', minWidth: 100, align: 'left' },
  { id: 'rating', label: 'Rating', minWidth: 30, align: 'center', },
  {
    id: 'category',
    label: 'Pet Category',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'minprice',
    label: 'Total Price',
    minWidth: 50,
    align: 'center',
  },
  {
    id: 'address',
    label: 'Area',
    minWidth: 100,
    align: 'center',
  },
];

export default function CatalogTable(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (cname, minprice) => {
    console.log('CTable:', cname, minprice);
    props.setSelectedCaretaker({
      cname: cname,
      minprice: minprice,
    });
    props.setMainValues({
      ...props.mainValues,
      paymentAmt: minprice,
    });
    props.isOpened(true);
  }

  return (
    <Container maxWidth={false}>
      <Box mt={3}>
        <Typography variant="h3" align="left" color="textPrimary">
          Step 3: Select your caretaker
        </Typography>
        <Paper className={classes.root, classes.tableList}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
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
              <TableBody>
                {props.caretakers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow 
                      hover 
                      role="checkbox" 
                      tabIndex={-1} 
                      key={row.cname} 
                      onClick={() => handleRowClick(row.cname, row.minprice)}
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
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={props.caretakers.length}
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