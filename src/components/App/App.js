import React from "react";
import logoHeader from '../../images/header-logo.svg';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Search from '../Search/Search.js';

function App() {
  
  
  return (
    <div className="App">
      
        <Header
        logo={logoHeader}
        />
        
        <Search/>


        
        <Footer />
     
    </div>
  );
}

export default App;
