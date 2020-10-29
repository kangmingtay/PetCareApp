import React, { useContext } from 'react';
import { Redirect, Route }from 'react-router-dom';
import { UserContext } from '../UserContext';

const ProtectedRoute = ({ children, ...rest }) => {
    const {context, setContext} = useContext(UserContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                context.isLoggedIn ? (
                children
            ) : (
                <Redirect
                    to={{
                    pathname: "/login",
                    state: { from: location }
                    }}
                />
            )}
        />
    );
}

export default ProtectedRoute;