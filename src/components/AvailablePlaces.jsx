import ErrorMsg from './Error.jsx';
import Places from './Places.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';
import { useFetch } from '../hooks/useFetch.js';

export default function AvailablePlaces({ onSelectPlace }) {

  // navigator.geolocation.getCurrentPosition(
  //   (position) => {
  //     const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
  //     setAvailablePlaces(sortedPlaces);
  //     setIsFetching(false);
  //   });

  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
    setFetchedData: setAvailablePlaces,
  } = useFetch(fetchAvailablePlaces, []);

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
