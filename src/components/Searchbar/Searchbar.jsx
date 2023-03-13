import React, { useState } from 'react';
import css from '../../styles.module.css';
import IconButton from './IconButton';
import { BsSearchHeart } from 'react-icons/bs';
import PropTypes from 'prop-types';

export default function Searchbar({onSubmit}) {
    const [query, setQuery] = useState('');
    
    const handleQueryChange = e => {
        setQuery(e.currentTarget.value.toLowerCase());
    }
    
    const reset = () => {
        setQuery('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        
    if (query.trim() === '') {
      alert('Please enter any word');
      return;
    }

    onSubmit(query);

    reset();
    };

  return (
    <header className={css.Searchbar}>
     <form className={css.SearchForm} onSubmit={handleSubmit}>
            <IconButton type="submit"><BsSearchHeart /> </IconButton>
 
        <input
            className={css.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleQueryChange}
        />
     </form>
    </header>
  )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}