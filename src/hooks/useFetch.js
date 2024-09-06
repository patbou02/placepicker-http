import { useEffect, useState } from 'react';

export function useFetch(fetchFunction) {
  const [isFetching, setIsFetching] = useState(); // LOADING State
  const [error, setError] = useState();           // ERROR State
  const [fetchedData, setFetchedData] = useState();   // DATA State

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFunction();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data.' });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFunction]);

  return { isFetching, error, fetchedData };
}