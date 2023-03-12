import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';

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


function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({}); // данные текущего пользователя
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPreloaderVisible, setPreloaderVisible] = useState(false);






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
        })
    }
  }, [loggedIn]);



  function registrate({ name, email, password }) {
    setPreloaderVisible(true);
    auth.signUp({ name, email, password }).then((res) => {
      // setCurrentUser({ id: res._id, email: res.email, name: res.name }); // зачем тут это ??????????
      // setLoggedIn(true);
      navigate("/signin");
      console.log("Вы успешно зарегистрировались!");
      // setTooltipContent({ text: 'Вы успешно зарегистрировались!', logo: logoRegistration });
      // setInfoTooltipPopupOpen(true);




    }).catch((err) => {
      console.log(err);
      console.log("Чтото пошло не так")
      setLoggedIn(false);
      // setTooltipContent({ text: 'Что-то пошло не так! Попробуйте ещё раз.', logo: logoError });
      // setInfoTooltipPopupOpen(true);
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

        // setTooltipContent({ text: res.message, logo: logoError });
        // setInfoTooltipPopupOpen(true);

        setLoggedIn(false);
      }

    }).catch((err) => {
      console.log(err);
      // setTooltipContent({ text: 'Что-то пошло не так! Попробуйте ещё раз.', logo: logoError });
      // setInfoTooltipPopupOpen(true);
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
          // setTooltipContent({ text: res.message, logo: logoError });
          // setInfoTooltipPopupOpen(true);
          setLoggedIn(false);
          navigate("/signin");
          return
        }
        setCurrentUser({ id: res._id, email: res.email, name: res.name });
        setLoggedIn(true);

        navigate("/profile");
      }).catch((err) => {
        setLoggedIn(false);
        // setTooltipContent({ text: 'Что-то пошло не так! Попробуйте ещё раз.', logo: logoError });
        // setInfoTooltipPopupOpen(true);
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
      // setTooltipContent({ text: 'Что-то пошло не так! Попробуйте ещё раз.', logo: logoError });
      // setInfoTooltipPopupOpen(true);
    }).finally(() => {
      setPreloaderVisible(false)
    })
  }

  function handleClickEscButton() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate("/signin");

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
                <Preloader
                  isVisible={isPreloaderVisible}
                />
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
                 <Preloader
                  isVisible={isPreloaderVisible}
                />
              </>
            } />

            <Route path="/signin" element={
              <>
                <Login
                  onLogin={handleLogin}
                />
                <Preloader
                  isVisible={isPreloaderVisible}
                />
              </>
            } />

            <Route path="/signup" element={
              <>
                <Register
                  onRegister={handleRegistration}
                />
                <Preloader
                  isVisible={isPreloaderVisible}
                />
              </>
            } />

            <Route path="/error" element={
              <Error
                errorCode={404}
                errorMessage={'Страница не найдена'}
              />
            } />

            <Route path="/*" element={
              <Error
                errorCode={404}
                errorMessage={'Страница не найдена'}
              />
            } />

          </Routes>
        </LoggedInContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;


