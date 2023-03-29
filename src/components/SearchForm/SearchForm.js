import React, { useRef, useEffect, useState } from 'react';
import './SearchForm.css';

function SearchForm({ onSubmit, onCheckboxCheked }) {
  const searchFormRef = useRef();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('checkboxCheked')) {
      setChecked(JSON.parse(localStorage.getItem('checkboxCheked')));
      onCheckboxCheked(JSON.parse(localStorage.getItem('checkboxCheked')));
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(
      searchFormRef.current.value,
    );
  }

  function handleChange() {
    setChecked(!checked);
    onCheckboxCheked(!checked);
    if (checked) {
      localStorage.setItem('checkboxCheked', false);
      onCheckboxCheked(false);
    } else {
      localStorage.setItem('checkboxCheked', true);
      onCheckboxCheked(true);
    }
  }

  return (
    <div className="searchForm">
      <div className="searchForm__container">
        <form className="searchForm__form" onSubmit={handleSubmit} action="" method="get">
          <input className="searchForm__input" ref={searchFormRef} name="search" placeholder="Фильм" type="search" />
          <button className="searchForm__btn" type="submit" />
        </form>

        <label className="searchForm__checkbox">
          <input className="searchForm__checkbox-unvisible" type="checkbox" onChange={handleChange} checked={checked} />
          <div className="searchForm__checkbox-visible">
            <div className="searchForm__checkbox-visible-btn">
              <div className="searchForm__checkbox-visible-btn_toggle" />
            </div>
            <span className="searchForm__checkbox-text">Короткометражки</span>
          </div>

        </label>
      </div>

    </div>
  );
}

export default SearchForm;
