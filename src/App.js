import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRouteUser from './components/PrivateRoutes/PrivateRouteUser';
import PrivateRouteAdmin from './components/PrivateRoutes/PrivateRouteAdmin';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Homepage from './components/Homepage/Homepage';
import SearchPage from './components/Searchpage/Searchpage';
import ProfileSettingsPage from './components/ProfileSettingsPage/ProfileSettingsPage';
import AdminPage from './components/Adminpage/Adminpage';
import { PetsContext } from './contexts/PetsContext';
import axios from 'axios';

export default function App() {
  const [classLogin, setClassLogin] = useState('login-select-active');
  const [classSignup, setClassSignup] = useState('signup-select');
  const [login, setLogin] = useState(false);
  const [petsCard, setPetsCard] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [showIllustration, setShowIllustration] = useState(true);
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {});
  const [role, setRole] = useState('user');
  const [modalDashboardOpen, setModalDashboardOpen] = useState(false);

  const [options, setOptions] = useState({
    type: 'all',
    adoptionStatus: 'all',
    size: 'all',
    color: 'all',
    breed: 'all',
    dietaryRestrictions: 'all'
  });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    bio: '',
  });

  const [handleSearch, setHandleSearch] = useState(() => {
    return event => {
      event.preventDefault();
    }
  });

  useEffect(() => {
    const tokenLocal = localStorage.getItem('token');
    const userLocal = localStorage.getItem('user');
    if (tokenLocal) {
      setLogin(true);
      axios.get(`http://localhost:3002/users/${JSON.parse(userLocal).id}`)
        .then(res => {
          setUser(res.data);
          setRole(res.data.role);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      setLogin(false);
    }
  }, [login]);

  return (
    <PetsContext.Provider value={{
      classLogin, setClassLogin, classSignup, setClassSignup, login, setLogin,
      options, setOptions, handleSearch, setHandleSearch, petsCard, setPetsCard, imageUrl, setImageUrl, showIllustration, setShowIllustration,
      formData, setFormData, user, setUser, role, setRole, modalDashboardOpen, setModalDashboardOpen
    }}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/" element={<Homepage />} />
            <Route
              path="/profile-settings"
              element={
                <PrivateRouteUser>
                  <ProfileSettingsPage />
                </PrivateRouteUser>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRouteAdmin>
                  <AdminPage />
                </PrivateRouteAdmin>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRouteAdmin>
                  <AdminPage />
                </PrivateRouteAdmin>
              }
            />
            <Route
              path="/admin/addpet"
              element={
                <PrivateRouteAdmin>
                  <AdminPage />
                </PrivateRouteAdmin>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </PetsContext.Provider>
  );
}