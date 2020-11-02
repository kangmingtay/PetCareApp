import React, { Fragment, useState } from "react";

const Bids = () => {
  const payGrade = 0.9;

  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [pets, setPets] = useState([]);
  const [salary, setSalary] = useState([]);
  const [busyMonth, setBusyMonth] = useState([]);
  const [caretakers, setCaretakers] = useState([]);

  const getData = async (e) => {
    e.preventDefault();
    var start = "01-" + month + "-" + year;
    var end;
    switch (month) {
      case "2":
      case "02":
        end = "28-" + month + "-" + year;
        break;
      case "4":
      case "6":
      case "9":
      case "11":
      case "04":
      case "06":
      case "09":
        end = "30-" + month + "-" + year;
        break;
      default:
        end = "31-" + month + "-" + year;
    }
    var response;
    var jsonData;
    try {
      switch (e.target.value) {
        case "pets":
          response = await fetch(
            `http://localhost:8888/api/admin/bids/${start}/${end}`
          );
          jsonData = await response.json();
          setPets(jsonData);
          break;
        case "salary":
          response = await fetch(
            `http://localhost:8888/api/admin/payment/${name}/${start}/${end}`
          );
          jsonData = await response.json();
          setSalary(jsonData);
          break;
        case "month":
          var i = 1;
          while (i <= 12) {
            response = await fetch(
              `http://localhost:8888/api/admin/bids/${start}/${end}`
            ).then((compare) => {
              start = "01-" + i + "-" + year;
              end = "28-" + i + "-" + year;
            });
            jsonData = await response.json();
            setBusyMonth(jsonData);
            console.log(jsonData);
            i++;
          }
          break;
        case "caretaker":
          response = await fetch(
            `http://localhost:8888/api/admin/bids/${name}/${start}/${end}`
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

  function monthName(num) {
    switch (num) {
      case "1":
        return "Jan";
      case "2":
        return "Feb";
      case "3":
        return "Mar";
      case "4":
        return "Apr";
      case "5":
        return "May";
      case "6":
        return "Jun";
      case "7":
        return "Jul";
      case "8":
        return "Aug";
      case "9":
        return "Sep";
      case "10":
        return "Oct";
      case "11":
        return "Nov";
      case "12":
        return "Dec";
    }
  }

  const getBusiestMonth = (e) => {
    var maxJobs = 0;
    var maxMonth = [];
    for (var i = 1; i <= 12; i++) {
      setMonth(i);
      console.log(month);
      getData(e);
      var length = busyMonth.length;
      if (maxJobs < length) {
        maxJobs = length;
        maxMonth = [];
        maxMonth.push(i);
      } else if (maxJobs == length) {
        maxMonth.push(i);
      }
    }
    console.log(maxMonth);
  };

  return (
    <Fragment>
      <form>
        <p>Enter care taker name:</p>
        <input
          type="text"
          name="caretaker"
          onChange={(e) => setName(e.target.value)}
        />
        <p>Enter month:</p>
        <input
          type="text"
          name="month"
          onChange={(e) => setMonth(e.target.value)}
        />
        <p>Enter year:</p>
        <input
          type="text"
          name="year"
          onChange={(e) => setYear(e.target.value)}
        />
      </form>
      <br />
      <button value="pets" onClick={getData}>
        Get number of pets cared for
      </button>
      <h3>Nunber of pets for month: {pets.length}</h3>
      <button value="salary" onClick={getData}>
        Get salary for care taker
      </button>
      <h3>
        Salary for {name} in {monthName(month)}:
        {salary.map((row, i) => (
          <div key={i}>{row.salary * payGrade}</div>
        ))}
      </h3>
      <button value="month" onClick={getData}>
        Get month with the most of jobs
      </button>
      <h3>
        Month with most jobs:
        {busyMonth.map((row, i) => (
          <div key={i}>{row.pet_name}</div>
        ))}
      </h3>
      <button value="caretaker" onClick={getData}>
        Get lazy caretakers
      </button>
      <h3>
        Caretakers:
        {caretakers.map((row, i) => (
          <div key={i}>{row.pet_name}</div>
        ))}
      </h3>
    </Fragment>
  );
};

export default Bids;
