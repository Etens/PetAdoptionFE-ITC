import React from 'react'
import './LoginButton.css'

import Button from 'react-bootstrap/Button';

export default function LoginButton() {
  return (
    <div>
      <Button
        className="login-button"
        type="submit"
      >
        LOGIN
      </Button>
    </div>
  )
}
