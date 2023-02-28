import React from "react";
import './SearchForm.css'


function SearchForm() {
    return (
        <div className="searchForm">
            <form className="searchForm__form" action="" method="get">
                <input className="searchForm__input" name="s" placeholder="Фильм" type="search" />
                <button className="searchForm__btn" type="submit"></button>
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