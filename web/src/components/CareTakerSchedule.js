import React, { useEffect, useState, useContext,useRef } from "react";
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import {
    IconButton,
    Card,
    CardContent,
    makeStyles,
    Paper,
    Grid,
    Box,
    Container
} from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import { fetchExpectedSalary, fetchCareTakerCalendar, fetchCareTakerNotWorking, fetchCareTakerRating, deleteNotWorkingDays, postNotWorkingDays } from 'src/calls/careTakerCalls'
import { fetchUserType } from 'src/calls/userCalls'
import { UserContext } from 'src/UserContext';
import { useToasts } from 'react-toast-notifications'


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
    const [salary, setSalary] = useState('');
    const [schedule, setSchedule] = useState('');
    const [thisMonth, setThisMonth] = useState('');
    const [rating, setRating] = useState('');
    const [isFullTimer, setIsFullTimer] = useState('');
    const [petDays, setPetDays] = useState('');
    const { context, setContext } = useContext(UserContext);
    const calendar = useRef(null);
    const { addToast } = useToasts();
    const setFullTimer = async e => {
        try {
            const resp = await fetchUserType(context.username);
            setIsFullTimer(resp.data.results.isFullTimer === 1);
        } catch (err) {
            console.error(err.message);
        }
    }

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
                setPetDays(0);
            }
            else {
                setSalary(parseFloat(resp.data.results[0].salary).toFixed(2));
                setPetDays(resp.data.results[0].petdays);
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
    const deleteLeaveApplyAvailability = async e => {
        // e.preventDefault();
        if (e.schedule.title !== "UNAVAILABLE" && e.schedule.title !== "ON LEAVE") {
            return;
        }
        const selected_date = e.schedule.start;
        const message = e.schedule.title === "UNAVAILABLE" ? `Declared Availability on ${formatDate(selected_date)}` : `Deleted Leave on ${formatDate(selected_date)}`
        const applyB4message = e.schedule.title === "UNAVAILABLE" ? `Cannot declare availability before current date` : `Cannot delete leave before current date`
        try {
            if (selected_date < Date.now()) {
                addToast(applyB4message, {
                    appearance: 'error',
                    autoDismiss: true,
                });
            } else {
                const resp = await deleteNotWorkingDays({
                    username: context.username,
                    dates: `{${formatDate(selected_date)}}`
                });
                await onUpdate();
                if (resp.data.message === '1') {
                    addToast(message, {
                        appearance: 'success',
                        autoDismiss: true,
                    });
                }
            }

        } catch (err) {
            addToast(`Error`, {
                appearance: 'error',
                autoDismiss: true,
            });
            console.error(err.message);
        }
    }

    const applyLeaveDeleteAvailability = async e => {
        const selected_date = e.start;
        const message = isFullTimer ? `Leave on ${formatDate(selected_date)} Successfully Applied` : `Declared ${formatDate(selected_date)} as Unavailable`;
        try {
            if (selected_date < Date.now()) {

            } else {
                const resp = await postNotWorkingDays({
                    username: context.username,
                    dates: `{${formatDate(selected_date)}}`
                });
                if (resp.data.message === '1') {
                    addToast(message, {
                        appearance: 'success',
                        autoDismiss: true,
                    });
                }
            }

        } catch (err) {
            addToast(err.response.data.message, {
                appearance: 'error',
                autoDismiss: true,
            });
            console.error(err.response.data.message);
        }
        await onUpdate();
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
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
            color: '#ffffff',
        },
        {
            id: '1',
            name: 'Unavailable',
            bgColor: '#222222',
            color: '#ffffff',
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
            return yyyy + '-' + mm
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

    useEffect(() => {
        onUpdate();
        getRating();
        setFullTimer();
    }, []);

    const classes = useStyles();

    return (
        <Container maxWidth={false}>
            <Box mt={3}>
                <div>
                    <Box mt={3}>
                        <Card>
                            <CardContent>
                                <div style={{ fontFamily: 'sans-serif' }} className={classes.root}>

                                    <Grid container spacing={3} mb={3} alignItems="stretch">
                                        <Grid item xs>
                                            <IconButton color="primary" aria-label="left" onClick={prevMonth}>
                                                <KeyboardArrowLeft />
                                            </IconButton>
                                            <IconButton color="primary" aria-label="today" onClick={currentMonth}>
                                                Today
                                </IconButton>
                                            <IconButton color="primary" aria-label="right" onClick={nextMonth}>
                                                <KeyboardArrowRight />
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
                                            <Paper className={classes.paper}>Pet Days: {petDays}</Paper>
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
                                        theme={classes.calendar}
                                        useCreationPopup={false}
                                        onClickSchedule={deleteLeaveApplyAvailability}
                                        onBeforeCreateSchedule={applyLeaveDeleteAvailability}
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