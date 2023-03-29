/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import {
  Route, Switch, useHistory,
} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import PublicRoute from '../PublicRoute';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import logoHeader from '../../images/header-logo.svg';
import Header from '../Header/Header';
import HeaderMovie from '../HeaderMovie/HeaderMovie';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Preloader from '../Preloader/Preloader';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Error from '../Error/Error';
import auth from '../../utils/Auth';
import mainApi from '../../utils/MainApi';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPreloaderVisible, setPreloaderVisible] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  function cbTokenCheck() {
    if (localStorage.getItem('jwt')) {
      const token = localStorage.getItem('jwt');
      auth.checkToken(token).then((res) => {
        if (res.message === 'Необходимо авторизоваться') {
          setLoggedIn(false);
          history.push('/signin');
          return;
        }
        setCurrentUser({ id: res._id, email: res.email, name: res.name });
        setLoggedIn(true);
      }).catch((err) => {
        console.log(err.message);
        setLoggedIn(false);
      });
    }
  }

  useEffect(() => {
    cbTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      mainApi.getUserInfo()
        .then((info) => {
          setCurrentUser({
            name: info.name,
            email: info.email,
            Id: info._id,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function registrate({ name, email, password }) {
    setPreloaderVisible(true);
    auth.signUp({ name, email, password }).then((res) => {
      if (res.token) {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setCurrentUser({ id: res.user._id, email: res.user.email, name: res.user.name });
        history.push('/movies');
        console.log('Вы успешно зарегистрировались');
      } else {
        console.log(res);
        setInfoMessage('Что-то пошло не так!');
        setLoggedIn(false);
      }
    }).catch((err) => {
      console.log(err.message);
      setInfoMessage(err.message);
      setLoggedIn(false);
    }).finally(() => {
      setPreloaderVisible(false);
    });
  }

  function login({ email, password }) {
    setPreloaderVisible(true);
    auth.signIn({ email, password }).then((res) => {
      if (res.token) {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setCurrentUser({ id: res.user._id, email: res.user.email, name: res.user.name });
        history.push('/movies');
      } else {
        setInfoMessage('Что-то пошло не так!');
        setLoggedIn(false);
      }
    }).catch((err) => {
      console.log(err);
      setInfoMessage(err.message);
      setLoggedIn(false);
    }).finally(() => {
      setPreloaderVisible(false);
    });
  }

  function handleRegistration({ name, email, password }) {
    registrate({ name, email, password });
  }

  function handleLogin({ password, email }) {
    login({ email, password });
  }

  function handleChangeProfile({ name, email }) {
    setPreloaderVisible(true);
    mainApi.editProfile({ name, email }).then((res) => {
      setCurrentUser({ id: res._id, email: res.email, name: res.name });
      setInfoMessage('Данные пользователя обновлены!');
    }).catch((err) => {
      console.log(err.message);
      setInfoMessage(err.message);
    }).finally(() => {
      setPreloaderVisible(false);
    });
  }

  function handleClickEscButton() {
    localStorage.clear();
    setLoggedIn(false);
    history.push('/signin');
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path="/">
            <>
              {loggedIn ? (
                <HeaderMovie
                  logo={logoHeader}
                />
              ) : (
                <Header
                  logo={logoHeader}
                />
              )}
              <Main />
              <Footer />
            </>
          </Route>
          <ProtectedRoute exact path="/profile" loggedIn={loggedIn}>
            <>
              <HeaderMovie
                logo={logoHeader}
              />
              <Profile
                onChangeProfile={handleChangeProfile}
                onClickEscButton={handleClickEscButton}
                infoMessage={infoMessage}
                setInfoMessage={setInfoMessage}
              />
            </>
          </ProtectedRoute>

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

          <PublicRoute path="/signin" loggedIn={loggedIn}>

            <Login
              onLogin={handleLogin}
              infoMessage={infoMessage}
              setInfoMessage={setInfoMessage}
            />
          </PublicRoute>

          <PublicRoute path="/signup" loggedIn={loggedIn}>
            <Register
              onRegister={handleRegistration}
              infoMessage={infoMessage}
              setInfoMessage={setInfoMessage}
            />
          </PublicRoute>

          <PublicRoute path="/signin" loggedIn={loggedIn}>

            <Login
              onLogin={handleLogin}
              infoMessage={infoMessage}
              setInfoMessage={setInfoMessage}
            />
          </PublicRoute>

          <PublicRoute path="/signup" loggedIn={loggedIn}>
            <Register
              onRegister={handleRegistration}
              infoMessage={infoMessage}
              setInfoMessage={setInfoMessage}
            />
          </PublicRoute>

          <Route path="/*">
            <Error
              errorCode={404}
              errorMessage="Страница не найдена"
            />
          </Route>

        </Switch>

        <Preloader
          isVisible={isPreloaderVisible}
        />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
