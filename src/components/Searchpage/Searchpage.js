import React, { useContext } from 'react';

import Header from '../Homepage/Header/Header';
import PetsFilter from './PetsFilter/PetsFilter';
import PetsList from './PetsList/PetsList';
import { PetsContext } from '../../contexts/PetsContext';
import Illustration from '../../images/CatandDog.gif';

import './Searchpage.css'

export default function SearchPage() {
  const { showIllustration } = useContext(PetsContext)

  return (
    <div>
      <Header />
      <PetsFilter />
      {showIllustration && (
        <div className='image-search'>
          <img className='search-image' src={Illustration} alt='Cat and Dog' />
        </div>
      )}
      <PetsList />
    </div>
  )
}
