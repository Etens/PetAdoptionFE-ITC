import React from 'react'
import { useLocation } from 'react-router-dom'

import './Header.css'
import LoginSignupButton from '../LoginSignupButton/LoginSignupButton'
import Sidenav from './Sidenav/Sidenav'
import ButtonAdminAddPet from './ButtonAdmin/ButtonAdminAddPet'
import ButtonAdminDashboard from './ButtonAdmin/ButtonAdminDashboard'

export default function Header() {
  const location = useLocation()

  return (
    <div>
      <nav className="navbar_container">
        <LoginSignupButton />
        {(location.pathname === '/admin' || location.pathname === '/admin/dashboard' || location.pathname === '/admin/addpet') && (
          <div className="admin-button-container">
            <ButtonAdminAddPet/>
            <ButtonAdminDashboard/>
          </div>
        )}
        <Sidenav />
      </nav>
    </div>
  )
}
