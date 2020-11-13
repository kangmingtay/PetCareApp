import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Title,
  Legend
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { fetchCaredFor } from '../../../src/calls/adminCalls';

const CaretakerPieChart = props => {
  const data = [
    { region: 'Asia', val: 4119626293 },
    { region: 'Africa', val: 1012956064 },
    { region: 'Northern America', val: 344124520 },
    { region: 'Latin America and the Caribbean', val: 590946440 },
    { region: 'Europe', val: 727082222 },
    { region: 'Oceania', val: 35104756 }
  ];

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const getPetsInfo = async () => {
      try {
        const response = await fetchCaredFor({
          month: props.month, 
          year: props.year,
          username: 'cft2'
        });
        var results = [...response.data.results];

        var values = [];
        results.forEach(element => {
          values.push({
            pet_name: element.pet_name + ' (' + element.pname + "'s pet)",  // for valueField
            days: element.days,                                             // for argumentField
            pname: element.pname                                            // other data from fetch
          });
        });
        setChartData([...values]);
      } catch (err) {
        console.error(err.message);
      }
    };
    getPetsInfo();
  }, [props]);
  return (
    <Paper>
      <Chart data={chartData}>
        <PieSeries
          valueField="days"
          argumentField="pet_name"
          innerRadius={0.6}
        />
        <Title text="Pets cared for by caretaker" />
        <Legend />
        <Animation />
      </Chart>
    </Paper>
  );
};

export default CaretakerPieChart;
