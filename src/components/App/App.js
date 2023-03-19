import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from "../ProtectedRoute.js";

import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { LoggedInContext } from '../../contexts/LoggedInContext';
import logoHeader from '../../images/header-logo.svg';
import Header from '../Header/Header.js';
import HeaderMovie from '../HeaderMovie/HeaderMovie.js';
import Footer from '../Footer/Footer.js';

import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import Preloader from '../Preloader/Preloader.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Error from '../Error/Error';
import NavMobile from '../NavMobile/NavMobile';
import auth from '../../utils/Auth';
import mainApi from '../../utils/MainApi';
import InfoTooltip from "../InfoTooltip/InfoTooltip";


function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({}); // данные текущего пользователя
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPreloaderVisible, setPreloaderVisible] = useState(false);
  // const [error, setError] = useState({number: 'Упс', message:'Что-то пошло не так! Попробуйте ещё раз.'})
  const [isInfoTooltipOpen, setInfoTooltippOpen] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('')






  useEffect(() => {
    if (loggedIn) {
      mainApi.getUserInfo()
        .then((info) => {
          setCurrentUser({
            name: info.name,
            email: info.email,
            Id: info._id
          });
        })
        .catch((err) => {
          console.log(err);
          // setError({number:err, message:err})
        })
    }
  }, [loggedIn]);



  function registrate({ name, email, password }) {
    setPreloaderVisible(true);
    auth.signUp({ name, email, password }).then((res) => {
      if (res) {
        navigate("/signin");
        console.log('Вы успешно зарегистрировались');
      } else {
        console.log(res);
        setTooltipContent("Что-то пошло не так!");
        setInfoTooltippOpen(true);
        setLoggedIn(false);
      }


    }).catch((err) => {
      console.log(err.message);
      setTooltipContent(err.message);
      setInfoTooltippOpen(true);
      setLoggedIn(false);
    }).finally(() => {
      setPreloaderVisible(false)
    })
  };

  function login({ email, password }) {
    setPreloaderVisible(true);
    auth.signIn({ email, password, }).then((res) => {

      if (res.token) {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setCurrentUser({ id: res.user._id, email: res.user.email, name: res.user.name });
        navigate("/profile");
      } else {
        setTooltipContent("Что-то пошло не так!");
        setInfoTooltippOpen(true);
        setLoggedIn(false);
      }
    }).catch((err) => {
      console.log(err);
      setTooltipContent(err.message);
      setInfoTooltippOpen(true);
      setLoggedIn(false);
    }).finally(() => {
      setPreloaderVisible(false)
    })
  };

  function cbTokenCheck() {
    if (localStorage.getItem('jwt')) {
      const token = localStorage.getItem('jwt');
      auth.checkToken(token).then((res) => {
        if (res.message === 'Необходимо авторизоваться') {
          setLoggedIn(false);
          navigate("/signin");
          return
        }
        setCurrentUser({ id: res._id, email: res.email, name: res.name });
        setLoggedIn(true);

        navigate("/profile");
      }).catch((err) => {
        setLoggedIn(false);
      })
    }
    return
  };
  useEffect(() => {
    cbTokenCheck();
  }, []);

  function handleRegistration({ name, email, password }) {
    registrate({ name, email, password });
  };

  function handleLogin({ password, email }) {
    login({ email, password, });
  };

  function handleChangeProfile({ name, email }) {
    setPreloaderVisible(true);
    mainApi.editProfile({ name, email }).then((res) => {
      setCurrentUser({ id: res._id, email: res.email, name: res.name });
      console.log("Данные пользователя обновлены!");
    }).catch((err) => {
      console.log(err);
      console.log("Чтото пошло не так")
      navigate("/error")
    }).finally(() => {
      setPreloaderVisible(false)
    })
  }

  function handleClickEscButton() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate("/signin");

  }

  function closeInfoTootip() {
    setInfoTooltippOpen(false)
  }






  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <LoggedInContext.Provider value={loggedIn}>
          <Routes>
            <Route path="/" element={
              <>
                <Header
                  logo={logoHeader}
                />
                <Main />
                <Footer />
              </>
            } />

            <Route path="/movies" element={
              <>
                <HeaderMovie
                  logo={logoHeader}
                />
                <Preloader
                  isVisible={isPreloaderVisible}
                />
                <Movies
                  preloaderVisible={setPreloaderVisible}
                />
                <Footer />
                <Preloader
                  isVisible={isPreloaderVisible}
                />
              </>
            } />

            <Route path="/saved-movies" element={
              <>
                <HeaderMovie
                  logo={logoHeader}
                />
                <SavedMovies
                  preloaderVisible={setPreloaderVisible}
                />
                <Footer />
              </>
            } />

            <Route path="/profile" element={
              <>
                <HeaderMovie
                  logo={logoHeader}
                />
                <Profile
                  onChangeProfile={handleChangeProfile}
                  onClickEscButton={handleClickEscButton}
                />
              </>
            } />

            <Route path="/signin" element={

              <Login
                onLogin={handleLogin}
              />

            } />

            <Route path="/signup" element={
              <Register
                onRegister={handleRegistration}
              />
            } />

            {/* <Route path="/error" element={
              <Error
                errorCode={error.number}
                errorMessage={error.message}
              />
            } /> */}

            <Route path="/*" element={
              <Error
                errorCode={404}
                errorMessage={'Страница не найдена'}
              />
            } />

          </Routes>

          <Preloader
            isVisible={isPreloaderVisible}
          />


          <InfoTooltip
            isOpen={isInfoTooltipOpen}

            //  isOpen={true}
            onClose={closeInfoTootip}
            // logo={tooltipContent.logo}
            text={tooltipContent}//{(loggedIn === true) ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}

          />
        </LoggedInContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;


