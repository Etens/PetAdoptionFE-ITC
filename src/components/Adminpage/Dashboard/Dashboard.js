import React, { useState, useEffect } from 'react';

import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie, faTrash, faInfoCircle, } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card';
import PetsCard from '../../../components/Searchpage/PetsList/PetsCard/PetsCard';

import './Dashboard.css';
import '../../../components/Searchpage/PetsList/PetsCard/PetsCard.css';

export default function Dashboard() {
  const [users, setUsers] = useState([])
  const MySwal = withReactContent(Swal)
  const [pets, setPets] = useState([]);
  const [currentView, setCurrentView] = useState('users');

  useEffect(() => {
    axios.get('http://localhost:3002/users/')
      .then(res => {
        setUsers(res.data)
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    return async () => {
      axios.get('http://localhost:3002/pets')
        .then(res => {
          console.log(res.data.pets)
          setPets(res.data.pets);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [])


  function deleteUser(userId, firstName) {
    MySwal.fire({
      title: 'Are you sure?',
      text: `${firstName} will be deleted !`,
      icon: 'warning',
      background: '#b1776a',
      showCancelButton: true,
      confirmButtonText: 'Delete it !',
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3002/users/${userId}`)
          .then(res => {
            console.log(res);
            setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
          })
          .catch(err => {
            console.error(err);
          });
        MySwal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  function infoUser(userId, firstName, lastName, email, phone, bio) {
    MySwal.fire({
      title: `${firstName} ${lastName}`,
      html:
        `
      <i class="fa fa-envelope" aria-hidden="true"> </i> ${email}
        <br>
      <i class="fa fa-phone" aria-hidden="true"> </i> ${phone}
      <br>
        ${bio ? `<i class="fa fa-info-circle" aria-hidden="true"> </i> ${bio} <br> <br>` : ''}
      <br>
      <i class="fa fa-paw" aria-hidden="true"></i>
        <br>
        Pet 1
        <br>
        Pet 2 
      `,
      icon: 'info',
      background: '#b1776a',
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: 'Close',
      buttonsStyling: false
    });
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-texte">Manage users and view their information, click on the pets button to display all pets in the database</p>
      <Button className="dashboard-button" onClick={() => 
        setCurrentView(currentView === 'users' ? 'pets' : 'users')}>
        {currentView === 'users' ? 'Show Pets' : 'Show Users'}
      </Button>

      {currentView === 'users' ?
      <div className="dashboard-users">
        {users.map(user => (
          <Card className="dashboard-card">
            <Card.Body className="dashboard-card-body">
              <FontAwesomeIcon icon={user.role === 'admin' ? faUserTie : faUser} className="dashboard-icon" />
              <Card.Title className='dashboard-card-title'>{user.firstName}</Card.Title>
              <Card.Title className='dashboard-card-title'>{user.lastName}</Card.Title>
              <Card.Text className="dashboard-card-button">
                <Button className="dashboard-button-trash" onClick={() => deleteUser(user.id, user.firstName)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button className="dashboard-button-info" onClick={() => infoUser(user.id, user.firstName, user.lastName, user.email, user.phoneNumber, user.bio)}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
      :
        <div className="dashboard-pets">
          {pets.map(pet => (
            <PetsCard pet={pet} />
          ))}
        </div>
      }
    </div>
  )
}
