import React, { useState, useContext } from 'react';
import axios from 'axios';
import Header from '../Homepage/Header/Header'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash, faUnlockAlt, faUser, faInfoCircle, faPhone, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { PetsContext } from '../../contexts/PetsContext';

import './ProfileSettingsPage.css'

export default function ProfileSettingsPage() {
  const { user } = useContext(PetsContext);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const tokenLocal = localStorage.getItem('token');


  const [formData, setFormData] = useState({
    email: user.email,
    password: '',
    confirmPassword: '',
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    bio: ""
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    bio: ''
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validate = (field, value) => {
    let emailError = '';
    let passwordError = '';
    let confirmPasswordError = '';
    let phoneNumberError = '';
    let bioError = '';

    if (field === 'email') {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(value)) {
        emailError = 'Invalid email address';
      }
    }

    if (field === 'password') {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (!passwordRegex.test(value)) {
        passwordError = 'Password not strong enough';
      }
    }

    if (field === 'confirmPassword') {
      if (value !== formData.password) {
        confirmPasswordError = 'Passwords do not match';
      }
    }

    if (field === 'phoneNumber') {
      const phoneNumberRegex = /^\d{10}$/;
      if (!phoneNumberRegex.test(value)) {
        phoneNumberError = 'Invalid phone number (must be 10 digits)';
      }
    }

    if (field === 'bio') {
      if (value.length > 200) {
        bioError = 'Bio must be less than 200 characters';
      }
    }

    setErrors({
      ...errors,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
      phoneNumber: phoneNumberError,
      bio: bioError
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    validate(id, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      bio: formData.bio.trim()
    });
    const { email: emailError, password: passwordError, confirmPassword: confirmPasswordError, phoneNumber: phoneNumberError, bio: bioError } = errors;
    if (emailError || passwordError || confirmPasswordError || phoneNumberError || bioError) {
      setServerError('Please fix the errors in the form');
      setTimeout(() => {
        setServerError('');
      }, 7000);
    } else {
      setServerError('');
      const requestOptions = {
        method: 'PUT',
        token: tokenLocal,
        user: { ...formData },
      };
      axios.put(`http://localhost:3002/users/${user.id}`, requestOptions)
        .then(response => {
          setServerError('');
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 7000);
        })
        .catch(error => {
          setServerError(error.response.data);
          setTimeout(() => {
            setServerError('');
          }, 7000);
          console.log(error);
          console.log(requestOptions);
          console.log(error.response);
        });
    }
  };

  return (
    <div className='profile-settings-header'>
      <Header />
      <div className='profile-settings'>
        <h1 className='title-profile-settings'>Modify your account information</h1>
        <p className='text-profile-settings'>Fill out the form below to change your account information, keep fill fields blank if you do not wish to change them</p>
        <div className="text-server-error"
          style={{ display: serverError ? 'block' : 'none' }}>
          <Alert variant="danger" className="text-error-profile-settings">
            {serverError}
          </Alert>
        </div>
        <div className="text-success"
          style={{ display: success ? 'block' : 'none' }}>
          <Alert variant="success" className="text-success-profile-settings">
            Your account information has been updated<br />
            Please refresh the page to see the changes
          </Alert>
        </div>
        <Form onSubmit={handleSubmit} className='form-profile-settings'>
          <Form.Group controlId="role">
            <div className="input-icon">
              <Form.Control type="text" value={user.role} disabled className='input-role' />
              <span className="icon-profile">
                <FontAwesomeIcon icon={faUserCog} title='Role' />
              </span>
            </div>
          </Form.Group>
          <Form.Group controlId="email">
            <div className="input-icon">
              <Form.Control type="email" onChange={handleChange} className={errors.email ? 'error-focus' : ''} placeholder={user.email ? user.email : 'Enter your email'} />
              <div className="text-profile-settings-error" style={{ display: errors.email ? 'block' : 'none' }}>
                <Alert variant="danger" className="text-error-profile-settings">
                  {errors.email}
                </Alert>
              </div>
              <span className="icon-profile">
                <FontAwesomeIcon icon={faEnvelope} title='Email' />
              </span>
            </div>
          </Form.Group>
          <Form.Group controlId="password">
            <div className='input-icon'>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                onChange={handleChange}
                className={errors.password ? 'error-focus' : ''}
                placeholder="Enter a new password"
              />
              <span className='eye-icon' onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
              <span className="icon-profile">
                <FontAwesomeIcon icon={faUnlockAlt} title='Password' />
              </span>
              <div className="text-error-profile-settings" style={{ display: errors.password ? 'block' : 'none' }}>
                <Alert variant="danger">
                  {errors.password}
                </Alert>
              </div>
            </div>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <div className='input-icon'>
              <Form.Control
                type={showConfirmPassword ? 'text' : 'password'}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error-focus' : ''}
                placeholder="Confirm new password"
              />
              <span className='eye-icon' onClick={toggleConfirmPasswordVisibility}>
                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
              </span>
              <span className="icon-profile">
                <FontAwesomeIcon icon={faLock} title='Confirm Password' />
              </span>
              <div className="text-error-profile-settings" style={{ display: errors.confirmPassword ? 'block' : 'none' }}>
                <Alert variant="danger">
                  {errors.confirmPassword}
                </Alert>
              </div>
            </div>
          </Form.Group>
          <Form.Group controlId="firstName">
            <div className="input-icon">
              <Form.Control type="text" onChange={handleChange} className={errors.firstName ? 'error-focus' : ''} placeholder={user.firstName ? user.firstName : 'Enter your first name'} />
              <div className="text-error-profile-settings" style={{ display: errors.firstName ? 'block' : 'none' }}>
                <Alert variant="danger">
                  {errors.firstName}
                </Alert>
              </div>
              <span className="icon-profile">
                <FontAwesomeIcon icon={faUser} title='First Name' />
              </span>
            </div>
          </Form.Group>
          <Form.Group controlId="lastName">
            <div className="input-icon">
              <Form.Control type="text" onChange={handleChange} className={errors.lastName ? 'error-focus' : ''} placeholder={user.lastName ? user.lastName : 'Enter your last name'} />
              <div className="text-error-profile-settings" style={{ display: errors.lastName ? 'block' : 'none' }}>
                <Alert variant="danger" >
                  {errors.lastName}
                </Alert>
              </div>
              <span className="icon-profile">
                <FontAwesomeIcon icon={faUser} title='Last Name' />
              </span>
            </div>
          </Form.Group>
          <Form.Group controlId="phoneNumber">
            <div className="input-icon">
              <Form.Control type="text" onChange={handleChange} className={errors.phoneNumber ? 'error-focus' : ''} placeholder={user.phoneNumber ? user.phoneNumber : 'Enter your phone number'} />
              <div className="text-error-profile-settings" style={{ display: errors.phoneNumber ? 'block' : 'none' }}>
                <Alert variant="danger">
                  {errors.phoneNumber}
                </Alert>
              </div>
              <span className="icon-profile">
                <FontAwesomeIcon icon={faPhone} title='Phone Number' />
              </span>
            </div>
          </Form.Group>
          <Form.Group controlId="bio">
            <div className="input-icon">
              <Form.Control as="textarea" rows={1} onChange={handleChange} className={errors.bio ? 'error-focus' : ''} placeholder={user.bio ? user.bio : 'Tell us about yourself'} />
              <div className="text-error-profile-settings" style={{ display: errors.bio ? 'block' : 'none' }}>
                <Alert variant="danger">
                  {errors.bio}
                </Alert>
              </div>
              <span className="icon-profile">
                <FontAwesomeIcon icon={faInfoCircle} title='Bio' />
              </span>
            </div>
          </Form.Group>
          <Button className="submit-profile-settings " type="submit">
            Update
          </Button>
        </Form>
      </div>
    </div>
  )
}
