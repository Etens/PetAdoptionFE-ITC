import React, { useContext } from 'react'

import './LoginSelect.css'
import Button from 'react-bootstrap/Button';
import { PetsContext } from '../../../../../contexts/PetsContext';

export default function LoginSelect(props) {
    const { classLogin } = useContext(PetsContext);
    return (
        <div>
            <Button variant='link'
                className={classLogin}
                onClick={props.onClick}>
                LOGIN
            </Button>
        </div>
    )
}
