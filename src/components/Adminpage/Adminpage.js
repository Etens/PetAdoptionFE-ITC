import React from 'react'

import Header from '../Homepage/Header/Header';
import Dashboard from './Dashboard/Dashboard';
import AddPet from './AddPet/AddPet';

import { useLocation } from 'react-router-dom';

export default function Adminpage() {
  const location = useLocation();
  let component;

  if (location.pathname === '/admin/dashboard') {
    component = <Dashboard />;
  } else if (location.pathname === '/admin/addpet') {
    component = <AddPet />;
  }

  return (
    <div>
      <Header />
      {component}
    </div>
  );
}
