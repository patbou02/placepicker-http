import { useState, useEffect } from 'react';

import ErrorMsg from './Error.jsx';
import Places from './Places.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);        // LOADING State
  const [availablePlaces, setAvailablePlaces] = useState([]); // DATA State
  const [error, setError] = useState(null);                   // ERROR State

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition(
          (position) => {
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
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
