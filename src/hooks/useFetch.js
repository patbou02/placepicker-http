import { useEffect } from 'react';
import { fetchUserPlaces } from '../http.js';

function useFetch() {
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchUserPlaces();
        setUserPlaces(places);
      } catch (error) {
        setErrorUpdatingPlaces({ message: error.message || 'Failed to fetch user places.' });
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, []);
}

export default useFetch;