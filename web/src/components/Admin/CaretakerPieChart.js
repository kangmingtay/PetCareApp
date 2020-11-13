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
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const getPetsInfo = async () => {
      try {
        const response = await fetchCaredFor({
          month: props.month, 
          year: props.year,
          username: props.cname,
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
          innerRadius={0.3}
          outerRadius={0.5}
        />
        <Title text="Pets cared for by caretaker" />
        <Legend />
        <Animation />
      </Chart>
    </Paper>
  );
};

export default CaretakerPieChart;
