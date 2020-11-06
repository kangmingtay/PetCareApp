import React, { Fragment, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { fetchPetDays, fetchRevenue, fetchRating } from 'src/calls/adminCalls';

const Underperform = ({ month, year }) => {
  const [lazy, setLazy] = useState([]);
  const [cheap, setCheap] = useState([]);
  const [useless, setUseless] = useState([]);

  const [minPetdays, setMinPetdays] = useState(30);
  const [minRevenue, setMinRevenue] = useState(3000);
  const [minRating, setMinRating] = useState(3);

  const getCaretakers = async e => {
    e.preventDefault();
    try {
      getLazyCaretakers();
      getCheapCaretakers();
      getUselessCaretakers();
    } catch (err) {
      console.error(err.message);
    }
  };

  async function getLazyCaretakers() {
    const response = await fetchPetDays({ month: month, year: year });
    var results = [...response.data.results];
    var lazyList = [];
    for (var i = 0; i < results.length; i++) {
      const days = results[i].pet_days;
      const name = results[i].cname;
      if (days < minPetdays) lazyList.push(name);
    }
    setLazy(lazyList);
  }

  async function getCheapCaretakers() {
    const response = await fetchRevenue({ month: month, year: year });
    var results = [...response.data.results];
    var cheapList = [];
    for (var i = 0; i < results.length; i++) {
      const revenue = results[i].revenue;
      const name = results[i].cname;
      if (revenue < minRevenue) cheapList.push(name);
    }
    setCheap(cheapList);
  }

  async function getUselessCaretakers() {
    const response = await fetchRating();
    var results = [...response.data.results];
    var uselessList = [];
    for (var i = 0; i < results.length; i++) {
      const rating = results[i].rating;
      const name = results[i].cname;
      if (rating < minRating) uselessList.push(name);
    }
    setUseless(uselessList);
  }

  return (
    <Fragment>
      <Button variant="contained" onClick={getCaretakers}>
        Get underperforming caretakers
      </Button>
      <h3>
        Less than 30 pet days:
        {lazy.map((row, i) => (
          <li key={i}>{row}</li>
        ))}
      </h3>
      <h3>
        Revenue brought in less than $3000:
        {cheap.map((row, i) => (
          <li key={i}>{row}</li>
        ))}
      </h3>
      <h3>
        Rating less than 3:
        {useless.map((row, i) => (
          <li key={i}>{row}</li>
        ))}
      </h3>
    </Fragment>
  );
};

export default Underperform;
