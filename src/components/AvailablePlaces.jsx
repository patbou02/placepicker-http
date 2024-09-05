import { useState, useEffect } from 'react';

import ErrorMsg from './Error.jsx';
import Places from './Places.jsx';
import { sortPlacesByDistance } from '../loc.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);        // LOADING State
  const [availablePlaces, setAvailablePlaces] = useState([]); // DATA State
  const [error, setError] = useState(null);                   // ERROR State

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const response = await fetch('http://localhost:3000/places');
        const resData = await response.json();

        if (!response.ok) {
          throw new Error('Could not fetch places.');
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
          const sortedPlaces = sortPlacesByDistance(resData.places, position.coords.latitude, position.coords.longitude);
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError({ message: error.message || 'An unknown error occurred!' });
        setIsFetching(false);
      }
    }
    
    fetchPlaces();
  }, []);

  if (error) {
    return <ErrorMsg title="An Error Occurred!" message={error.message} onConfirm={() => setError(null)} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Loading places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
