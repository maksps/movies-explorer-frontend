import React, {useEffect, useState, useContext} from "react";
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';
import { LoggedInContext } from '../../contexts/LoggedInContext';
import btnImagechecked from '../../images/icon-movie-delete.svg';
import btnImage from '../../images/icon-movie-delete.svg';
import mainApi from "../../utils/MainApi";


function SavedMovies({preloaderVisible}) {
    const loggedIn = useContext(LoggedInContext);
    // const currentUser = useContext(CurrentUserContext);
    const [movies, setMovies] = useState([]);
    const [numberCards, setNumberCards] = useState(0);
    const [screenWidth, setscreenWidth] = useState(window.innerWidth);
    const [isCheckShotMovie, setCheckShotMovie] = useState(false);


    useEffect(() => {
        // movieApi.getMovies().then(data => {
        //     setMovies(data)
        // });
        setscreenWidth(window.innerWidth);
        setNumberCards(defineNumberCards())
    }, []);

    useEffect(() => {
        if (loggedIn) {
            preloaderVisible(true);
            mainApi.getMovies()
            .then((data) => {
                setMovies(data);
            })
            .catch((err) => console.log(err)).
            finally(()=> {
                preloaderVisible(false);
            });
        }
      }, [loggedIn]);
    


    function handleSearch(data) {
        let movies = []
       if(!checkempty(data)) {
        mainApi.getMovies().then(res => {
            movies = res; 
            const resultFilter = movies.filter(item =>item.nameRU.toLowerCase().includes(data.toLowerCase())); 
            setMovies(resultFilter)
        });
       }
            
    }


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
            else {
                return 2;
            }
        }
        else {
            if (screenWidth > 769) {
                return 3;
            }
            if (screenWidth <= 769 && screenWidth > 560) {
                return 2;
            }
            else
                return 2;
        }
    }

    function checkempty(form) {
        if (form == null ||
            // /^\s*$/.test(form) ||
            form.length == 0) {
            alert("Поле не может быть пустым");
            return true;
        } else {
            return false;
        }
    }

    function handleSearch(data) {
       if(!checkempty(data)) {
        mainApi.getMovies().then(movies => {
            const resultFilter = movies.filter(item =>item.nameRU.toLowerCase().includes(data.toLowerCase())); 
            setMovies(resultFilter)
        });
       }
            
    }

    function handleDeleteCard ( movie ) {
        mainApi.deleteMovie(movie._id).then(() => {
            console.log("Фильм удален");
            setMovies((state) => state.filter((c) => c._id !== movie._id));
        }).catch((err) => console.log(err))
    };
    

    return (
        <div className="savedMovies">
            <SearchForm 
            onSubmit={handleSearch}
            onCheckboxCheked={setCheckShotMovie}
            />
            <MoviesCardList
               movies={movies}
               btnImagechecked={btnImagechecked}
               btnImage={btnImage}
               nomberCards={numberCards}
               onClickBtn={handleDeleteCard}
               isSavedMovies={true}
            />
        </div>
    )
}

export default SavedMovies;