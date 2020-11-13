import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
  ScatterSeries
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  ValueScale,
  ArgumentScale,
  Animation
} from '@devexpress/dx-react-chart';
import { curveCatmullRom, line } from 'd3-shape';
import { scalePoint } from 'd3-scale';
import { fetchRevenue } from 'src/calls/adminCalls';

const pointOptions = { point: { size: 10 } };
const Point = props => {
  const { value } = props;
  if (value) {
    return <ScatterSeries.Point {...props} {...pointOptions} />;
  }
  return null;
};
const Line = props => (
  <React.Fragment>
    <LineSeries.Path
      {...props}
      path={line()
        .x(({ arg }) => arg)
        .y(({ val }) => val)
        .curve(curveCatmullRom)}
    />
    <ScatterSeries.Path {...props} pointComponent={Point} />
  </React.Fragment>
);

const titleStyles = {
  title: {
    textAlign: 'center',
    width: '100%',
    marginBottom: '10px'
  }
};
const Text = withStyles(titleStyles)(props => {
  const { text, classes } = props;
  const [mainText, subText] = text.split('\\n');
  return (
    <div className={classes.title}>
      <Typography component="h3" variant="h5">
        {mainText}
      </Typography>
      <Typography variant="subtitle1">{subText}</Typography>
    </div>
  );
});

const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row'
  }
});
const legendLabelStyles = theme => ({
  label: {
    marginBottom: theme.spacing(1),
    whiteSpace: 'nowrap'
  }
});
const legendItemStyles = () => ({
  item: {
    flexDirection: 'column-reverse'
  }
});

const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const legendItemBase = ({ classes, ...restProps }) => (
  <Legend.Item className={classes.item} {...restProps} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(
  legendLabelBase
);
const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(
  legendItemBase
);

const useStyles = makeStyles(() => ({
  chart: {
    paddingRight: '60px',
    paddingLeft: '30px'
  },
  paper: {
    margin: '30px'
  }
}));

const AdminChart = props => {
  const classes = useStyles();
  const [chartData, setChartData] = useState([]);
  const [maxValue, setMaxValue] = useState([]);
  const modifyDomain = () => [-2000, maxValue];

  useEffect(() => {
    const getSalary = async () => {
      try {
        var data = [];
        var max = 0;
        const startMonth = props.month - 6;
        for (var i = startMonth; i < startMonth + 12; i++) {
          var mon = (i + 12) % 12;
          var yr = i < 0 ? props.year - 1 : i > 11 ? props.year + 1 : props.year;
          const response = await fetchRevenue({
            month: mon,
            year: yr
          });
          var results = [...response.data.results];
          var salary = parseInt(results[0].salary);
          var revenue = parseInt(results[0].revenue);
          data.push({
            month: props.monthList[mon] + ', ' + yr,
            salary: salary,
            revenue: revenue,
            profit: revenue - salary
          });
          if (revenue > max) max = revenue;
        }

        setMaxValue(max < 35000 ? 40000 : max + 5000);
        setChartData(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    getSalary();
  }, [props]);

  return (
    <Paper className={classes.paper}>
      <Chart data={chartData} className={classes.chart}>
        <ArgumentScale factory={scalePoint} />
        <ValueScale modifyDomain={modifyDomain} />
        <ArgumentAxis />
        <ValueAxis />
        <LineSeries
          name="Revenue"
          valueField="revenue"
          argumentField="month"
          seriesComponent={Line}
        />
        <LineSeries
          name="Cost"
          valueField="salary"
          argumentField="month"
          seriesComponent={Line}
        />
        <LineSeries
          name="Profit"
          valueField="profit"
          argumentField="month"
          seriesComponent={Line}
        />
        <Legend
          position="bottom"
          rootComponent={Root}
          itemComponent={Item}
          labelComponent={Label}
        />
        <Title text="Productivity\nOver 12 Months" textComponent={Text} />
        <Animation />
      </Chart>
    </Paper>
  );
};

export default AdminChart;
