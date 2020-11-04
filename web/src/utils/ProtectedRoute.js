import React, { Children, useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { UserContext } from '../UserContext';


const Container = ({Component, redirectLink, isAuthenticated, ...props}) => {
    if (isAuthenticated !== "true") {
        return <Navigate to={redirectLink} />        
    } 
    return Component
}

const ProtectedRoute = ({component: Component, redirectLink, path, ...props}) => {
    const { context } = useContext(UserContext)
    return <Route 
        path={path} 
        element={
            <Container 
                redirectLink={redirectLink}
                isAuthenticated={context.isLoggedIn}
                Component={Component}
            />
        }
    >
        {Children}
    </Route>
}

export default ProtectedRoute;