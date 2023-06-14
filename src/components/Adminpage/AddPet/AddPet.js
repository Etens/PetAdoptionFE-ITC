import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Chance } from 'chance';
import { faker } from '@faker-js/faker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faPaw, faHome, faImage, faRulerVertical, faWeight, faPalette, faQuoteLeft, faMedkit, faUtensils, faPenNib } from '@fortawesome/free-solid-svg-icons';
import { PetsContext } from '../../../contexts/PetsContext';
import uuid from 'react-uuid';

import './AddPet.css';

export default function AddPet() {
  const { role } = useContext(PetsContext);
  const [type, setType] = useState('dog');
  const inputImageLocalRef = useRef();
  const inputImageRandomRef = useRef();
  const [showImage, setShowImage] = useState(false);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    id: uuid(),
    name: '',
    adoptionStatus: '',
    picture: '',
    height: '',
    weight: '',
    color: '',
    bio: '',
    hypoallergenic: false,
    dietaryRestrictions: '',
    breed: '',
  });

  const resetForm = () => {
    setType('dog');
    setServerError('');
    setTimeout(() => {
      setSuccess(false);
    }, 7000);
    setForm({
      name: '',
      adoptionStatus: '',
      picture: '',
      height: '',
      weight: '',
      color: '',
      bio: '',
      hypoallergenic: false,
      dietaryRestrictions: '',
      breed: '',
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const pet = {
      role,
      type,
      ...form
    };
    axios.post('http://localhost:3002/pet', pet, {
      headers: {
        'Content-Type': 'application/json',
        'User-Role': role
      }
    }).then((response) => {
      setSuccess(true);
      resetForm();
    })
      .catch((error) => {
        setServerError(error.response.data.message);
      }
      );
  }

  const handleImageChange = (event) => {
    inputImageRandomRef.current.value = '';
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, picture: reader.result });
    }
    reader.readAsDataURL(file);
  }

  const generateRandomName = (event) => {
    event.preventDefault();
    const chance = new Chance();
    setForm({ ...form, name: chance.first() });
  }

  const generateRandomPicture = (event) => {
    event.preventDefault();
    inputImageLocalRef.current.value = '';
    async function generateRandomPictureDog() {
      const response = await axios.get('https://dog.ceo/api/breeds/image/random');
      return response.data.message;
    }
    async function generateRandomPictureCat() {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search');
      return response.data[0].url;
    }
    if (type === 'dog') {
      generateRandomPictureDog().then((response) => {
        setForm({ ...form, picture: response });
      });
    }
    if (type === 'cat') {
      generateRandomPictureCat().then((response) => {
        setForm({ ...form, picture: response });
      });
    }
  }

  const generateRandomHeight = (event) => {
    event.preventDefault();
    const chance = new Chance();
    setForm({ ...form, height: chance.integer({ min: 1, max: 100 }) });
  }

  const generateRandomWeight = (event) => {
    event.preventDefault();
    const chance = new Chance();
    setForm({ ...form, weight: chance.integer({ min: 1, max: 100 }) });
  }

  const generateRandomColor = (event) => {
    event.preventDefault();
    const colors = ['black', 'white', 'brown', 'grey'];
    const chance = new Chance();
    setForm({ ...form, color: chance.pickone(colors) });
  }

  const generateRandomBio = (event) => {
    event.preventDefault();
    const bioDog = faker.helpers.arrayElement(['This dog is a real sweetheart! He loves snuggling and spending time with his humans. He is the perfect companion for those looking for a loyal and affectionate dog.', 'This dog is a real playmate! He loves playing and having fun, and will be the perfect companion for sports and outdoor activity enthusiasts.', 'This dog is a real genius! He is very intelligent and easy to train, and loves learning new things. He is the perfect companion for those looking for a dog that can be trained to perform various tasks.'])
    const bioCat = faker.helpers.arrayElement(['This cat is a real sweetheart! He loves snuggling and spending time with his humans. He is very social and gets along with everyone.', 'This cat is a real sunshine! He is always in a good mood and loves playing with anything he can find. He is the perfect companion for those looking for a ball of energy.', 'This cat is a real gem! He is very cuddly and affectionate, and loves spending time with his humans. He is a very calm and poised cat who will adapt to any situation.']);
    if (type === 'dog') {
      setForm({ ...form, bio: bioDog });
    }
    if (type === 'cat') {
      setForm({ ...form, bio: bioCat });
    }
  }

  const generateRandomDietaryRestrictions = (event) => {
    event.preventDefault();
    const restrictions = faker.helpers.arrayElement(['Vegetarian', 'Gluten-free', 'No nuts or dairy', 'Hypoallergenic', 'Low-protein', 'Vegan', 'Grain-free', 'Allergy-friendly', 'Sensitive stomach', 'Kidney-friendly', 'Low-fat', 'Low-sodium', 'Dental health', 'Weight management'])
    setForm({ ...form, dietaryRestrictions: (restrictions) });
  }

  const generateRandomBreed = (event) => {
    event.preventDefault();
    const breadDog = faker.animal.dog();
    const breadCat = faker.animal.cat();
    if (type === 'dog') {
      setForm({ ...form, breed: breadDog });
    }
    if (type === 'cat') {
      setForm({ ...form, breed: breadCat });
    }
  }

  return (
    <div className="add-pet-form">
      <h1 className='title-add-pet'>Add a new pet to the database!</h1>
      <p className='text-add-pet'>Fill out the form below to add a new pet to the database. You can also generate random data for each field by clicking on the buttons.</p>
      <div className="text-server-error-add-pet "
        style={{ display: serverError ? 'block' : 'none' }}>
        <Alert variant="danger">
          {serverError}
        </Alert>
      </div>
      <div className="text-success"
        style={{ display: success ? 'block' : 'none' }}>
        <Alert variant="success">
          Pet added successfully!
        </Alert>
      </div>
      <Form onSubmit={handleSubmit} className="form-add-pet">
        <Form.Group controlId="type">
          <div className="select-icon">
            <span className="icon-pet">
              <FontAwesomeIcon icon={faPaw} title="Type" />
            </span>
            <Form.Control as="select" value={type} onChange={(event) => setType(event.target.value)}>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </Form.Control>
          </div>
        </Form.Group>
        <Form.Group controlId="adoptionStatus">
          <div className="select-icon">
            <span className="icon-pet">
              <FontAwesomeIcon icon={faHome} title="Adoption Status" />
            </span>
            <Form.Control as="select" value={form.adoptionStatus} onChange={(event) => setForm({ ...form, adoptionStatus: event.target.value })}>
              <option value="available">Available</option>
              <option value="fostered">Fostered</option>
              <option value="adopted">Adopted</option>
            </Form.Control>
          </div>
        </Form.Group>
        <Form.Group controlId="hypoallergenic">
          <div className="select-icon">
            <span className="icon-pet">
              <FontAwesomeIcon icon={faMedkit} title="Hypoallergenic" />
            </span>
            <Form.Control as="select" value={form.hypoallergenic} onChange={(event) => setForm({ ...form, hypoallergenic: event.target.value })}>
              <option value="true">True</option>
              <option value="false">False</option>
            </Form.Control>
          </div>
        </Form.Group>
        <Form.Group controlId="name">
          <div className="input-icon">
            <span className="icon-pet">
              <FontAwesomeIcon icon={faPenNib} title="Name" />
            </span>
            <Form.Control type="text" placeholder="Enter name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          </div>
          <Button variant="outline-secondary" className='random-button' onClick={generateRandomName}>Random name</Button>
        </Form.Group>
        <Form.Group controlId="picture">
          <div className="input-icon">
            <span className="icon-pet">
              <FontAwesomeIcon icon={faImage} title="Picture" />
            </span>
            <Form.Control
              type="text"
              ref={inputImageRandomRef}
              placeholder="Enter picture URL"
              value={form.picture}
              onChange={(event) => setForm({ ...form, picture: event.target.value })}
              onMouseEnter={() => setShowImage(true)} onMouseLeave={() => setShowImage(false)} />
            <Form.Control type="file" ref={inputImageLocalRef} onChange={handleImageChange} />
            {showImage && <div className="image-preview"><img className="image-form" src={form.picture} alt="Preview" /></div>}
          </div>
          <Button variant="outline-secondary" className='random-button' onClick={generateRandomPicture}>Random picture</Button>
        </Form.Group>
        <Form.Group controlId="height">
          <div className="input-icon">
            <span className="icon-pet">
              <FontAwesomeIcon icon={faRulerVertical} title="Height" />
            </span>
            <Form.Control type="text" placeholder="Enter height" value={form.height} onChange={(event) => setForm({ ...form, height: event.target.value })} />
          </div>
          <Button variant="outline-secondary" className='random-button' onClick={generateRandomHeight}>Random height</Button>
        </Form.Group>
        <Form.Group controlId="weight">
          <div className="input-icon">
            <span className="icon-pet">
              <FontAwesomeIcon icon={faWeight} title="Weight" />
            </span>
            <Form.Control type="text" placeholder="Enter weight" value={form.weight} onChange={(event) => setForm({ ...form, weight: event.target.value })} />
          </div>
          <Button variant="outline-secondary" className='random-button' onClick={generateRandomWeight}>Random weight</Button>
        </Form.Group>
        <Form.Group controlId="color">
          <div className="input-icon">
            <span className="icon-pet">
              <FontAwesomeIcon icon={faPalette} title="Color" />
            </span>
            <Form.Control type="text" placeholder="Enter color" value={form.color} onChange={(event) => setForm({ ...form, color: event.target.value })} />
          </div>
          <Button variant="outline-secondary" className='random-button' onClick={generateRandomColor}>Random color</Button>
        </Form.Group>
        <Form.Group controlId="bio">
          <div className="input-icon">
            <span className="icon-pet">
              <FontAwesomeIcon icon={faQuoteLeft} title="Bio" />
            </span>
            <Form.Control type="text" placeholder="Enter bio" value={form.bio} onChange={(event) => setForm({ ...form, bio: event.target.value })} />
          </div>
          <Button variant="outline-secondary" className='random-button' onClick={generateRandomBio}>Random bio</Button>
        </Form.Group>
        <Form.Group controlId="dietaryRestrictions">
          <div className="input-icon">
            <span className="icon-pet">
              <FontAwesomeIcon icon={faUtensils} title="Dietary Restrictions" />
            </span>
            <Form.Control type="text" placeholder="Enter dietary restrictions" value={form.dietaryRestrictions} onChange={(event) => setForm({ ...form, dietaryRestrictions: event.target.value })} />
          </div>
          <Button variant="outline-secondary" className='random-button' onClick={generateRandomDietaryRestrictions}>Random dietary restrictions</Button>
        </Form.Group>
        <Form.Group controlId="breed">
          <div className="input-icon">
            <span className="icon-pet">
              <FontAwesomeIcon icon={faTag} title="Breed" />
            </span>
            <Form.Control type="text" placeholder="Enter breed" value={form.breed} onChange={(event) => setForm({ ...form, breed: event.target.value })} />
          </div>
          <Button variant="outline-secondary" className='random-button' onClick={generateRandomBreed}>Random breed</Button>
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-button" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}




