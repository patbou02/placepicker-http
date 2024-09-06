import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { updateUserPlaces, fetchUserPlaces } from './http.js';
import ErrorMsg from './components/Error.jsx';
import { useFetch } from './hooks/useFetch.js';

function App() {
  const selectedPlace = useRef();

  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { isFetching, error, fetchedData: userPlaces} = useFetch(fetchUserPlaces, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  // async function handleSelectPlace(selectedPlace) {
  //   // If using this code instead of the line below, it would be best to use
  //   // a "loading" spinner to show the app is working on the request.
  //   // await updateUserPlaces([selectedPlace, ...userPlaces]);
  //
  //   setUserPlaces((prevPickedPlaces) => {
  //     if (!prevPickedPlaces) {
  //       prevPickedPlaces = [];
  //     }
  //     if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
  //       return prevPickedPlaces;
  //     }
  //     return [selectedPlace, ...prevPickedPlaces];
  //   });
  //
  //   try {
  //     // using 'optimistic update' to update the State immediately while the HTTP request
  //     // is processed behind the scenes so no need for a "loading" spinner in this case.
  //     await updateUserPlaces([selectedPlace, ...userPlaces]);
  //   } catch(error) {
  //     setUserPlaces(userPlaces); // if an error occurs, revert to the previous state.
  //     setErrorUpdatingPlaces({ message: error.message || 'Failed to update places.' });
  //   }
  // }
  //
  // const handleRemovePlace = useCallback(async function handleRemovePlace() {
  //   setUserPlaces((prevPickedPlaces) =>
  //     prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
  //   );
  //
  //   try {
  //     await updateUserPlaces(
  //       userPlaces.filter(place => place.id !== selectedPlace.current.id)
  //     );
  //   } catch (error) {
  //     setUserPlaces(userPlaces); // if an error occurs, revert to the previous state.
  //     setErrorUpdatingPlaces({ message: error.message || 'Failed to delete place.' });
  //   }
  //
  //
  //   setModalIsOpen(false);
  // }, [userPlaces]);

  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && (
          <ErrorMsg
            title="An error occurred!"
            //message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          />
        )}
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          //onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {error && <ErrorMsg title="An error occurred!" message={error.message} onConfirm={handleError}/>}
        {!error && (
          <Places
            title="I'd like to visit ..."
            fallbackText="Select the places you would like to visit below."
            places={userPlaces}
            isLoading={isFetching}
            loadingText={'Fetching your places...'}
            onSelectPlace={handleStartRemovePlace}
          />
        )}

        <AvailablePlaces
          //onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
