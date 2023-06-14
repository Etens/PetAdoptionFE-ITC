import React, { useState, useContext } from 'react';

import './Login.css';

import Form from 'react-bootstrap/Form';
import LoginButton from '../../LoginButton/LoginButton';

import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { PetsContext } from '../../../../../../contexts/PetsContext';

export default function Login(props) {
  const { setLogin } = useContext(PetsContext);
  const [error, setError] = useState('');
  const { setUser } = useContext(PetsContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3002/login/', formData)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setLogin(true);
        setUser(response.data.user);
        props.onHide();
      })
      .catch((error) => {
        setError('Invalid email or password');
      }
      );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

    return (
      <div>
        <div className="error-message"
          style={{ display: error ? 'block' : 'none' }}
        >
          <Alert variant="danger">
            {error}
          </Alert>
        </div>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <div className="input-icon">
              <Form.Control
                value={formData.email}
                onChange={handleChange}
                type="email"
                autoFocus
              />
              <span className="icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <div className='input-icon'>
              <Form.Control
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? 'text' : 'password'}
              />
              <span className='eye-icon' onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
              <span className="icon">
                <FontAwesomeIcon icon={faLock} />
              </span>
            </div>
          </Form.Group>
          <div className="footer-form">
            <Button className='cancel-button' onClick={props.onHide}>
              CANCEL
            </Button>
            <LoginButton />
          </div>
        </Form>
      </div>
    );
  }
