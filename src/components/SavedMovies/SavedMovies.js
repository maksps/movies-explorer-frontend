import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import btnImagechecked from '../../images/icon-movie-delete.svg';
import btnImage from '../../images/icon-movie-delete.svg';
import mainApi from '../../utils/MainApi';

function SavedMovies({ preloaderVisible, loggedIn }) {
  const [savedMovies, setSavedMovies] = useState([]);
  const [numberCards, setNumberCards] = useState(0);
  const [screenWidth, setscreenWidth] = useState(window.innerWidth);
  const [isCheckShotMovie, setCheckShotMovie] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  const [filteredMovie, setFilteredMovie] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  useEffect(() => {
    setscreenWidth(window.innerWidth);
    setNumberCards(defineNumberCards());
    // if (localStorage.getItem('checkboxCheked')) {
    //   setCheckShotMovie(JSON.parse(localStorage.getItem('checkboxCheked')));
      
    // }
  }, []);

  useEffect(() => {
      if (loggedIn) {
      preloaderVisible(true);
      mainApi.getMovies()
        .then((data) => {
          setSavedMovies(data);
          setFilteredMovie(filter(searchKey, data))
        })
        .catch((err) => console.log(err))
        .finally(() => {
          preloaderVisible(false);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    const handleResize = (event) => {
      setscreenWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenWidth]);

  const defineNumberCards = () => {
    if (numberCards === 0) {
      if (screenWidth > 769) {
        return 12;
      }
      if (screenWidth <= 769 && screenWidth > 560) {
        return 8;
      }
      return 2;
    }
    if (screenWidth > 769) {
      return 3;
    }
    if (screenWidth <= 769 && screenWidth > 560) {
      return 2;
    }
    return 2;
  };

  function checkempty(form) {
    if (form == null
      || form.length === 0) {
      setInfoMessage('Нужно ввести ключевое слово');
      return true;
    }
    return false;
  }

  function filter(searchKey, data) {
    
    let resultFilter = [];
    if (isCheckShotMovie) {
      const shortMovies = data.filter((item) => item.duration <= 40);
      if (searchKey.length === 0) {
        resultFilter = shortMovies;
      } else {
        resultFilter = shortMovies.
        filter((item) => item.nameRU.toLowerCase().includes(searchKey.toLowerCase()));
      }
    } else {
      if (searchKey.length === 0) {
        resultFilter = data;
      } else {
        resultFilter = data.filter((item) => item.nameRU.toLowerCase().includes(searchKey.toLowerCase()));
      }
    }
    if (resultFilter.length === 0) { setInfoMessage('Ничего не найдено') } else { setInfoMessage(''); }
    return resultFilter;
  }

  useEffect(() => {
      setFilteredMovie(filter('', savedMovies));
  }, [isCheckShotMovie]);

  const handleSearch = (searchKey) => {
    if (!checkempty(searchKey)) {
      setFilteredMovie(filter(searchKey, savedMovies));
    }
  };

  function handleDeleteCard(savedMovies) {
    mainApi.deleteMovie(savedMovies._id).then(() => {
      console.log('Фильм удален');
      setFilteredMovie((state) => state.filter((c) => c._id !== savedMovies._id));
    }).catch((err) => console.log(err));
  }

  return (
    <div className="savedMovies">
      <SearchForm
        onSubmit={handleSearch}
        onCheckboxCheked={setCheckShotMovie}
      />
      <MoviesCardList
        movies={filteredMovie}
        btnImagechecked={btnImagechecked}
        btnImage={btnImage}
        nomberCards={numberCards}
        onClickBtn={handleDeleteCard}
        isSavedMovies
        infoMessage={infoMessage}
      />
    </div>
  );
}

export default SavedMovies;
