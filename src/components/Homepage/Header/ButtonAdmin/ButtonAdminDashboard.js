import React from 'react'
import { useNavigate } from 'react-router-dom';

import './ButtonAdmin.css'
import Button from 'react-bootstrap/Button';

export default function ButtonAdminDashboard() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/admin/dashboard');
    }

    return (
        <Button
            className='button-admin button-admin-dashboard'
            onClick={handleClick}>
            DASHBOARD
        </Button>
    );
}