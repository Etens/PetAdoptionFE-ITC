import React, { useContext } from 'react'

import './SignupSelect.css'
import Button from 'react-bootstrap/Button';
import { PetsContext } from '../../../../../contexts/PetsContext';

export default function SignupSelect(props) {
    const {classSignup} = useContext(PetsContext);
    return (
        <div>
            <Button variant='link' 
                className={classSignup}
                onClick={props.onClick}>
                SIGN UP
            </Button>
        </div>
    )
}