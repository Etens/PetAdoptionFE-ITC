import React, { useState, useContext} from 'react'

import './LoginSignupButton.css'
import LoginSignupModal from './LoginSignupModal/LoginSignupModal'
import Button from 'react-bootstrap/Button';
import { PetsContext } from '../../../contexts/PetsContext';


export default function LoginSignupButton() {
    const [modalShow, setModalShow] = useState(false);
    const {login} = useContext(PetsContext);

    const handleLogout = () => {
      localStorage.removeItem('token');
      window.location.reload();
    };

    return (
      <>
        {login ? (
          <Button className='logout_button' onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button className='login_signup_button' onClick={() => setModalShow(true)}>
            Login/Signup
          </Button>
        )}
        <LoginSignupModal show={modalShow} onHide={() => setModalShow(false)}
        />
      </>
    );
}
  
