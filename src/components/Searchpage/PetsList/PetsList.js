import React, { useContext, useEffect } from 'react';
import { PetsContext } from '../../../contexts/PetsContext';
import PetsCard from './PetsCard/PetsCard';

import './PetsList.css';

export default function PetsList() {
  const { petsCard, setPetsCard } = useContext(PetsContext);
  const { setHandleSearch } = useContext(PetsContext);
  const { setShowIllustration } = useContext(PetsContext);

//   useEffect(() => {
//     setHandleSearch(() => {
//       return async event => {
//         event.preventDefault();
//         const pets = await generateRandomPets(4);
//         const petsArray = Object.entries(pets);
//         if (Array.isArray(petsArray)) {
//           setShowIllustration(false);
//           setPetsCard(petsArray.map(pet => {
//             const [id, petData] = pet;
//             return <PetsCard key={id} pet={petData} />;
//           }));
//         } else {
//           console.error('pets is not an array');
//         }
//       };
//     });
//   }, [setHandleSearch, setPetsCard, setShowIllustration]);

  return (
    <div className="pets-list">
      {petsCard}
    </div>
  );
}