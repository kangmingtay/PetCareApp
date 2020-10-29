import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { UserContext } from './UserContext';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './util/ProtectedRoute';

function App() {
  const [context, setContext] = useState({
    username: "",
    isLoggedIn: false,
    isAdmin: false,
  })

  return (
    <React.Fragment>
      <UserContext.Provider value={{ context, setContext }}> 
          <div className="App">
            <BrowserRouter>
                <Switch>
                    <ProtectedRoute exact path="/">
                      <HomePage/>
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/profile">
                      <ProfilePage/>
                    </ProtectedRoute>
                    <Route exact path="/login" render={props => (
                      <LoginPage {...props} />
                    )} />
                    <Route exact path="/register" render={props => (
                      <RegisterPage {...props} />
                    )} />
                    
                </Switch>
            </BrowserRouter>
          </div>
        </UserContext.Provider>
    </React.Fragment>
  );
}

export default App;
