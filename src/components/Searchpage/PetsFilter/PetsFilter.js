import React, { useContext, useState } from 'react';

import './PetsFilter.css';
import PetsFilterButtonSearch from './PetsFilterButton/PetsFilterButtonSearch';
import PetsFilterButtonSearchBasic from './PetsFilterButton/PetsFilterButtonSearchBasic';
import PetsFilterButtonSearchAdvanced from './PetsFilterButton/PetsFilterButtonSearchAdvanced';
import { PetsContext } from '../../../contexts/PetsContext';

export default function PetsFilter() {
  const [searchType, setSearchType] = useState('');
  const { options, setOptions } = useContext(PetsContext);
  const { handleSearch } = useContext(PetsContext);

  return (
    <div>
      <div className='pets-filter-button'>
        <div className='search-basic'>
          <PetsFilterButtonSearchBasic onClick={() => setSearchType('basic')}></PetsFilterButtonSearchBasic>
        </div>
        <div className='search-advanced'>
          <PetsFilterButtonSearchAdvanced onClick={() => setSearchType('advanced')}></PetsFilterButtonSearchAdvanced>
        </div>
      </div>
      {searchType === 'basic' && (
        <form className='pets-filter' onSubmit={handleSearch}>
          <div className='pets-filter-header'>
            <label>
              Type
              <select value={options.type} onChange={event => setOptions({ ...options, type: event.target.value })}>
                <option value="all">All</option>
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
              </select>
            </label>
          </div>
          <div className='pets-filter-footer'>
            <PetsFilterButtonSearch type='submit'></PetsFilterButtonSearch>
          </div>
        </form>
      )}
      {searchType === 'advanced' && (
        <form className='pets-filter' onSubmit={handleSearch}>
          <div className='pets-filter-header'>
            <label>
              Type
              <select value={options.type} onChange={event => setOptions({ ...options, type: event.target.value })}>
                <option value="all">All</option>
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
              </select>
            </label>
            <label>
              Adoption status
              <select value={options.adoptionStatus} onChange={event => setOptions({ ...options, adoptionStatus: event.target.value })}>
                <option value="all">All</option>
                <option value="pending">Foster</option>
                <option value="adopted">Adopted</option>
              </select>
            </label>
            <label>
              Size
              <select value={options.size} onChange={event => setOptions({ ...options, size: event.target.value })}>
                <option value="all">All</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </label>
            <label>
              Color
              <select value={options.color} onChange={event => setOptions({ ...options, color: event.target.value })}>
                <option value="all">All</option>
                <option value="black">Black</option>
                <option value="white">White</option>
                <option value="brown">Brown</option>
                <option value="grey">Grey</option>
              </select>
            </label>
            <label>
              Breed
              <select value={options.breed} onChange={event => setOptions({ ...options, breed: event.target.value })}>
                <option value="all">All</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
              </select>
            </label>
            <div className='pets-filter-weight'>
              <label>
                Min Weight in (CM)
                <input
                  type="number"
                  value={options.minHeight}
                  onChange={event => setOptions({ ...options, minHeight: event.target.value })}
                  min={1}
                  max={100}
                />
              </label>
              <label>
                Max Weight in (CM)
                <input
                  type="number"
                  value={options.maxHeight}
                  onChange={event => setOptions({ ...options, maxHeight: event.target.value })}
                  min={1}
                  max={100}
                />
              </label>
            </div>
            <label>
              Dietary restrictions
              <select value={options.dietaryRestrictions} onChange={event => setOptions({ ...options, dietaryRestrictions: event.target.value })}>
                <option value="all">All</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="gluten-free">Gluten-free</option>
                <option value="no-nuts-or-dairy">No nuts or dairy</option>
                <option value="hypoallergenic">Hypoallergenic</option>
                <option value="low-protein">Low-protein</option>
                <option value="vegan">Vegan</option>
                <option value="grain-free">Grain-free</option>
                <option value="allergy-friendly">Allergy-friendly</option>
                <option value="sensitive-stomach">Sensitive stomach</option>
                <option value="kidney-friendly">Kidney-friendly</option>
                <option value="low-fat">Low-fat</option>
                <option value="low-sodium">Low-sodium</option>
                <option value="dental-health">Dental health</option>
                <option value="weight-management">Weight management</option>
              </select>
            </label>
            <div className='pets-filter-footer'>
              <PetsFilterButtonSearch type='submit'></PetsFilterButtonSearch>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
