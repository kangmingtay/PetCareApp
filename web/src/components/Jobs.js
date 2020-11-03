import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const Jobs = () => {
  const payGrade = 0.9;

  const [name, setName] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const [pets, setPets] = useState([]);
  const [salary, setSalary] = useState([]);
  const [busyMonth, setBusyMonth] = useState([]);
  const [caretakers, setCaretakers] = useState([]);

  const getData = async e => {
    e.preventDefault();
    var start = '01-' + month + '-' + year;
    var end;
    switch (month) {
      case '2':
      case '02':
        end = '28-' + month + '-' + year;
        break;
      case '4':
      case '6':
      case '9':
      case '11':
      case '04':
      case '06':
      case '09':
        end = '30-' + month + '-' + year;
        break;
      default:
        end = '31-' + month + '-' + year;
    }
    var response;
    var jsonData;
    try {
      switch (e.currentTarget.value) {
        case 'pets':
          response = await fetch(
            `http://localhost:8888/api/admin/bids/${start}/${end}`
          );
          jsonData = await response.json();
          setPets(jsonData);
          break;
        case 'salary':
          response = await fetch(
            `http://localhost:8888/api/admin/payment/${name}/${start}/${end}`
          );
          jsonData = await response.json();
          setSalary(jsonData);
          break;
        case 'month':
          var monthList = [];
          for (var i = 0; i < 12; i++) {
            var from = '01-' + (i + 1) + '-' + year;
            var to = '28-' + (i + 1) + '-' + year;
            response = await fetch(
              `http://localhost:8888/api/admin/bids/${from}/${to}`
            );
            jsonData = await response.json();
            monthList[i] = jsonData;
          }
          getBusiestMonth(monthList);
          break;
        case 'caretaker':
          response = await fetch(
            `http://localhost:8888/api/admin/bids/${start}/${end}`
          );
          jsonData = await response.json();
          setCaretakers(jsonData);
          break;
        default:
          console.log(e.target.value);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  async function getBusiestMonth(monthList) {
    var maxJobs = 0;
    var maxMonth = [];
    for (var i = 0; i < 12; i++) {
      var length = monthList[i].length;
      if (maxJobs < length) {
        maxJobs = length;
        maxMonth = [];
        maxMonth.push(i + 1);
      } else if (maxJobs === length) {
        maxMonth.push(i + 1);
      }
    }
    setBusyMonth(maxMonth);
  }

  const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch'
      }
    }
  }));
  const classes = useStyles();

  return (
    <Fragment>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Employee name:"
          onChange={e => setName(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Month:"
          onChange={e => setMonth(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Year:"
          onChange={e => setYear(e.target.value)}
        />
      </form>
      <Button variant="contained" value="pets" onClick={getData}>
        Number of pets cared for
      </Button>
      <h3>
        Nunber of pets in month: <div>{pets.length}</div>
      </h3>
      <Button variant="contained" value="salary" onClick={getData}>
        Get salary for care taker
      </Button>
      <h3>
        Salary for {name}:
        {salary.map((row, i) => (
          <div key={i}>{row.salary * payGrade}</div>
        ))}
      </h3>
      <Button variant="contained" value="month" onClick={getData}>
        Get month with the most of jobs
      </Button>
      <h3>
        Month with most jobs:
        {busyMonth.map(row => (
          <li>{row}</li>
        ))}
      </h3>
      <Button variant="contained" value="caretaker" onClick={getData}>
        Get lazy caretakers
      </Button>
      <h3>
        Underperforming caretakers:
        {caretakers.map((row, i) => (
          <div key={i}>{row.cname}</div>
        ))}
      </h3>
    </Fragment>
  );
};

export default Jobs;
