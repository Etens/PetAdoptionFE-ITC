import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import './PetsCard.css'
import PetsCardModal from './PetsCardModal/PetsCardModal';

export default function PetsCard({ pet }) {
  return (
    <div>
      <Card
        className='pet-card'>
        <Card.Img className='pet-card-image' variant="top" src={pet.picture} />
        <Badge bg={pet.adoptionStatus === 'adopted' ? 'success' : 'danger'}>{pet.adoptionStatus.toUpperCase()}</Badge>
        <Card.Body className='pet-card-body'>
          <Card.Title className='pet-card-title'>{pet.name.toUpperCase()}</Card.Title>
          <Button className='pet-card-button'>
            <PetsCardModal pet={pet} />
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

