import React, { useRef, useEffect } from "react";
import './SearchForm.css'


function SearchForm({onSubmit}) {
    const searchFormRef = useRef();
    function handleSubmit(e) {
        e.preventDefault();
        onSubmit (
           searchFormRef.current.value
        );
       
      }


    return (
        <div className="searchForm">
            <form className="searchForm__form" onSubmit={handleSubmit}   action="" method="get">
                <input className="searchForm__input" ref = {searchFormRef} name="search" placeholder="Фильм" type="search" />
                <button className="searchForm__btn"  type="submit"></button>
            </form>

            <label className="searchForm__checkbox">
                <input className="searchForm__checkbox-unvisible" type="checkbox" />
                <div className="searchForm__checkbox-visible">
                    <div className="searchForm__checkbox-visible-btn">
                        <div className="searchForm__checkbox-visible-btn_toggle"></div>
                    </div>
                    <span className="searchForm__checkbox-text">Короткометражки</span>
                </div>

            </label>

        </div>
    )
}

export default SearchForm;