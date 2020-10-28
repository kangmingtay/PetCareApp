import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { UserContext } from '../UserContext';
import SideBar from '../components/SideBar';

const ProfilePage = () => {
    const { context, setContext } = useContext(UserContext);
    return (
        <div>
            <SideBar/>
            <h1> Welcome to the Profile Page! </h1>
            <h3>Username: {context.username}</h3>
            <h3>Login Status: {context.isLoggedIn.toString()}</h3>
            <h3>Admin Status: {context.isAdmin.toString()}</h3>
        </div>
    );
}

export default ProfilePage;