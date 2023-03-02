import React from "react";
import './App.css';
import { Route, Routes } from 'react-router-dom';
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
import NavMobile from '../NavMobile/NavMobile'

function App() {


  return (
    <div className="App">
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
            {/* <Preloader/> */}
            <Movies />
            <Footer />
          </>
        } />

        <Route path="/saved-movies" element={
          <>
            <HeaderMovie
              logo={logoHeader}
            />
            <SavedMovies />
            <Footer />
          </>
        } />

        <Route path="/profile" element={
          <>
            <HeaderMovie
              logo={logoHeader}
            />
            <Profile />
          </>
        } />

        <Route path="/signin" element={
          <Login />
        } />

        <Route path="/signup" element={
          <Register />
        } />

        <Route path="/error" element={
          <Error
            errorCode={404}
            errorMessage={'Страница не найдена'}
          />
        } />

      </Routes>
    </div>
  );
}

export default App;


