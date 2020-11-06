import React from 'react';
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
    label: 'Base Price per day',
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState('');
  const [isOpened, setIsOpened] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (cname) => {
    setSelected(cname);
    console.log('CTable:', cname);
    props.setSelectedCaretaker(cname);
    props.isOpened(true);
  }

  const isSelected = (cname) => selected.indexOf(cname) !== -1;

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
                <TableRow >
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
                  const isItemSelected = isSelected(row.cname);
                  return (
                    <TableRow 
                      hover 
                      role="checkbox" 
                      tabIndex={-1} 
                      key={row.cname} 
                      onClick={() => handleRowClick(row.cname)}
                    >
                      {columns.map((column) => {
                        let value = row[column.id];
                        // console.log(column.id, value, column.id === 'rating', value == -1);
                        if (column.id === 'rating' && value == -1) {
                          // console.log(column.id, 'null rating');
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