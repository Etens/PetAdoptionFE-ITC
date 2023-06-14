import React, { useState, useContext } from 'react'

import './Signup.css'

import Form from 'react-bootstrap/Form';
import SignupButton from '../../SignupButton/SignupButton';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash, faUnlockAlt, faUser, faUsers, faPhone } from '@fortawesome/free-solid-svg-icons';
import { PetsContext } from '../../../../../../contexts/PetsContext';

export default function Signup(props) {
    const { formData, setFormData } = useContext(PetsContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [serverError, setServerError] = useState('');
    const { setLogin } = useContext(PetsContext);
    const { setUser } = useContext(PetsContext);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: ''
    });

    const [isValid] = useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
        validate(event.target.id, event.target.value);
    };

    const validate = (field, value) => {
        let emailError = '';
        let passwordError = '';
        let confirmPasswordError = '';
        let phoneNumberError = '';

        if (field === 'email') {
            const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!value.match(emailRegex)) {
                emailError = 'Invalid email address';
            }
        }

        if (field === 'password') {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            if (!value.match(passwordRegex)) {
                passwordError = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number';
            }
        }

        if (field === 'confirmPassword') {
            if (value !== formData.password) {
                confirmPasswordError = 'Passwords do not match';
            }
        }

        if (field === 'phoneNumber') {
            const phoneNumberRegex = /^\d{10}$/;
            if (!value.match(phoneNumberRegex)) {
                phoneNumberError = 'Invalid phone number (must be 10 digits)';
            }
        }

        setErrors({
            ...errors,
            [field]: emailError || passwordError || confirmPasswordError || phoneNumberError
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (errors.email === '' && errors.password === '' && errors.phoneNumber === '') {
            axios.post('http://localhost:3002/signup/', formData)
                .then(response => {
                    console.log(response.data);
                    Cookies.set('token', response.data.token);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    setLogin(true);
                    setUser(response.data.user);
                    props.onHide();
                })
                .catch(error => {
                    setServerError(error.response.data);
                    console.log(formData);
                });
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="signup-form">
            <div className="text-server-error"
                style={{ display: serverError ? 'block' : 'none' }}>
                <Alert variant="danger">
                    Server Error: {serverError}
                </Alert>
            </div>
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <div className="input-icon">
                    <Form.Control type="email" onChange={handleChange} className={errors.email ? 'error-focus' : ''} />
                    <Form.Text className="text-error">
                        {errors.email}
                    </Form.Text>
                    <span className="icon">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                </div>
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <div className='input-icon'>
                    <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        onChange={handleChange}
                        className={errors.password ? 'error-focus' : ''}
                    />
                    <span className='eye-icon' onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                    <span className="icon">
                        <FontAwesomeIcon icon={faUnlockAlt} />
                    </span>
                    <Form.Text className="text-error">
                        {errors.password}
                    </Form.Text>
                </div>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <div className='input-icon'>
                    <Form.Control
                        type={showConfirmPassword ? 'text' : 'password'}
                        onChange={handleChange}
                        className={errors.confirmPassword ? 'error-focus' : ''}
                    />
                    <span className='eye-icon' onClick={toggleConfirmPasswordVisibility}>
                        <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                    </span>
                    <span className="icon">
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                </div>
                <Form.Text className="text-error">
                    {errors.confirmPassword}
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <div className="input-icon">
                    <Form.Control type="text" onChange={handleChange} />
                    <span className="icon">
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                </div>
            </Form.Group>
            <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <div className="input-icon">
                    <Form.Control type="text" onChange={handleChange} />
                    <span className="icon">
                        <FontAwesomeIcon icon={faUsers} />
                    </span>
                </div>
            </Form.Group>
            <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <div className="input-icon">
                    <Form.Control
                        type="text"
                        onChange={handleChange}
                        className={errors.phoneNumber ? 'error-focus' : ''}
                    />
                    <Form.Text className="text-error">
                        {errors.phoneNumber}
                    </Form.Text>
                    <span className="icon">
                        <FontAwesomeIcon icon={faPhone} />
                    </span>
                </div>
            </Form.Group>
            <Modal.Footer>
                <Button className='cancel-button' onClick={props.onHide}>
                    CANCEL
                </Button>
                <SignupButton isValid={isValid} />
            </Modal.Footer>
        </Form>
    )
}


