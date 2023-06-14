import React from 'react'
import './SignupButton.css'

import Button from 'react-bootstrap/Button';

export default function SignupButton() {
  return (
    <div>
      <Button
        className="signup-button"
        type="submit"
      >
        SIGNUP
      </Button>
    </div>
  )
}
