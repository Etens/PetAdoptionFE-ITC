import React from 'react'
import { useNavigate } from 'react-router-dom';

import './ButtonAdmin.css'
import Button from 'react-bootstrap/Button';

export default function ButtonAdminAddPet() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/admin/addpet');
    }

    return (
        <div>
            <Button 
                className='button-admin button-admin-addpet'
                onClick={handleClick}>
                ADD PET
            </Button>
        </div>
    )
}