import React from "react";
import logoHeader from '../../images/header-logo.svg';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import SearchForm from '../SearchForm/SearchForm.js';
import Main from '../Main/Main.js'

function App() {
  
  
  return (
    <div className="App">
      
        <Header
        logo={logoHeader}
        />
        
        <SearchForm/>
        <Main/>


        
        <Footer />
     
    </div>
  );
}

export default App;
