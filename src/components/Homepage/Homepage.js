import React, {useContext} from 'react'

import './Homepage.css'
import Header from '../Homepage/Header/Header'
import IllustrationLogout from '../../images/AdoptaPet.gif'
import IllustrationLogin from '../../images/Welcome.gif'
import { PetsContext } from '../../contexts/PetsContext';

export default function Homepage() {
  const {login} = useContext(PetsContext);
  const {user} = useContext(PetsContext);

  return (
    <div className='homepage'>
      <Header />
      {login
        ? <h1 className='homepage-title'>Welcome {user.firstName} {user.lastName}</h1>
        : <h1 className='homepage-title'>Welcome to the Pet Adoption Agency</h1>
      }
      {login
        ? <p className='homepage-text'>Click on the sidebar to access our services and find your new best friend
        <br />Adopt a pet and give them a loving home!</p>
        : <p className='homepage-text'>Go ahead and sign up or login to find your new best friend!</p>
      }
      {login 
        ? <img className='homepage-image-login' src={IllustrationLogin} alt='Welcome' /> 
        : <img className='homepage-image-logout' src={IllustrationLogout} alt='AdoptaPet' />
      }
    </div>
  )
}
