import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Copyright from '../components/Copyright';
import { createUserAccount } from '../calls/loginCalls';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const RegisterPage = (props) => {
    const classes = useStyles();

    const [state, setState] = useState({
        username: '',
        password: '',
        email: '',
        address: '',
        isAdmin: false,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let invalidFields = []
            Object.keys(state).forEach((key) => {
                if (state[key] === "") {
                    invalidFields.push(key);
                }
            })
            if (invalidFields.length !== 0) {
                throw invalidFields;
            }
            let resp = await createUserAccount(state);
            if (resp.data.success === true) {
                props.history.push("/login");
                alert("Account created successfully!")
            }
        }
        catch(err) {
            if (Array.isArray(err)) {
                let message = `${err.join(", ")} field(s) are required!`;
                alert(message);
            } else {
                // err.response.data.message -> to see actual error msg
                alert("Username already exists! Please use another username.")
            }
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fname"
                                    name="username"
                                    variant="outlined"
                                    required                                    
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    autoFocus
                                    onChange={(e) => setState({...state, username: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    onChange={(e) => setState({...state, email: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(e) => setState({...state, password: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="address"
                                    label="Address"
                                    type="address"
                                    id="address"
                                    onChange={(e) => setState({...state, address: e.target.value})}
                                />
                            </Grid>
                        </Grid>
                        <FormControlLabel
                            control = {<Checkbox
                                checked={state.isAdmin}
                                onChange={() => setState({...state, isAdmin: !state.isAdmin})}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />}
                            label="I am a PCS Administrator"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button> 
                        <Grid container>
                            <Grid item xs={12}>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>  
                    </form>
                </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default RegisterPage;