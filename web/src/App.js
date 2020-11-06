import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import ProfilePage from './pages/ProfilePage';
import BeCareTakerPage from './pages/BeCareTakerPage';
import FindCareTakerPage from './pages/FindCareTakerPage';
import PetOwnerPage from './pages/PetOwnerPage';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './utils/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import { UserContext } from './UserContext';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  const [context, setContext] = useState({
    username: localStorage.getItem('username'),
    isLoggedIn: localStorage.getItem('isLoggedIn'),
    isAdmin: localStorage.getItem('isAdmin'),
  })
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <UserContext.Provider value={{ context, setContext }}>
        <Routes>
          <ProtectedRoute 
            component={<DashboardLayout/>}
            redirectLink="/login" 
            path="/app"
          >
            <Route 
              path="admin" 
              element={context.isAdmin === "true" ? <AdminPage /> : <Navigate to="/app/dashboard" />} 
            />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="caretakers" element={<BeCareTakerPage />} />
            <Route path="catalogue" element={<FindCareTakerPage />} />
            <Route path="pets" element={<PetOwnerPage />} />
            <Route path="account" element={<ProfilePage />} />
          </ProtectedRoute>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/" element={<Navigate to="/app/admin" />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;
