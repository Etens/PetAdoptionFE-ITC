import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { faPaw, faHeart, faRulerVertical, faWeight, faPalette, faInfoCircle, faAllergies, faAppleAlt, faDog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './PetsCardModal.css';

export default function PetCardModal({ pet }) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <div variant="primary" onClick={handleShowModal}>
        SEE MORE
      </div>
      <Modal size="sm" show={showModal} onHide={handleCloseModal} className='pets-modal'>
        <div className='pets-modal-header'>
          <img className='pets-modal-image' src={pet.picture} alt={pet.name} />
          <h3 className='pets-modal-name'>{pet.name}</h3>
        </div>
        <Modal.Body className='pets-modal-body'>
          <div className='pets-modal-body-first'>
            <p>
              <FontAwesomeIcon className='style_icon' title='TYPE' icon={faPaw} /> {pet.type}
            </p>
            <p>
              <FontAwesomeIcon className='style_icon' title='ADOPTION STATUS' icon={faHeart} /> {pet.adoptionStatus}
            </p>
          </div>
          <div className='pets-modal-body-second'>
            <p>
              <FontAwesomeIcon className='style_icon' title='BREED:' icon={faDog} /> {pet.breed}
            </p>
            <p>
              <FontAwesomeIcon className='style_icon' title='HEIGHT' icon={faRulerVertical} /> {pet.height + ' cm'}
            </p>
            <p>
              <FontAwesomeIcon className='style_icon' title='WEIGHT' icon={faWeight} /> {pet.weight + ' lbs'}
            </p>
          </div>
          <div className='pets-modal-body-third'>
            <p>
              <FontAwesomeIcon className='style_icon' title='HYPOALLERGENIC' icon={faAllergies} /> {pet.hypoallergenic ? 'Yes' : 'No'}
            </p>
            <p>
              <FontAwesomeIcon className='style_icon' title='COLOR' icon={faPalette} /> {pet.color}
            </p>
            <p>
              <FontAwesomeIcon className='style_icon' title='DIETARY RESTRICTIONS' icon={faAppleAlt} /> {pet.dietaryRestrictions}
            </p>
          </div>
          <h3>
            <FontAwesomeIcon className='style_icon' title='BIO' icon={faInfoCircle} /> {pet.bio}
          </h3>
        </Modal.Body>
        <Modal.Footer className='pets-modal-footer'>
          <Button onClick={handleCloseModal} className='pets-modal-button-close'>
            CLOSE
          </Button>
          <Button className='pets-modal-button-save'>
            SAVE FOR LATER
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
