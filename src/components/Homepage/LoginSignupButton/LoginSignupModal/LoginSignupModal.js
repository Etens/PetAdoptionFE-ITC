import React, { useState, useContext } from 'react';

import './LoginSignupModal.css';

import Modal from 'react-bootstrap/Modal';

import LoginSelect from './LoginSelect/LoginSelect';
import SignupSelect from './SignupSelect/SignupSelect';
import Login from './LoginSelect/Login/Login';
import Signup from './SignupSelect/Signup/Signup';
import LoginIllustration from '../../../../images/Login.gif';
import SignupIllustration from '../../../../images/Signup.gif';
import { PetsContext } from '../../../../contexts/PetsContext';

export default function LoginSignupModal(props) {
  const [LoginSelected, setLoginSelected] = useState(true);
  const {setClassLogin} = useContext(PetsContext);
  const {setClassSignup} = useContext(PetsContext);

  const handleLoginClick = () => {
    setLoginSelected(true);
    setClassLogin('login-select-active');
    setClassSignup('signup-select');
  };

  const handleSignupClick = () => {
    setLoginSelected(false);
    setClassSignup('signup-select-active');
    setClassLogin('login-select');
  };

  return (
    <Modal
      className='modal'
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="modal-container">
        <div className="modal-header">
          <SignupSelect
            onClick={handleSignupClick}
          />
          <LoginSelect
            onClick={handleLoginClick}
            className='login-select'
          />
        </div>
        <Modal.Body className="modal-body">
          {LoginSelected ? <Login onHide={props.onHide} /> : <Signup onHide={props.onHide} />}
        </Modal.Body>
      </div>
      <div className="modal-image" style={{ backgroundImage: `url(${LoginSelected ? LoginIllustration : SignupIllustration})` }}>
        {LoginSelected ? <img className="login-image" src={LoginIllustration} alt="Login Illustration" /> : <img className="signup-image" src={SignupIllustration} alt="Signup Illustration" />}
      </div>
    </Modal>
  );
}
