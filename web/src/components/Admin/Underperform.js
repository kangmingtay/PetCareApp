import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';

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
    const response = await fetch(
      `http://localhost:8888/api/admin/caretakerdays/${month}/${year}`
    );
    const jsonData = await response.json();
    var lazyList = [];
    for (var i = 0; i < jsonData.length; i++) {
      const days = jsonData[i].pet_days;
      const name = jsonData[i].cname;
      if (days < minPetdays) lazyList.push(name);
    }
    setLazy(lazyList);
  }

  async function getCheapCaretakers() {
    const response = await fetch(
      `http://localhost:8888/api/admin/revenue/${month}/${year}`
    );
    const jsonData = await response.json();
    var cheapList = [];
    for (var i = 0; i < jsonData.length; i++) {
      const revenue = jsonData[i].revenue;
      const name = jsonData[i].cname;
      if (revenue < minRevenue) cheapList.push(name);
    }
    setCheap(cheapList);
  }

  async function getUselessCaretakers() {
    const response = await fetch(`http://localhost:8888/api/admin/rating`);
    const jsonData = await response.json();
    var uselessList = [];
    for (var i = 0; i < jsonData.length; i++) {
      const rating = jsonData[i].rating;
      const name = jsonData[i].cname;
      if (rating < minRating) uselessList.push(name);
    }
    // console.log(uselessList);
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
