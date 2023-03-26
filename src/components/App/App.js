import React, { useState, useEffect } from "react";
// import { Route, Routes, useNavigate } from 'react-router-dom';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from "../ProtectedRoute.js";
import PublicRoute from "../PublicRoute.js";

import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
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
import auth from '../../utils/Auth';
import mainApi from '../../utils/MainApi';
import InfoTooltip from "../InfoTooltip/InfoTooltip";


function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPreloaderVisible, setPreloaderVisible] = useState(false);
  // const [isInfoTooltipOpen, setInfoTooltippOpen] = useState(false);
  const [errMessage, setErrMessage] = useState('')

  useEffect(() => {
    cbTokenCheck();
  }, []);

  function cbTokenCheck() {
    if (localStorage.getItem('jwt')) {
      const token = localStorage.getItem('jwt');
      auth.checkToken(token).then((res) => {
        if (res.message === 'Необходимо авторизоваться') {
          setLoggedIn(false);
          history.push("/signin");
          return
        }
        setCurrentUser({ id: res._id, email: res.email, name: res.name });
        setLoggedIn(true);
        // history.push("/profile");
      }).catch((err) => {
        setLoggedIn(false);
      })
    }
    return
  };
 




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
      if (res) {
        history.push("/signin");
        console.log('Вы успешно зарегистрировались');
      } else {
        console.log(res);
        setErrMessage("Что-то пошло не так!");
        setLoggedIn(false);
      }


    }).catch((err) => {
      console.log(err.message);
      setErrMessage(err.message);
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
        history.push("/profile");
      } else {
        setErrMessage("Что-то пошло не так!");
        setLoggedIn(false);
      }
    }).catch((err) => {
      console.log(err);
      setErrMessage(err.message);
      setLoggedIn(false);
    }).finally(() => {
      setPreloaderVisible(false)
    })
  };



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
      setErrMessage(err.message);
    }).finally(() => {
      setPreloaderVisible(false)
    })
  }

  function handleClickEscButton() {
    // localStorage.removeItem('jwt');
    localStorage.clear();
    setLoggedIn(false);
    history.push("/signin");

  }


  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
          <Switch>
            <Route exact path="/">
              <>
                <Header
                  logo={logoHeader}
                />
                <Main />
                <Footer />
              </>
            </Route>

            <ProtectedRoute path="/movies" loggedIn={loggedIn}>

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
            </ProtectedRoute>

            <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
              <>
                <HeaderMovie
                  logo={logoHeader}
                />
                <SavedMovies
                  preloaderVisible={setPreloaderVisible}
                  loggedIn={loggedIn}
                />
                <Footer />
              </>
            </ProtectedRoute>

            <ProtectedRoute path="/profile" loggedIn={loggedIn}>
              <>
                <HeaderMovie
                  logo={logoHeader}
                />
                <Profile
                  onChangeProfile={handleChangeProfile}
                  onClickEscButton={handleClickEscButton}
                />
              </>
            </ProtectedRoute>

            <PublicRoute path="/signin" loggedIn={loggedIn}>

              <Login
                onLogin={handleLogin}
                errMessage= {errMessage}
                setErrMessage={setErrMessage}
              />
            </PublicRoute>

            <PublicRoute  path="/signup" loggedIn={loggedIn}>
              <Register
                onRegister={handleRegistration}
                errMessage= {errMessage}
                setErrMessage={setErrMessage}
              />
            </PublicRoute>

            {/* path="/signup" */}

            <Route path="/*">
              <Error
                errorCode={404}
                errorMessage={'Страница не найдена'}
              />
            </Route>

          </Switch>

          <Preloader
            isVisible={isPreloaderVisible}
          />


          {/* <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeInfoTootip}
            // text={tooltipContent}
          /> */}

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;


