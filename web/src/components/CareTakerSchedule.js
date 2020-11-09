import React, { Fragment, useEffect, useState, useContext, setState, useRef } from "react";
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import { 
    IconButton, 
    Button, 
    Card, 
    CardContent, 
    CardActions, 
    Typography, 
    makeStyles, 
    Paper, 
    Grid,
    Box,
    Container
} from '@material-ui/core';
import { AccessAlarm, KeyboardArrowLeft, KeyboardArrowRight, SpaceBar } from '@material-ui/icons';
// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import { fetchExpectedSalary, fetchCareTakerCalendar, fetchCareTakerNotWorking, fetchCareTakerRating } from 'src/calls/careTakerCalls'
import { UserContext } from 'src/UserContext';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        
    },
    calendar: {
        padding: theme.spacing(2)
    }
}));


const CareTakerSchedule = () => {
    const [salary, setSalary] = useState('salary');
    const [schedule, setSchedule] = useState('schedule');
    const [thisMonth, setThisMonth] = useState('month');
    const [rating, setRating] = useState('rating');
    const [petCategory, setPetCategory] = useState('petCategory');
    const { context, setContext } = useContext(UserContext);
    const calendar = useRef(null);
    const getSalary = async e => {
        // e.preventDefault();
        try {
            const month = await getMonth();
            const resp = await fetchExpectedSalary({
                username: context.username,
                month: month
            });
            if (resp.data.results.length === 0) {
                setSalary(0);
            }
            else {
                setSalary(parseFloat(resp.data.results[0].salary).toFixed(2));
            }
        } catch (err) {
            console.error(err.message);
        }
    };
    const getSchedule = async e => {
        try {
            const month = await getMonth();

            const respSchedule = await fetchCareTakerCalendar({
                username: context.username,
                month: month
            });

            const respNotWorking = await fetchCareTakerNotWorking({
                username: context.username,
                month: month
            });

            setSchedule((respSchedule.data.results).concat(respNotWorking.data.results));
        } catch (err) {
            console.error(err.message);
        }
    }
     const getRating = async e => {
        try {
            const resp = await fetchCareTakerRating(context.username);
            setRating(parseFloat(resp.data.results[0].rating).toFixed(2));
        } catch (err) {
            console.error(err.message);
        }
    }

    const schedules: ISchedule[] = [ //dates in leaves or not in availability are blacked out
        {
          calendarId: "0",
          category: "allday",
          title: "Study",
          body: "Test",
          start: "2020-11-01",
        },
        {
          calendarid: "0",
          category: "allday",
          title: "Meeting",
          body: "Description",
          start: new Date(),
        },
        {
          calendarid: "0",
          category: "allday",
          title: "aosjdfbaos",
          body: "Descriptioasdfpas",
          start: "2020-11-15",
        },
        {
            calendarid: "1",
            category: "allday",
            title: "Meeting",
            body: "Description",
            isVisible: false,
            start: Date.parse("2020-11-08"),
        }
      ];
    const calendars = [
    {
        id: '0',
        name: 'On Leave',
        bgColor: '#222222',
        color:   '#ffffff',
    },
    {
        id: '1',
        name: 'Unavailable',
        bgColor: '#222222',
        color:   '#ffffff',
    },
    {
        id: '2',
        name: 'Pet Day',
        bgColor: '#00a9ff', //blue
    },
    {
        id: '3',
        name: 'Pet Day',
        bgColor: '#ff99cc', //pink
    },
    {
        id: '4',
        name: 'Pet Day',
        bgColor: '#80ff80', //green
    },
    {
        id: '5',
        name: 'Pet Day',
        bgColor: '#ffff1a', //yellow
    },
    {
        id: '6',
        name: 'Pet Day',
        bgColor: '#ff4d4d', //red
    },
    {
        id: '7',
        name: 'Pet Day',
        bgColor: '#ff9933' //orange
    },
    {
        id: '8',
        name: 'Pet Day',
        bgColor: '#bf80ff', //purple
    },
    ];

    const nextMonth = async e => {
        e.preventDefault();
        try {
            await calendar.current.calendarInst.next();
            await onUpdate();
        } catch (error) {
            console.error(error.message);
        }
    };

    const prevMonth = async e => {
        e.preventDefault();
        try {
            await calendar.current.calendarInst.prev();
            await onUpdate();
        } catch (error) {
            console.error(error.message);
        }
    };

    const currentMonth = async e => {
        e.preventDefault();
        try {
            await calendar.current.calendarInst.setDate(new Date());
            await onUpdate();
        } catch (error) {
            console.error(error.message);
        }
    };

    const getMonth = async e => {
        // e.preventDefault();
        try {
            const d = await calendar.current.calendarInst.getDate().toDate();
            var mm = String(d.getMonth() + 1).padStart(2, '0');
            var yyyy = d.getFullYear();
            setThisMonth(mm + '-' + yyyy);
            return yyyy + '-' +  mm 
        } catch (error) {
            console.error(error.message);
        }
    };

    const onUpdate = async e => {
        try {
            await getSalary();
            await getSchedule();
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(()=>{
        onUpdate();
        getRating();
    },[]);

    const classes = useStyles();

    return (
        <Container maxWidth={false}>
            <Box mt={3}>
                <div>
                <Box mt={3}>
                    <Card>
                        <CardContent>
                            <div style = {{fontFamily: 'sans-serif'}} className={classes.root}>
                                
                            <Grid container spacing={3} mb={3} alignItems="stretch">
                                <Grid item xs>
                                <IconButton color="primary" aria-label="left" onClick={prevMonth}>
                                <KeyboardArrowLeft/>
                                </IconButton>
                                <IconButton color="primary" aria-label="today" onClick={currentMonth}>
                                Today
                                </IconButton>
                                <IconButton color="primary" aria-label="right" onClick={nextMonth}>
                                <KeyboardArrowRight/>
                                </IconButton>
                                </Grid>
                                
                                <Grid item xs>
                                <Paper className={classes.paper}>
                                    Month: {thisMonth}</Paper>
                                </Grid>
                                

                                <Grid item xs>
                                <Paper className={classes.paper}>Salary: ${salary}</Paper>
                                </Grid>
                                
                                <Grid item xs>
                                
                                <Paper className={classes.paper}>Rating: {rating}/5</Paper>

                                </Grid>
                            </Grid>
                                <Calendar
                                    ref={calendar}
                                    height="900px"
                                    calendars={calendars}
                                    disableDblClick={true}
                                    disableClick={false}
                                    isReadOnly={false}
                                    month={{
                                    startDayOfWeek: 0
                                    }}
                                    schedules={schedule}
                                    useDetailPopup={true}
                                    theme = {classes.calendar}
                                    useCreationPopup={true}
                                    view="month" // You can also set the `defaultView` option.
                                />
                            </div>
                        </CardContent>
                    </Card>
                </Box>
            </div>
        </Box>
    </Container>
    );
};

export default CareTakerSchedule;