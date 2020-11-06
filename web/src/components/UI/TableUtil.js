import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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

const TableUtil = (props) => {
  const classes = useStyles();

  /**
   * handleOnNext: function
   * handleOnPrev: function
   * hasNext: integer (0 or 1)
   * hasPrev: integer (0 or 1)
   */
  const { handleOnNext, handleOnPrev, hasNext, hasPrev } = props;

  return (
    <React.Fragment>
      <Grid className={classes.root} container spacing={2} alignContent="center">
        <Grid item xs={12}>
          <TableContainer component={Paper}>
              {props.children}
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
              disabled={(hasPrev === 0) ? true: false}
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
              disabled={(hasNext === 0) ? true: false}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default TableUtil;